import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { createTrainingOrder } from '@data/trainingOrderSupabase';
import { TrainingOrderCreateType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import crypto from 'crypto';

export default withApiAuthRequired(async function checkout(req, res) {
	try {
		const { trainingOrder } = req.body as {
			trainingOrder: TrainingOrderCreateType;
		};

		const hash = crypto
			.createHmac('sha256', process.env.HASH_SECRET || '')
			.update(JSON.stringify(trainingOrder))
			.digest('hex');

		await createTrainingOrder({...trainingOrder, reference: hash});

		res.status(200).json({ reference: hash });
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});
