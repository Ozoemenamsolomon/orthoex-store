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
	slug: string;
	image: StaticImageData | string;
};

export const categories: CategoryProps[] = [
	{
		name: 'Polyester Resin & Components',
		slug: 'polyester-resin-and-components',
		image: category1,
	},
	{
		name: 'Epoxy Resin & Components',
		slug: 'epoxy-resin-and-components',
		image: category2,
	},
	{
		name: 'Silicone & Polyurethane Rubber',
		slug: 'silicone-and-polyurethane-rubber',
		image: category3,
	},
	{
		name: 'Fabric & Prepreg Reinforcements',
		slug: 'fabric-and-prepreg-reinforcements',
		image: category4,
	},
	{
		name: 'Gelcoats',
		slug: 'gelcoats',
		image: category5,
	},
	{
		name: 'Expanding Foams',
		slug: 'expanding-foams',
		image: category6,
	},
	{
		name: 'Colour Pigments',
		slug: 'colour-pigments',
		image: category7,
	},
	{
		name: 'Sealants & Adhesives',
		slug: 'sealants-and-adhesives',
		image: category8,
	},
	{
		name: 'Tools, Machines & Supplies',
		slug: 'tools-machines-and-supplies',
		image: category9,
	},
	{
		name: 'Mould Release Agents',
		slug: 'mould-release-agents',
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
