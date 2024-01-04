import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { insert } from '../../../utils/rehabspcetable';

export default handleAuth({
	async callback(req, res) {
		try {
			await handleCallback(req, res, { afterCallback });
		} catch (error: any) {
			res.status(error.status || 500).end();
		}
	},
});

const afterCallback: AfterCallback = async (req, res, session, state) => {
	// insert available data from auth0
		if (session.user.isFirstLogin) {
		try {
			const data = [{
				registrationDate: new Date().toISOString(),
				userEmail: session?.user?.email,
				firstName: session?.user?.given_name,
				lastName: session?.user?.family_name,
				profession: '',
				city: '',
				phoneNumber: '',
				whatsappNumber: '',
				userType: '',
			}]
			const insertionResult = await insert('users', data);
			// console.log('user', insertionResult);
			res.setHeader('Location', '/onboarding');
		  } catch (error) {
			console.error(error);
		  }
	}

	return session;
};
