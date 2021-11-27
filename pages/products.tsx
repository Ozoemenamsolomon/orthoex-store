import React from 'react';
import styled from 'styled-components';
import { Container } from '.';
import ProductCard from '../src/components/ProductCard';

const productsData = [
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

const products = () => {
	return (
		<ProductCardsSection>
			{productsData.map(({ title, img, description, price }) => (
				<ProductCard
					title={title}
					description={description}
					price={price}
					imageURL={`${img}`}
				/>
			))}
		</ProductCardsSection>
	);
};

export default products;

const ProductCardsSection = styled(Container)`
	display: grid;
	grid-template-columns: repeat(auto-fit, min(100%, 300px));
	gap: 1.5rem 1rem;
	margin: auto;
	justify-content: space-evenly;
`;
