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
		id: number;
	};
	cat: {
		name: string;
		slug: string;
		image: string;
		id: number;
	};
};

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
	/**
	 * @note array most likely contains only one item based on the custier
	 */
	prices: VariantPrice[];
	product: VariantProduct;
	quantity: VariantQuantity | null;
	reviews?: {
		stars: number;
	}[];
};

const productVariantQuery = `
variant,
variantID:id,
quantity(quantity),
reviews(stars),
prices(price, priceInKobo, custier, id),
product!inner(id, code, name, image, description, details,
	brand(name, slug, id),
	cat:category(name, slug, image, id))
	`;

export const getProductVariantsByCategory = async (
	id: string,
	custier = 'casual',
) => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('product.category', id)
		.eq('prices.custier', custier);

	if (error) {
		console.log({ error });
		return [];
	}
	return data as unknown as ProductVariantType[];
};

export const getProductVariantsByMultipleIDs = async (
	ids: number[],
	custier: string,
) => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.in('id', ids)
		.eq('prices.custier', custier);

	if (error) {
		console.log({ error });
		return [];
	}
	return data as unknown as ProductVariantType[];
};

export const getProductByID = async (id: string, custier?: string) => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
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
	custier = 'casual',
) => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('product.code', productCode)
		.eq('prices.custier', custier)
		.limit(4);

	if (error) {
		console.log({ error });
		return [];
	}

	return data;
};

export const getAllProductVariants = async (custier = 'casual') => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('prices.custier', custier);

	if (error) {
		console.log({ error });
		return [];
	}

	return data;
};

export const getRecentlyViewedProducts = async (custier = 'casual') => {
	// @ts-ignore
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('prices.custier', custier)
		.order('variant', { ascending: false })
		.limit(4);

	if (error) {
		console.log({ error });
		return [];
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
