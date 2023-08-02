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
