import { supabaseClient } from '@utils/supabase';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	const product = req.body;

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	if (req.cookies.temp_admin_cookie !== process.env.ADMIN_COOKIE_VALUE) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	if (
		!product.name ||
		!product.code ||
		!product.price ||
		!product.brand ||
		!product.category
	) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	const { data, error } = await supabaseClient.from('products').insert([
		{
			name: product.name,
			code: product.code,
			image: product.image,
			price: product.price,
			description: product.description,
			details: product.details,
			brand: product.brand,
			category: product.category,
		},
	]);

	if (error) {
		console.log('error: ', error);
		return res.status(500).json({ error: error.details || error.message });
	}

	return res.status(200).json({ data });
};

export default handler;
