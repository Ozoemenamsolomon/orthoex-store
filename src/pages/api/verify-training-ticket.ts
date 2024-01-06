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
		.eq('paid', true)
		.single();

	if (error) {
		logger({ error });
		return res
			.status(400)
			.json({ error: 'Error occured finding paid training order!' });
	}

	const trainingOrderData = trainingOrder as unknown as TrainingOrderType;

	if (!trainingOrderData) {
		logger({ error });
		return res.status(400).json({ error: 'Training Order not found!' });
	}

	const participants = JSON.parse(
		trainingOrderData.participants,
	) as ParticipantsDataType[];

	const participantData = participants.find(data => ticketNumber === data.id);

	if (!participantData) {
		res
			.status(404)
			.json({ error: `particpants with ticket no ${ticketNumber} not found!` });
	}

	const { data: trainingAttendanceData } = await supabaseTrainingClient
		.from('training_attendance')
		.select('*')
		.eq('trainingOrderId', trainingOrderId)
		.eq('participantId', ticketNumber)
		.single();

	if (trainingAttendanceData) {
		res
			.status(404)
			.json({ error: 'Participants ticket already been confirmed!' });
	}

	res.status(200).json({
		data: {
			title: trainingOrderData.title,
			amountPaid: trainingOrderData.amountPaid,
			trainingId: trainingOrderData.trainingId,
			trainingOrderId: trainingOrderData.id,
			trainingLocation: trainingOrderData.location,
			trainingOrderedBy: trainingOrderData.user,
			trainingDate: trainingOrderData.trainingDate,
			firstName: participantData?.firstname,
			lastName: participantData?.lastname,
			phone: participantData?.phone,
			completedTraining: participantData?.completedTraining,
			participantId: participantData?.id,
		},
	});
});
