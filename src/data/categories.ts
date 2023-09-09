import { supabaseClient } from '@utils/supabase';

import category1 from '@assets/new/images/category1.jpg';
import category10 from '@assets/new/images/category10.jpg';
import category2 from '@assets/new/images/category2.jpg';
import category3 from '@assets/new/images/category3.jpg';
import category4 from '@assets/new/images/category4.jpg';
import category5 from '@assets/new/images/category5.jpg';
import category6 from '@assets/new/images/category6.jpg';
import category7 from '@assets/new/images/category7.jpg';
import category8 from '@assets/new/images/category8.jpg';
import category9 from '@assets/new/images/category9.jpg';
import { StaticImageData } from 'next/image';

export type CategoryProps = {
	name: string;
	url: string;
	image: StaticImageData | string;
};

export const categories: CategoryProps[] = [
	{
		name: 'Polyester Resin & Components',
		url: '/composites/categories/polyester-resin-and-components',
		image: category1,
	},
	{
		name: 'Epoxy Resin & Components',
		url: '/composites/categories/epoxy-resin-and-components',
		image: category2,
	},
	{
		name: 'Silicone & Polyurethane Rubber',
		url: '/composites/categories/silicone-and-polyurethane-rubber',
		image: category3,
	},
	{
		name: 'Fabric & Prepreg Reinforcements',
		url: '/composites/categories/fabric-and-prepreg-reinforcements',
		image: category4,
	},
	{
		name: 'Gelcoats',
		url: '/composites/categories/gelcoats',
		image: category5,
	},
	{
		name: 'Expanding Foams',
		url: '/composites/categories/expanding-foams',
		image: category6,
	},
	{
		name: 'Colour Pigments',
		url: '/composites/categories/colour-pigments',
		image: category7,
	},
	{
		name: 'Sealants & Adhesives',
		url: '/composites/categories/sealants-and-adhesives',
		image: category8,
	},
	{
		name: 'Tools, Machines & Supplies',
		url: '/composites/categories/tools-machines-and-supplies',
		image: category9,
	},
	{
		name: 'Mould Release Agents',
		url: '/composites/categories/mould-release-agents',
		image: category10,
	},
];

export type Category = {
	name: string;
	slug: string;
	image: string;
	id: number;
};

export const getCategories = async () => {
	const { data, error } = await supabaseClient
		.from('categories')
		.select('id,name,image,slug');

	if (error) {
		console.log({ error });
		return [];
	}
	return data as Category[];
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
	return data as Category;
};
