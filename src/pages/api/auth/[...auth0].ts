import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
	async callback(req, res) {
		try {
			await handleCallback(req, res, { afterCallback });
		} catch (error: any) {
			res.status(error.status || 500).end();
		}
	},
});

const afterCallback: AfterCallback = (req, res, session, state) => {
	if (session.user.isFirstLogin) {
		res.setHeader('Location', '/onboarding');
	}

	return session;
};
