import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { updateTrainingOrderToPaid } from '@data/trainingOrderSupabase';

export default withApiAuthRequired(async function updateTrainingOrder(
	req,
	res,
) {
	const session = await getSession(req, res);
	const user = session?.user.email as string;
	try {
		const { reference } = req.body as {
			reference: string;
			user: string;
		};

		const data = await updateTrainingOrderToPaid(reference, user);

		if (data) {
			res.status(200).json({ data: data });
		}
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});
