import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import {
	getTrainingWithId,
	updateTrainingWithId,
} from '@data/trainingOrderSupabase';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';

export default withApiAuthRequired(async function updateTrainingBookspot(
	req,
	res,
) {
	try {
		const { id } = req.body as {
			id: number;
		};
		let updatedData: TrainingSupbaseDataType | null = null;
		const trainingData = await getTrainingWithId(id);
		if (trainingData) {
			updatedData = await updateTrainingWithId(id, {
				bookedspot: trainingData.bookedspot + 1,
			});
		}

		if (updatedData) {
			res.status(200).json({ data: updatedData });
		} else {
			// Handle the case when no data was updated (e.g., training not found)
			res.status(404).json({ message: 'Training not found' });
		}
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});
