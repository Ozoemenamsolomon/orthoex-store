import React from 'react';
import styled from 'styled-components';
import { Container } from '../components/styled';
import { HeroComp } from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/productsData';
import product1 from '@assets/new/images/product1.jpg';

const products = () => {
	return (
		<>
			<HeroComp>
				<HeroTitle>Products</HeroTitle>
			</HeroComp>

			<ProductCardsSection>
				{productsData.map(({ name, img, description, price }, id) => (
					<ProductCard
						key={id}
						product={{
							name,
							price: price,
							image: product1,
							rating: {
								stars: 4.2,
								count: 16,
							},
						}}
					/>
				))}
			</ProductCardsSection>
		</>
	);
};

export default products;

const HeroTitle = styled.h1`
	text-align: center;
	width: 100%;
`;

const ProductCardsSection = styled(Container)`
	display: grid;
	grid-template-columns: repeat(auto-fit, min(100%, 300px));
	gap: 1.5rem 1rem;
	margin: auto;
	padding-top: 6rem;
	padding-bottom: 6rem;
	justify-content: space-evenly;
`;
