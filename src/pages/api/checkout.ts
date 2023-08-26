import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getProductVariantsByMultipleIDs } from '@data/index';
import { supabaseClient } from '@utils/supabase';
import { CartState } from 'context/cartContext';
import crypto from 'crypto';

export default withApiAuthRequired(async function checkout(req, res) {
	try {
		const session = await getSession(req, res);

		const { cart, address } = req.body as { cart: CartState; address: any };

		if (!cart || cart.length === 0 || !address) {
			return res.status(400).json({ error: 'Cart is empty' });
		}

		const ids = cart.map((item: { productVariantID: any }) => {
			return Number(item.productVariantID);
		});

		const products = await getProductVariantsByMultipleIDs(
			ids,
			session?.user?.custier,
		);

		// invalid product variant id
		if (products.length !== ids.length) {
			return res.status(400).json({ error: 'Invalid product variant id' });
		}

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

			if (!product) {
				return null;
			}

			return {
				variant: product.variant,
				variantID: product.variantID,
				quantity: item.quantity,
				price: product.prices[0].price || 0,
				code: product.product.code,
				name: product.product.name,
				image: product.product.image,
				brand: product.product.brand.id,
				cat: product.product?.cat.id,
				timeStamp: Date.now(),
			};
		});

		const hash = crypto
			.createHmac('sha256', process.env.HASH_SECRET || '')
			.update(JSON.stringify(transformedCart))
			.digest('hex');

		const { data: _data, error } = await supabaseClient.from('orders').insert([
			{
				cart: transformedCart,
				totalPrice,
				reference: hash,
				user: session?.user?.email,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
				status: process.env.NODE_ENV,
				address,
			},
		]);

		if (error) {
			throw error;
		}

		res.status(200).json({ reference: hash });
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});
