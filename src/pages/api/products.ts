import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getProductVariantsByMultipleIDs } from '@data/products';
import { CartState } from 'context/cartContext';

export default withApiAuthRequired(async function products(req, res) {
	const session = await getSession(req, res);

	const cart: CartState = req.body.cart;
	const ids = cart.map((item: { productVariantID: any }) => {
		return Number(item.productVariantID);
	});

	const products = await getProductVariantsByMultipleIDs(
		ids,
		session?.user?.custier,
	);

	res.status(200).json(products);
});
