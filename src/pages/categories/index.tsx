import React from 'react';
import styled from 'styled-components';
import Categories from '../../components/Categories';
import { CTA } from '../../components/Header';
import StayTunedSection from '../../components/sections/StayTunedSection';
import SooSection from '../../components/SooSection';
import { Container } from '../../components/styled';
import { categories } from '../composites';

const composite = () => {
	return (
		<Container verticalPadding={7} bg="white">
			composite
			<SooSection>
				<h2>All Categories</h2>
				<Categories categories={categories} />
			</SooSection>
			<SooSection>
				<h2>Popluar Products</h2>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
						gap: '2rem',
					}}
				>
					{Array.from({ length: 4 }).map((_, index) => (
						<ProductCardContainer key={`product_${index}`}>
							<div>
								<img src="https://via.placeholder.com/260x260" alt="product" />
							</div>
							<div>
								<h3>Product Name</h3>
								<p>₦70,000.00</p>
								<div>5555555</div>
								<CTA>ADD TO CART</CTA>
							</div>
						</ProductCardContainer>
					))}
				</div>
			</SooSection>
			<StayTunedSection />
		</Container>
	);
};

export default composite;

const ProductCardContainer = styled.div`
	> div:nth-child(2) {
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	border-radius: 4px;
	transition: all 0.3s ease-in-out;

	button {
		opacity: 0;
	}

	&:hover {
		box-shadow: 8px 8px 13px rgb(0 0 0 / 7%);
		button {
			opacity: 1;
		}
	}
`;
