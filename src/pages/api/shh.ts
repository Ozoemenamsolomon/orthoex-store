import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	res.setHeader(
		'Set-Cookie',
		`temp_admin_cookie=${process.env.ADMIN_COOKIE_VALUE}; Expires=${new Date(
			Date.now() + 604800000,
		).toUTCString()}; SameSite=Strict; Secure; HttpOnly; Path=/`,
	);

	res.redirect('/admin/temp/add-products');
};

export default handler;
