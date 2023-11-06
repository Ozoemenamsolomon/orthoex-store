import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
<<<<<<< HEAD
import {
	updateTrainingOrderToPaid,
	deleteTrainingOrderWithId,
} from '@data/trainingOrderSupabase';

export default withApiAuthRequired(async function trainingOrderHandler(
	req,
	res,
) {
	const session = await getSession(req, res);
	const user = session?.user.email as string;

	if (req.method === 'POST') {
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
	} else if (req.method === 'DELETE') {
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
	} else {
		// Handle other HTTP methods (e.g., PUT) or return an error if needed.
		res.status(405).json({ error: 'Method not allowed' });
	}
=======
import { updateTrainingOrderToPaid, deleteTrainingOrderWithId } from '@data/trainingOrderSupabase';

export default withApiAuthRequired(async function trainingOrderHandler(req, res) {
  const session = await getSession(req, res);
  const user = session?.user.email as string;

  if (req.method === 'POST') {
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
  } else if (req.method === 'DELETE') {
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
  } else {
    // Handle other HTTP methods (e.g., PUT) or return an error if needed.
    res.status(405).json({ error: 'Method not allowed' });
  }

>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
});
