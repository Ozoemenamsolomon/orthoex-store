import { supabaseClient } from '@utils/supabase';
import { Category } from './categories';

/**
 * This is the product type we need in the codebase
 */
export type ProductType = {
	id: number;
	code: string;
	name: string;
	image: string;
	description: string;
	details: string;
	brand: Brand;
	category: Category;
	quantityAvailable: number;
	price: number;
	variant: Variant;
	variantID: number;
	review: {
		count: number;
		average: number;
	};
};

type Variant = {
	weightInGram: number | null;
	hardness: number | null;
	volumeInML: number | null;
	colour: string | null;
	gsm: number | null;
	material: string | null;
};

type Brand = {
	name: string;
	slug: string;
	id: number;
};

/**
 * This is the product type we get fom the DB
 */
type ProductVariantType = {
	variant: Variant;
	variantID: number;
	/**
	 * @note array most likely contains only one item based on the custier
	 */
	prices: {
		id: number;
		custier: 'prime' | 'regular' | 'casual' | null;
		price: number;
		priceInKobo: number;
	}[];
	product: {
		id: number;
		code: string;
		name: string;
		image: string;
		description: string;
		details: string;
		brand: Brand;
		cat: Category;
	};
	quantity: {
		id: number;
		quantity: number;
	} | null;
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
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('product.category', id)
		.eq('prices.custier', custier)
		.returns<ProductVariantType>();

	if (error) {
		console.log({ error });
		return [];
	}
	return data.map(product => singleDBProductToProductMapper(product));
};

export const getProductVariantsByMultipleIDs = async (
	ids: number[],
	custier: string,
) => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.in('id', ids)
		.eq('prices.custier', custier)
		.returns<ProductVariantType>();

	if (error) {
		console.log({ error });
		return [];
	}

	return data.map(product => singleDBProductToProductMapper(product));
};

export const getRecentlyViewedProducts = async (custier: string) => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('prices.custier', custier)
		.order('variant', { ascending: false })
		.limit(4)
		.returns<ProductVariantType>();

	if (error) {
		console.log({ error });
		return [];
	}

	return data.map(product => singleDBProductToProductMapper(product));
};

export const getProductByID = async (id: string, custier?: string) => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('id', id)
		.eq('prices.custier', custier)
		.returns<ProductVariantType>()
		.single();

	if (error) {
		console.log({ error });
		return null;
	}

	return singleDBProductToProductMapper(data);
};

export const getRelatedProducts = async (
	productCode: string,
	custier = 'casual',
) => {
	const { data, error } = await supabaseClient
		.from('variants')
		.select(productVariantQuery)
		.eq('product.code', productCode)
		.eq('prices.custier', custier)
		.limit(4)
		.returns<ProductVariantType>();

	if (error) {
		console.log({ error });
		return [];
	}

	return data.map(product => singleDBProductToProductMapper(product));
};

const singleDBProductToProductMapper = (product: ProductVariantType) => {
	const {
		product: { cat, ...productData },
		prices,
		quantity,
		variant,
		variantID,
		reviews,
	} = product;

	return {
		category: cat,
		...productData,
		image: productData.image || cat.image,
		quantityAvailable: quantity?.quantity || 0,
		price: prices.length ? prices[0].price : 0,
		variant,
		variantID,
		review: reviews?.length
			? {
					count: reviews.length,
					average:
						reviews.reduce((acc, review) => acc + review.stars, 0) /
						reviews.length,
			  }
			: { count: 0, average: 0 },
	} as ProductType;
};
