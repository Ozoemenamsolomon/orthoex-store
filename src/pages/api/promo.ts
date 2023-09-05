import { TrainingPromoDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseClient } from '@utils/supabase';
import { NextApiHandler } from 'next';

type RequestType = { promoCode: string; price: number };

const handler: NextApiHandler = async (req, res) => {
	//const session = await getSession(req, res);
	const { promoCode, price }: RequestType = req.body;

	const { data, error: errorFetchingPromo } = await supabaseClient
		.from('promo')
		.select('*')
		.eq('promo_code', promoCode)
		.gte('valid_until', new Date().toISOString())
		.single();
	const promoData = data as TrainingPromoDataType;
	console.log({ promoData });

	if (errorFetchingPromo) {
		console.log({ errorFetchingPromo, promoCode });
		// logging the error is good, but we don't need to give the user the error message,
		// so we'll just return a generic error message
		// this is a good practice to prevent leaking information to the user
		return res.status(400).json({ error: 'Promo code is invalid' });
	}

	// replaced this check with db WHERE clause
	// const promo = promoData.find(promo => promo. === );

	// if there's an error, then there won't be data and vice-versa
	// if (!promo) {
	// 	return res
	// 		.status(404)
	// 		.json({
	// 			promoIsValid: false,
	// 			promoNotification: 'Discount code is invalid',
	// 		});
	// }

	// if (promo) {
	// this check is now done in the db WHERE clause
	// const currentDate = new Date();
	// const validUntilDate = new Date(promo.valid_until);

	// if (currentDate <= validUntilDate) {
	if (promoData.promo_amount !== null) {
		const discountedPrice = price - promoData.promo_amount;
		const promoIsValid = true;
		const promoNotification = 'Discount code valid';
		return res
			.status(200)
			.json({ discountedPrice, promoIsValid, promoNotification });
	} else if (promoData.promo_percentage !== null) {
		const discountedPrice = price - (price * promoData.promo_percentage) / 100;
		const promoIsValid = true;
		const promoNotification = 'Discount code valid';
		return res
			.status(200)
			.json({ discountedPrice, promoIsValid, promoNotification });
	}
	// } else {
	// the error message will come from supabase
	// 	const promoNotification = 'Discount code is expired.';
	// 	const promoIsValid = false;
	// 	return res.status(200).json({ promoIsValid, promoNotification });
	// }
	// }

	// res.status(200).json(products);
};

export default handler;
