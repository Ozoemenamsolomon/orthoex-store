import { categories } from './categories';
import product1 from '@assets/new/images/product1.jpg';
import product1prev from '@assets/new/images/product1prev.jpg';
import { CategoryProps } from '@components/CategoryCard';
import { brands } from './brands';

export type ProductDataType = {
	brand: { name: string; slug: string };
	category: CategoryProps;
	description: string;
	image: StaticImageData;
	name: string;
	previewImages: StaticImageData[];
	price: number;
	productDetail: string;
	review: { count: number; average: number };
};

export const productsData: ProductDataType[] = [
	{
		brand: brands[0],
		category: categories[1],
		description:
			'FLAG Resin is a part our Medium-Viscosity 2:1 Non-Blushing Resin. FLAG stands for filling, laminating and gluing. It is compatible with LV Resin and the Slow.',
		image: product1,
		previewImages: [product1, product1, product1],
		name: 'Polyester Resin',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 50,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: brands[1],
		category: categories[2],
		description:
			'This is an Accelerator	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum quos dignissimos eius velit, expedita dolores. ',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Accelerator',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: brands[1],
		category: categories[3],
		description:
			'This is an Epoxy Resin Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, debitis.',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Epoxy Resin',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: brands[0],
		category: categories[4],
		description:
			'This is Mica Pigment Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolorem at exercitationem eaque facilis laborum',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Mica Pigment',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: brands[1],
		category: categories[5],
		description: 'This is Polyester Resin B',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin B',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: brands[1],
		category: categories[6],
		description: 'This is Polyester Resin S',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Polyester Resin S',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
	{
		brand: brands[1],
		category: categories[7],
		description: 'This is Silicone',
		image: product1,
		previewImages: [product1prev, product1prev, product1prev],
		name: 'Silicone',
		productDetail:
			'- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum morbi ac egestas sed mattis vitae. Phasellus risus, quam eu gravida etiam aliquam pharetra felis. , tellus congue proin amet nunc. Et sagittis, vitae dolor adipiscing dolor enim. Nisl mi congue ipsum mauris risus a, mauris.\n- Nibh elementum in viverra eu pellentesque quis. Semper nibh tellus enim porta. Eu lorem viverra interdum ac ac scelerisque ipsum enim auctor. Nunc urnaque sed enim eleifend volutpat gravida. Cursus habitant scelerisque suspendisse ornare lectus\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget sem nulla integer. Cras sed accumsan sit vitae mattis aliquet viverra cursus magna ut.\n- Adipiscing lectus faucibus condimentum nibh nisl ultricies. Nisi, nisi mauris sem purus, nulla arcu risus velit. Integer non eu vestibulum accumsan, egestas fermentum pellentesque in. Leo ut nec sit metus proin mi potenti nunc mauris. Amet semper in gravida eget.',
		price: 200,
		review: { count: 30, average: 3.5 },
	},
];
