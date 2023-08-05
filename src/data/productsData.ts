import { CategoryProps } from 'data/categories';
import { StaticImageData } from 'next/image';
import { ProductVariantType } from '.';

export type ProductDataType = {
	name: string;
	code: string;
	brand: { name: string; slug: string };
	category: CategoryProps;
	image: StaticImageData | string;
	details?: string | null;
	description?: string;

	previewImages?: StaticImageData[];
	review?: { count: number; average: number };
	variants: ProductVariant[];
};

type price = {
	custier: 'prime' | 'regular' | 'casual' | null;
	priceInKobo: number;
};

type ProductVariant = {
	id: number;
	variant: {
		weightInGram: number | null;
		hardness: number | null;
		volumeInML: number | null;
		colour: string | null;
		gsm: number | null;
		material: string | null;
	};
	prices: price[];
	quantity: number;
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
		quantity,
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
	};
};
