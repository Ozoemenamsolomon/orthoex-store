import { supabaseClient } from '@utils/supabase';

export type Brand = {
	name: string;
	slug: string;
	id: number;
};

export const getBrands = async (categorySlug: string) => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('brands')
		.select('id,name,slug, products(id, category!inner(slug))')
		.eq('products.category.slug', categorySlug)
		.not('products', 'is', null)
		.returns<Brand>();

	if (!data) {
		console.log({ error });
		return [];
	}

	return data;
};
