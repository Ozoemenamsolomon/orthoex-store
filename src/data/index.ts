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

type Variant = {
	colour: string;
	hardness: string;
	weightInGram: string;
};

type VariantProduct = {
	id: number;
	code: string;
	name: string;
	image: string;
	description: string;
	details: string;
	brand: {
		name: string;
		slug: string;
	};
	cat: {
		name: string;
		slug: string;
		image: string;
	};
};

// array most likely contains only one item based on the custier
type VariantPrice = {
	id: number;
	custier: string;
	price: number;
	priceInKobo: number;
};

type VariantQuantity = {
	id: number;
	quantity: number;
};

export type ProductVariantType = {
	variant: Variant;
	variantID: number;
	prices: VariantPrice[];
	product: VariantProduct;
	quantity: VariantQuantity;
	reviews?: {
		stars: number;
	}[];
};

export const getProductVariantsByCategory: (
	id: string,
	custier?: string,
) => Promise<ProductVariantType[]> = async (id, custier = 'regular') => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('variants')
		.select(
			`variant, variantID:id,
		quantity(quantity),
		prices(price, priceInKobo, custier, id),
		product!inner(id, code, name, image, description, details,
			brand(name, slug),
			cat:category(name, slug, image)),
		reviews(stars)
		`,
		)
		.eq('product.category', id)
		.eq('prices.custier', custier);

	if (error) {
		console.log({ error });
		return [];
	}
	return data as unknown as ProductVariantType[];
};

export const getProductByCategory = async (id: string, custier?: string) => {
	const { data, error } = await supabaseClient
		.from('products')
		.select(
			`id, code, name, image, description, details,
		brand(name, slug),
		cat:category(name, slug, image), variants(*, prices(*, custier, id), quantity(*), reviews(stars))`,
		)
		.eq('category', id)
		.eq('variants.prices.custier', custier);

	if (error) {
		console.log({ error });
		return [];
	}
	return data;
};

export const getProductByID = async (id: string, custier?: string) => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(
			`variant, variantID:id,
		quantity(quantity),
		prices(price, priceInKobo, custier, id),
		product!inner(id, code, name, image, description, details,
			brand(name, slug),
			cat:category(name, slug, image)),
		reviews(stars)
		`,
		)
		.eq('id', id)
		.eq('prices.custier', custier)
		.single();

	if (error) {
		console.log({ error });
		return null;
	}
	return data as unknown as ProductVariantType;
};

export const getRelatedProducts = async (
	productCode: string,
	custier: string = 'regular',
) => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(
			`variant, variantID:id,
	quantity(quantity),
	prices(price, priceInKobo, custier, id),
	product!inner(id, code, name, image, description, details,
		brand(name, slug),
		cat:category(name, slug, image)),
	reviews(stars)
	`,
		)
		.eq('product.code', productCode)
		.eq('prices.custier', custier)
		.limit(4);

	if (error) {
		console.log({ error });
		return [];
	}

	return data;
};

export const getAllProductVariants = async (custier: string = 'regular') => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(
			`variant, variantID:id,
	quantity(quantity),
	prices(price, priceInKobo, custier, id),
	product!inner(id, code, name, image, description, details,
		brand(name, slug),
		cat:category(name, slug, image)),
	reviews(stars)
	`,
		)
		.eq('prices.custier', custier);

	if (error) {
		console.log({ error });
		return [];
	}

	return data;
};

export const getRecentlyViewedProducts = async (
	custier: string = 'regular',
) => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(
			`variant, variantID:id,
	quantity(quantity),
	prices(price, priceInKobo, custier, id),
	product!inner(id, code, name, image, description, details,
		brand(name, slug),
		cat:category(name, slug, image)),
	reviews(stars)
	`,
		)
		.eq('prices.custier', custier)
		.order('variant', { ascending: false })
		.limit(4);

	if (error) {
		console.log({ error });
		return [];
	}

	return data;
};
