import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { supabaseClient } from '@utils/supabase';

const logger = (e: any) => {
	console.log('from verify.tsx');
	console.log({ e });
};

export default withApiAuthRequired(async function verify(req, res) {
	const session = await getSession(req, res);
	const { reference } = req.body.reference;

	const { data, error } = await supabaseClient
		.from('orders')
		.select('*')
		.eq('reference', reference)
		.eq('user', session?.user?.email)
		.single();

	if (error) {
		logger({ error });
		return res.status(400).json({ error: error.message });
	}
	const verifyUrl = `https://api.paystack.co/transaction/verify/${data.reference}`;

	const verify = await fetch(verifyUrl, {
		headers: {
			Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
		},
	})
		.then(res => res.json())
		.catch(err => {
			logger('an error occured verifying the transaction');
			logger({ err });
			return res.status(400).json({ error: err.message });
		});
	logger({ verify });

	if (verify?.data?.status !== 'success') {
		logger({ verify });
		return res.status(400).json({ error: 'Transaction not successful' });
	}

	const { data: updatedData, error: updatedError } = await supabaseClient
		.from('orders')
		.update({ paid: true })
		.eq('reference', reference)
		.eq('user', session?.user?.email);

	logger({ updatedData, updatedError });

	if (updatedError) {
		logger({ updatedError });
		return res.status(400).json({ okay: false });
	}
	res.status(200).json({ okay: true });
});
