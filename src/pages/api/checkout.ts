import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getProductVariantsByMultipleIDs } from '@data/index';
import { supabaseClient } from '@utils/supabase';
import { CartState } from 'context/cartContext';
import crypto from 'crypto';

export default withApiAuthRequired(async function checkout(req, res) {
	try {
		const session = await getSession(req, res);

		const cart: CartState = req.body.cart;
		const ids = cart.map((item: { productVariantID: any }) => {
			return Number(item.productVariantID);
		});

		const products = await getProductVariantsByMultipleIDs(
			ids,
			session?.user?.custier,
		);

		const totalPrice = products.reduce((acc, item) => {
			return (
				acc +
				item.prices[0].price *
					(cart.find(i => i.productVariantID === item.variantID.toString())
						?.quantity || 0)
			);
		}, 0);

		const transformedCart = cart.map(item => {
			const product = products.find(
				i => i.variantID.toString() === item.productVariantID,
			);

			return {
				variant: product?.variant,
				variantID: product?.variantID,
				quantity: item.quantity,
				price: product?.prices[0].price || 0,
				code: product?.product?.code,
				name: product?.product?.name,
				image: product?.product?.image,
				brand: product?.product?.brand.id,
				cat: product?.product?.cat.id,
			};
		});

		// use hashmac to hash cart
		const hash = crypto
			.createHmac('sha256', process.env.HASH_SECRET || '')
			.update(JSON.stringify(transformedCart))
			.digest('hex');

		// save order to database
		const { data, error } = await supabaseClient.from('orders').insert([
			{
				cart: transformedCart,
				totalPrice,
				reference: hash,
				user: session?.user?.email,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
				status: 'pending',
			},
		]);

		if (error) {
			throw error;
		}

		console.log({ data });

		res.status(200).json({ reference: hash });
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});

// 		// use hash as payment reference
// 		type Order = {
// 			paid: boolean;
// 			address: { street: string; city: string; zip: string; country: string };
// 			phone: string;
// 		};
// 		// redirect to order summary page, where user can add address and phone number and pay and then paid is set to true if payment is successful
