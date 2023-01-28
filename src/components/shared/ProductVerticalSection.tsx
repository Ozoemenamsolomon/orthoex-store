import { StaticImageData } from 'next/image';

import React from 'react';
import styled from 'styled-components';
import CategorySection, { CategoryViewMoreType } from './CategorySection';

type CardType = {
	image: StaticImageData | string;
	name: string;
	slug: string;
};

export type ProductVerticalSectionType = {
	title: string;
	description: string;
	cards: CardType[];
	viewMore: CategoryViewMoreType;
};

type ServiceCardProps = {
	data: ProductVerticalSectionType;
};

// TODO: merge with category cards
const ProductVerticalSection: React.FC<ServiceCardProps> = ({ data }) => {
	return (
		<ProductVerticalWrapper>
			<PageContainer>
				<Title>{data.title}</Title>
				<Description>{data.description}</Description>

				<CategorySection cards={data.cards} viewMore={data.viewMore} />
			</PageContainer>
		</ProductVerticalWrapper>
	);
};

export default ProductVerticalSection;

const ProductVerticalWrapper = styled.div`
	background-color: var(--oex-off-white);
	padding: 3rem 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 3rem 2rem;
	}
`;

const Title = styled.div`
	font-size: 2rem;
	margin-bottom: 2rem;
	font-weight: 500;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-weight: 700;
		font-size: 3rem;
		text-align: center;
		max-width: 70%;
		margin: 1rem auto;
	}
`;

const Description = styled.div`
	color: var(--text-colour-grey);

	@media ${({ theme }) => theme.breakpoints.above.md} {
		text-align: center;
		max-width: 50%;
		margin: 1rem auto;
		font-size: 1.2rem;
		line-height: 1.8rem;
	}
`;

const PageContainer = styled.div`
	max-width: 1150px;
	margin: 0 auto;
`;
