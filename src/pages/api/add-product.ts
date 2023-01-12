import { createClient } from '@supabase/supabase-js';
import { NextApiHandler } from 'next';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const handler: NextApiHandler = async (req, res) => {
	const product = req.body;
	console.log('body: ', product);

	const { data, error } = await supabase.from('products').insert([
		{
			productName: product.productName,
			productCode: product.productCode,
			productImage: product.productImage,
			productPrice: product.productPrice,
			productDescription: product.productDescription,
		},
	]);

	if (error) {
		console.log('error: ', error);
		return res.status(500).json({ error: error.details });
	}

	return res.status(200).json({ data });
};

export default handler;
