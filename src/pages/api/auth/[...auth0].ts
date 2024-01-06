import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { supabaseTrainingClient } from '@utils/supabase';

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
	if (session.user.isFirstLogin) {
		res.setHeader('Location', '/onboarding');
	} else {
		try {
			const { data: customer, error } = await supabaseTrainingClient
				.from('customers')
				.select('*')
				.eq('customerEmail', session.user.email)
				.single();

			if (error && error.code == 'PGRST116') {
				res.setHeader('Location', '/onboarding');
			}

			if (customer) {
				session.user.customer = customer;
			}
		} catch (error) {
			console.log(error);
		}
	}
	return session;
};
