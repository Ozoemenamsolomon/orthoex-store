import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { TrainingAttendanceType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseTrainingClient } from '@utils/supabase';

const logger = (e: any) => {
	console.log('from download-training-certificate.ts');
	console.log({ e });
};

export default withApiAuthRequired(async function downloadTrainingTicket(
	req,
	res,
) {
	const { participantId, orderId } = req.body;
	console.log(orderId, participantId);
	const session = await getSession(req, res);
	const user = session?.user.email as string;
	
	const { data, error } = await supabaseTrainingClient
		.from('training_attendance')
		.select('*')
		.eq('participantId', participantId)
		.eq('trainingOrderId', orderId)
		.eq('completedTraining', true)
		.eq('trainingOrderedBy', user)
		.single();

	if (error) {
		logger({ error });
		return res
			.status(400)
			.json({ error: 'Error finding participant with completed training!' });
	}
	const trainingAttendanceData = data as unknown as TrainingAttendanceType;

	res.status(200).json({ data: trainingAttendanceData });
});
