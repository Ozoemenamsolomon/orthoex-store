import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function products(req, res) {
	const session = await getSession(req, res);

	console.log({ session });
	res.status(200).json('products');
});
