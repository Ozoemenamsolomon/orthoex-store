// import { supabaseClient } from '@utils/supabase';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	// const product = req.body;

	if (true) {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	// if (req.cookies.temp_admin_cookie !== process.env.ADMIN_COOKIE_VALUE) {
	// 	return res.status(401).json({ error: 'Unauthorized' });
	// }

	// if (!product.name || !product.code || !product.brand || !product.category) {
	// 	console.log({ product });
	// 	return res.status(400).json({ error: 'Missing required fields' });
	// }

	// const { data, error: productInsertError } = await supabaseClient
	// 	.from('products')
	// 	.insert([
	// 		{
	// 			name: product.name,
	// 			code: product.code,
	// 			image: product.image,
	// 			description: product.description,
	// 			details: product.details,
	// 			brand: product.brand,
	// 			category: product.category,
	// 		},
	// 	])
	// 	.select('*')
	// 	.single();

	// if (productInsertError || !data) {
	// 	console.log('error: ', productInsertError);
	// 	return res.status(500).json({
	// 		error:
	// 			productInsertError?.details ||
	// 			productInsertError?.message ||
	// 			"couldn't add product",
	// 	});
	// }
	// const addedProductCode = data?.code;
	// return res.status(200).json({ productCode: addedProductCode });

	// const pricesToCustierMap = Object.entries(product.prices).map(
	// 	([key, value]) => ({
	// 		product: addedProductCode,
	// 		custier: key,
	// 		price: value,
	// 	}),
	// );

	// const { data: _pricesInsertData, error: pricesInsertError } =
	// 	await supabaseClient.from('prices').insert(pricesToCustierMap);

	// if (pricesInsertError) {
	// 	console.log('error: ', pricesInsertError);
	// 	return res.status(500).json({
	// 		error: pricesInsertError.details || pricesInsertError.message,
	// 	});
	// }
};

export default handler;
