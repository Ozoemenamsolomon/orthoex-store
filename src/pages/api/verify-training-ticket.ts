import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ParticipantsDataType } from '@components/FeaturedEventDialog';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseTrainingClient } from '@utils/supabase';

const logger = (e: any) => {
	console.log('from verify-training.ts');
	console.log({ e });
};

export default withApiAuthRequired(async function verify(req, res) {
	const { ticketNumber, trainingOrderId } = req.body;

	const { data: trainingOrder, error } = await supabaseTrainingClient
		.from('training_orders')
		.select('*')
		.eq('id', trainingOrderId)
		// TODO: change back to true for only paid trainings
		//.eq('paid', false)
		.single()

	if (error) {
		logger({ error });
		return res.status(400).json({ error: error.message });
	}
	console.log(trainingOrder);


	const trainingOrderData = trainingOrder as unknown as TrainingOrderType;

	if (!trainingOrderData) {
		logger({ error });
		return res.status(400).json({ error: 'training not found!!!' });
	}

	const participants = JSON.parse(
		trainingOrderData.participants,
	) as ParticipantsDataType[];

	const participantData = participants.find(data => ticketNumber === data.id);

	if (!participantData) {
		res.status(404).json({ error: 'participants with ticket Id not found' });
	}

	res.status(200).json({ data: {...trainingOrderData, ...participantData} });
});
