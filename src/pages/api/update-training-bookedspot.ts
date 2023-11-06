import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
	getTrainingWithId,
	updateTrainingWithId,
} from '@data/trainingOrderSupabase';

export default withApiAuthRequired(async function updateTrainingBookspot(
	req,
	res,
) {
	try {
		const { id } = req.body as {
			id: number;
		};

		const trainingData = await getTrainingWithId(id);
		const updatedData = await updateTrainingWithId(id, {
			bookedspot: trainingData.bookedspot + 1,
		});

		if (updatedData) {
			res.status(200).json({ data: updatedData });
		}
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});
