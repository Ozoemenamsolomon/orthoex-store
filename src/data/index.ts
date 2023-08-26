import { supabaseClient } from '@utils/supabase';

export const getCategories = async () => {
	const { data, error } = await supabaseClient
		.from('categories')
		.select('id,name,image,slug');

	if (error) {
		console.log({ error });
		return [];
	}
	return data;
};

export const getCategoryBySlug = async (slug: string) => {
	const { data, error } = await supabaseClient
		.from('categories')
		.select('id,name,image,slug')
		.eq('slug', slug)
		.single();

	if (error) {
		console.log({ error });
		return null;
	}
	return data;
};

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
