import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { insert } from '../../../utils/rehabspcetable';
import { supabaseClient } from '@utils/supabase';

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
				customerEmail: session?.user?.email,
				email: session?.user?.email,
				firstName: session?.user?.name || session?.user?.email?.split('@')[0] || '',
				lastName: session?.user?.nickname || '',
				profession: '',
				city: '',
				phoneNumber: '',
				sessionBalance: 0,
				whatsappNumber: '',
				customerType: 'Clinician',
			}]
			const insertionResult = await insert('customers', data);
			
			// console.log('user', insertionResult);
			res.setHeader('Location', '/onboarding');
		  } catch (error) {
			console.error(error);
		  }
	} else {
		try {
			const { data: customer, error } = await supabaseClient
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