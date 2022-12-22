import { categories } from './categories';
import product1 from '@assets/new/images/product1.jpg';
import product1prev from '@assets/new/images/product1prev.jpg';
import { CategoryProps } from '@components/CategoryCard';
import { brands } from './brands';
import { StaticImageData } from 'next/image';

export type ProductDataType = {
	code: string;
	brand: { name: string; slug: string };
	category: CategoryProps;
	description: string;
	image: StaticImageData;
	name: string;
	previewImages: StaticImageData[];
	price: number;
	productDetail: string;
	weightInGrams: number;
	review: { count: number; average: number };
};

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
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 50,
		weightInGrams: 100,
		review: { count: 14, average: 2.6 },
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
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 55787455,
		weightInGrams: 1000,
		review: { count: 23, average: 3.5 },
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
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 4577,
		weightInGrams: 1030,
		review: { count: 54, average: 3.9 },
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
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 3345,
		weightInGrams: 1000985,
		review: { count: 97, average: 2.2 },
	},
	{
		brand: brands[1],
		category: categories[5],
		code: 'PROD_128745875',

		description: 'This is Polyester Resin B',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin B',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 23456766,
		weightInGrams: 10985,
		review: { count: 56, average: 1.4 },
	},
	{
		brand: brands[0],
		category: categories[5],
		code: 'PROD_676344827',

		description: 'This is Polyester Resin S',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin S',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 23456,
		weightInGrams: 10955,
		review: { count: 85, average: 4.8 },
	},
	{
		brand: brands[1],
		category: categories[7],
		code: 'PROD_8874598489',

		description: 'This is Silicone',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Silicone',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 20320,
		weightInGrams: 950985,
		review: { count: 32, average: 2.0 },
	},
];
