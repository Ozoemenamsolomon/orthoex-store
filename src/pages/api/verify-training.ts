import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
	TrainingOrderType,
} from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseTrainingClient } from '@utils/supabase';

const logger = (e: any) => {
	console.log('from verify-training.ts');
	console.log({ e });
};

export default withApiAuthRequired(async function verify(req, res) {
	const session = await getSession(req, res);
	const {
		reference: { reference },
	} = req.body;

	const { data, error } = await supabaseTrainingClient
		.from('training_orders')
		.select('*')
		.eq('reference', reference)
		.eq('user', session?.user?.email)
		.single();

	if (error) {
		logger({ error });
		return res.status(400).json({ error: error.message });
	}
	const verifyUrl = `https://api.paystack.co/transaction/verify/${data.reference}`;

	const verify = await fetch(verifyUrl, {
		headers: {
			Authorization: `Bearer ${process.env.PAYSTACK_LIVE_SECRET_KEY}`,
		},
	})
		.then(res => res.json())
		.catch(err => {
			logger({ err });
			return res.status(400).json({ error: err.message });
		});

	if (verify?.data?.status !== 'success') {
		logger({ verify });
		return res.status(400).json({ error: 'Transaction not successful' });
	}

	const updatedDataResponse = await supabaseTrainingClient
		.from('training_orders')
		.update({ paid: true })
		.eq('reference', reference)
		.eq('user', session?.user?.email)
		.select('*')
		.single();

	const updatedData = updatedDataResponse.data as unknown as TrainingOrderType;

	// Also update the training booked spot
	await fetch('/api/update-training-bookedspot', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id: updatedData.trainingId }),
	}).catch(err => {
		console.log(err);
	});

	res.status(200).json({ data: updatedData });
});
