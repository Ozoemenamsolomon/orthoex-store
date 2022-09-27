import { categories } from './categories';

export const productsData = [
	{
		name: 'Polyester Resin',
		price: 50,
		description:
			'FLAG Resin is a part our Medium-Viscosity 2:1 Non-Blushing Resin. FLAG stands for filling, laminating and gluing. It is compatible with LV Resin and the Slow.',
		category: categories[Math.round(Math.random() * 10)],
		brand: { name: 'OEX' },
		review: { count: 30, average: 3.5 },
	},
	{
		title: 'Accelerator',
		img: 'accelerator.png',
		description:
			'This is an Accelerator	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum quos dignissimos eius velit, expedita dolores. ',
		price: 200,
	},
	{
		title: 'Epoxy Resin',
		img: 'epoxy-resin.png',
		description:
			'This is an Epoxy Resin Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, debitis.',
		price: 200,
	},
	{
		title: 'Mica Pigment',
		img: 'mica-pigment.png',
		description:
			'This is Mica Pigment Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum',
		price: 200,
	},
	{
		title: 'Polyester Resin B',
		img: 'polyester-resin-b.png',
		description: 'This is Polyester Resin B',
		price: 200,
	},
	{
		title: 'Polyester Resin S',
		img: 'polyester-resin-s.png',
		description: 'This is Polyester Resin S',
		price: 200,
	},
	{
		title: 'Silicone',
		img: 'silicone.png',
		description: 'This is Silicone',
		price: 200,
	},
];
