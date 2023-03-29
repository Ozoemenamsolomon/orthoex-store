import product1 from '@assets/new/images/product1.jpg';
import product1prev from '@assets/new/images/product1prev.jpg';
import { categories, CategoryProps } from 'data/categories';
import { StaticImageData } from 'next/image';
import { brands } from './brands';

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

type VariedProductVariant = Omit<ProductVariant, 'prices'> & {
	price: price;
};

type VariedProduct = Omit<ProductDataType, 'variants'> & {
	variant: VariedProductVariant;
};

export const sampleVariedProduct: VariedProduct = {
	brand: brands[0],
	code: 'PROD_123456789',
	category: categories[1],
	description:
		'FLAG Resin is a part our Medium-Viscosity 2:1 Non-Blushing Resin. FLAG stands for filling, laminating and gluing. It is compatible with LV Resin and the Slow.',
	image: product1,
	previewImages: [product1, product1, product1],
	name: 'Polyester Resin',
	details:
		'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\r - Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\r - Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum',
	review: { count: 0, average: 0 },
	variant: {
		id: 1,
		variant: {
			weightInGram: 100,
			hardness: 1,
			volumeInML: 100,
			colour: 'red',
			gsm: 100,
			material: 'plastic',
		},
		price: {
			custier: 'prime',
			priceInKobo: 100000,
		},
		quantity: 100,
	},
};

// [
// 	,
// 	{
// 		id: 2,
// 		variant: {
// 			weightInGram: 100,
// 			hardness: 1,
// 			volumeInML: 100,
// 			colour: 'red',
// 			gsm: 100,
// 			material: 'plastic',
// 		},
// 		prices: [
// 			{
// 				custier: 'prime',
// 				priceInKobo: 100000,
// 			},
// 			{
// 				custier: 'regular',
// 				priceInKobo: 100000,
// 			},
// 			{
// 				custier: 'casual',
// 				priceInKobo: 100000,
// 			},
// 		],
// 		quantity: 100,
// 	},
// ],

export const productsData: ProductDataType[] = [
	{
		brand: brands[0],
		code: 'PROD_123456789',
		category: categories[1],
		description:
			'FLAG Resin is a part our Medium-Viscosity 2:1 Non-Blushing Resin. FLAG stands for filling, laminating and gluing. It is compatible with LV Resin and the Slow.',
		image: product1,
		previewImages: [product1, product1, product1],
		name: 'Polyester Resin',
		details:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		review: { count: 14, average: 2.6 },
		variants: [],
	},
	{
		code: '127823-237834ewrf',
		name: 'tgjklrtrtoit rt',
		image:
			'https://res.cloudinary.com/kachiozo/image/upload/v1673589643/orthoex-product/categories/category8_qx9anl.jpg',
		description: 'ztjuzmnzth tzjmzuk,uimgh gh',
		details: 'tzjmnt6uznjtf tzzujmnzujk67umtz',
		brand: {
			name: 'Shangaix',
			slug: 'shangaix',
		},
		category: {
			name: 'Sealants & Adhesives',
			slug: 'sealants-and-adhesives',
			image:
				'https://res.cloudinary.com/kachiozo/image/upload/v1673589643/orthoex-product/categories/category8_qx9anl.jpg',
		},
		variants: [
			{
				variant: {
					weightInGram: 2435,
					hardness: 35,
					volumeInML: 23453.6867,
					colour: 'rtdjnztn ght ntz',
					gsm: 3456,
					material: 'tzm uz tznrt',
				},
				id: 687,
				prices: [
					{
						custier: 'prime',
						priceInKobo: 3243546,
					},
				],
				quantity: 56,
			},
		],
	},
	{
		brand: brands[1],
		code: 'PROD_12349865646789',

		category: categories[1],
		description:
			'This is an Accelerator	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum quos dignissimos eius velit, expedita dolores. ',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Accelerator',
		details:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		review: { count: 23, average: 3.5 },
		variants: [],
	},
	{
		brand: brands[1],
		category: categories[3],
		code: 'PROD_10973575789',

		description:
			'This is an Epoxy Resin Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, debitis.',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Epoxy Resin',
		details:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		review: { count: 54, average: 3.9 },
		variants: [],
	},
	{
		brand: brands[0],
		category: categories[4],
		code: 'PROD_104895785',

		description:
			'This is Mica Pigment Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Mica Pigment',
		details:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		review: { count: 97, average: 2.2 },
		variants: [],
	},
	{
		brand: brands[1],
		category: categories[5],
		code: 'PROD_128747895875',

		description: 'This is Polyester Resin B',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin B',
		details:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		review: { count: 56, average: 1.4 },
		variants: [],
	},
	{
		brand: brands[0],
		category: categories[5],
		code: 'PROD_676344827',

		description: 'This is Polyester Resin S',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin S',
		details:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		review: { count: 85, average: 4.8 },
		variants: [],
	},
	{
		brand: brands[1],
		category: categories[7],
		code: 'PROD_8874598489',

		description: 'This is Silicone',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Silicone',
		details:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		review: { count: 32, average: 2.0 },
		variants: [],
	},
];
