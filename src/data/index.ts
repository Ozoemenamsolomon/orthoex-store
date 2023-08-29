import { supabaseClient } from '@utils/supabase';

export const getUnpaidOrder = async (reference: string) => {
	const { data, error } = await supabaseClient
		.from('orders')
		.select('*')
		.eq('reference', reference)
		.eq('paid', false)
		.eq('delivered', false)
		.gt('expiresAt', new Date().toISOString())
		.single();

	if (error) {
		console.log(error);
		return null;
	}

	return data;
};
