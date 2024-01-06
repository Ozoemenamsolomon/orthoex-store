import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { supabaseTrainingClient } from '@utils/supabase';

const logger = (e: any) => {
	console.log('from verify-training.ts');
	console.log({ e });
};

export default withApiAuthRequired(async function verify(req, res) {
	const { data } = req.body;

	const { data: attendaceData, error } = await supabaseTrainingClient
		.from('training_attendance')
		.insert(data);

	if (error) {
		logger({ error });
		return res
			.status(400)
			.json({ error: 'Error occured confirming attendance!!' });
	}

	res.status(200).json({ data: attendaceData });
});
