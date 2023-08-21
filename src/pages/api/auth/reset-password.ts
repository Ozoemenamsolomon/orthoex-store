import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function resetPassword(req, res) {
	try {
		const session = await getSession(req, res);

		const response = await fetch(
			`${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					client_id: process.env.AUTH0_CLIENT_ID,
					connection: 'Username-Password-Authentication',
					email: session?.user?.email,
				}),
			},
		);

		if (response.ok) {
			return res.status(200).json({ status: 'ok' });
		}

		res.status(response.status).json(await response.json());
	} catch (error) {
		console.log({ error });
		res.status(400).json({ error: 'Something went wrong' });
	}
});
