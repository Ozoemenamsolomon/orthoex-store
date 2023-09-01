import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { estimateDeliveryFee } from '@data/index';
import { getProductVariantsByMultipleIDs } from '@data/products';
import { getProductTotalWeight } from '@utils/index';

export default withApiAuthRequired(async function products(req, res) {
	const session = await getSession(req, res);

	const { cart, lga } = req.body;

	if (!cart || cart.length < 1 || !lga) {
		return res.status(400).json({ error: 'Cart is empty' });
	}

	const ids = cart.map((item: { productVariantID: any }) => {
		return Number(item.productVariantID);
	});
	try {
		const products = await getProductVariantsByMultipleIDs(
			ids,
			session?.user?.custier,
		);

		if (products.length !== ids.length) {
			return res.status(400).json({ error: 'Invalid product variant id' });
		}

		const weight = getProductTotalWeight(products);
		console.log({ lga, weight });
		const deliveryFee = await estimateDeliveryFee(lga, weight);

		console.log({ deliveryFee });
		res.status(200).json(deliveryFee);
	} catch (error) {
		console.log({ error });
		res.status(400).json({
			message: '',
		});
	}
});
