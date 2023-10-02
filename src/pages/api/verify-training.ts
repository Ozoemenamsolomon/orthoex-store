import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
	TrainingOrderType,
	TrainingSupbaseDataType,
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

	const updatedTrainingOrderResponseData = await supabaseTrainingClient
		.from('training_orders')
		.update({ paid: true })
		.eq('reference', reference)
		.eq('user', session?.user?.email)
		.select('*')
		.single();

	const updatedData =
		updatedTrainingOrderResponseData.data as unknown as TrainingOrderType;

	// fetch the training data for the paid order
	const { data: trainingResponseData, error: trainingDataError } =
		await supabaseTrainingClient
			.from('training')
			.select('*')
			.eq('id', updatedData.trainingId)
			.single();

	if (trainingDataError) {
		console.log(trainingDataError);
		return res.status(400).json({ error: trainingDataError.message });
	}

	const trainingData =
		trainingResponseData as unknown as TrainingSupbaseDataType;

	// update the training data booked spot by +1 for the paid order
	const { error: updatedTrainingErrorData } = await supabaseTrainingClient
		.from('training')
		.update({ bookedspot: trainingData.bookedspot++ })
		.eq('id', trainingData.id)
		.select('*')
		.single();

	if (updatedTrainingErrorData) {
		console.log(updatedTrainingErrorData);
		return res.status(400).json({ error: updatedTrainingErrorData.message });
	}

	res.status(200).json({ data: updatedData });
});
