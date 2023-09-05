import { supabaseClient } from '@utils/supabase';

export const getBrands = async (categorySlug: string) => {
	const { data, error } = await supabaseClient
		.from('brands')
		.select('id,name,slug, products(id, category!inner(slug))')
		.eq('products.category.slug', categorySlug)
		.not('products', 'is', null);

	if (error) {
		console.log({ error });
		return [];
	}
	console.log({ data });
	return data as {
		id: number;
		name: string;
		slug: string;
	}[];
};
