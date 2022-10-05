import { categories } from './categories';
import product1 from '@assets/new/images/product1.jpg';
import product1prev from '@assets/new/images/product1prev.jpg';
import { CategoryProps } from '@components/CategoryCard';

export type ProductDataType = {
	brand: { name: string };
	category: CategoryProps;
	description: string;
	image: StaticImageData;
	name: string;
	previewImages: StaticImageData[];
	price: number;
	review: { count: number; average: number };
};

export const productsData: ProductDataType[] = [
	{
		brand: { name: 'OEX' },
		category: categories[Math.round(Math.random() * 10)],
		description:
			'FLAG Resin is a part our Medium-Viscosity 2:1 Non-Blushing Resin. FLAG stands for filling, laminating and gluing. It is compatible with LV Resin and the Slow.',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin',
		price: 50,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: { name: 'OEX' },
		category: categories[Math.round(Math.random() * 10)],
		description:
			'This is an Accelerator	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum quos dignissimos eius velit, expedita dolores. ',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Accelerator',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: { name: 'OEX' },
		category: categories[Math.round(Math.random() * 10)],
		description:
			'This is an Epoxy Resin Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, debitis.',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Epoxy Resin',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: { name: 'OEX' },
		category: categories[Math.round(Math.random() * 10)],
		description:
			'This is Mica Pigment Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Mica Pigment',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: { name: 'OEX' },
		category: categories[Math.round(Math.random() * 10)],
		description: 'This is Polyester Resin B',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin B',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: { name: 'OEX' },
		category: categories[Math.round(Math.random() * 10)],
		description: 'This is Polyester Resin S',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin S',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: { name: 'OEX' },
		category: categories[Math.round(Math.random() * 10)],
		description: 'This is Silicone',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Silicone',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
];
