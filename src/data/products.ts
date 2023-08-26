type ProductType = {
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
	category: {
		name: string;
		slug: string;
		image: string;
		id: number;
	};
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
	custier: 'prime' | 'regular' | 'casual' | null;
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

export const singleDBProductToProductMapper = (product: ProductVariantType) => {
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
