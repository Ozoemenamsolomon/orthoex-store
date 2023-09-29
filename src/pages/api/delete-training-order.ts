import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { deleteTrainingOrderWithId } from '@data/trainingOrderSupabase';

export default withApiAuthRequired(async function deleteTrainingOrder(
	req,
	res,
) {
	const session = await getSession(req, res);
	const user = session?.user.email as string;
	try {
		const { reference } = req.body as {
			reference: string;
		};

		await deleteTrainingOrderWithId(reference, user);

		res.status(200).json({ deleted: true });
	} catch (error) {
		console.log({ error });
		res.status(500).json({ error });
	}
});
