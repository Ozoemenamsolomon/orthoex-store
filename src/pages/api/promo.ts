import { TrainingPromoDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseClient } from '@utils/supabase';
import { NextApiHandler } from 'next';


type RequestType = { promoCode: string; price: number };

const handler: NextApiHandler = async (req, res) => {
	//const session = await getSession(req, res);
	const { promoCode, price }: RequestType = req.body;

	const { data, error } = await supabaseClient.from('promo').select('*');
	const promoData = data as TrainingPromoDataType[];

	if (error) {
		console.log('error fetching promo', error);
		return res.status(400).json({ error: error.message });
	}

	const promo = promoData.find(promo => promo.promo_code === promoCode);
	if (!promo) {
		return res
			.status(404)
			.json({
				isPromoValid: false,
				promoNotification: 'Discount code is invalid',
			});
	}

	if (promo) {
		const currentDate = new Date();
		const validUntilDate = new Date(promo.valid_until);

		if (currentDate <= validUntilDate) {
			if (promo.promo_amount !== null) {
				const discountedPrice = price - promo.promo_amount;
				const isPromoValid = true;
				const promoNotification = 'Discount code valid';
				return res
					.status(200)
					.json({ discountedPrice, isPromoValid, promoNotification });
			} else if (promo.promo_percentage !== null) {
				const discountedPrice = price - (price * promo.promo_percentage) / 100;
				const isPromoValid = true;
				const promoNotification = 'Discount code valid';
				return res
					.status(200)
					.json({ discountedPrice, isPromoValid, promoNotification });
			}
		} else {
			const promoNotification = 'Discount code is expired.';
			const isPromoValid = false;
			return res.status(200).json({ isPromoValid, promoNotification });
		}
	} else {
		const promoNotification = 'Discount code is invalid.';
		const isPromoValid = false;
		return res.status(200).json({ isPromoValid, promoNotification });
	}

	// res.status(200).json(products);
};

export default handler;
