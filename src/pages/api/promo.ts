import { TrainingPromoDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseClient } from '@utils/supabase';
import { NextApiHandler } from 'next';

type RequestType = { promoCode: string; price: number };

const handler: NextApiHandler = async (req, res) => {
	const { promoCode, price }: RequestType = req.body;

	const { data, error: errorFetchingPromo } = await supabaseClient
		.from('promo')
		.select('*')
		.eq('promo_code', promoCode)
		.gte('valid_until', new Date().toISOString())
		.single();
	const promoData = data as TrainingPromoDataType;

	if (errorFetchingPromo) {
		console.log({ errorFetchingPromo, promoCode });
		return res.status(400).json({
			error: 'Promo code is invalid',
			promoNotification: 'Promo code is invalid',
		});
	}

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
};

export default handler;
