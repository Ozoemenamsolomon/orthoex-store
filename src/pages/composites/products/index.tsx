import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import { CategoryProps } from '@components/CategoryCard';
import CTA from '@components/CTA';
import ProductCard from '@components/ProductCard';
import { Container } from '@components/styled';
import { categories } from 'data/categories';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';

import styled from 'styled-components';
import { Dashboard } from 'styled-icons/boxicons-solid';
import { ArrowPrevious, Filter } from 'styled-icons/fluentui-system-filled';
import { CheveronLeft, CheveronRight } from 'styled-icons/zondicons';
import StarRating from 'react-svg-star-rating';
import PriceFilter from '@components/PriceFilter';
import { ProductDataType, productsData } from '@data/productsData';

const filterSections = [
	{
		header: <h2>BRAND</h2>,
		content: (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '.5rem',
				}}>
				<label>
					<input type="checkbox" name="brand" id="brand" />
					<span>OEX Composite</span>
				</label>
				<label>
					<input type="checkbox" name="brand" id="brand" />
					<span>Shangaix</span>
				</label>
			</div>
		),
	},
	{
		header: (
			<div>
				<h2>PRICE (₦)</h2>
				<button
					style={{
						color: 'var(--oex-orange)',
						background: 'none',
						border: 'none',
					}}>
					Apply
				</button>
			</div>
		),
		content: <PriceFilter />,
	},
	{
		header: <h2>PRODUCT RATING</h2>,
		content: (
			<div>
				{new Array(4).fill({}).map((_, index) => (
					<label style={{ display: 'flex', gap: '.2rem' }}>
						<input
							type="radio"
							name="rating-filter"
							id={'rating-filter-' + (4 - index).toString()}
							style={{ margin: '0' }}
						/>
						<StarRating
							size={16}
							initialRating={4 - index}
							isReadOnly
							activeColor="var(--oex-yellow)"
						/>
						<span>&amp; above</span>
					</label>
				))}
			</div>
		),
	},
];

const Products: NextPage<{
	category: CategoryProps;
	products: ProductDataType[];
}> = ({ products }) => {
	const [categoryFilterSlug, setCategoryFilterSlug] = useState<
		string | undefined
	>(undefined);

	const CategoryRadioOption: React.FC<CategoryProps> = ({ name, slug }) => {
		return (
			<label className="label" htmlFor={slug}>
				<input
					type="radio"
					name={'category-selector'}
					id={slug}
					onClick={() => {
						setCategoryFilterSlug(slug);
					}}
				/>
				{name}
			</label>
		);
	};

	const breadcrumb: BreadcrumProps[] = [
		{ name: 'Composites', link: '/composites' },
		{ name: 'All Products', link: '#' },
	];

	console.log({ categoryFilterSlug });

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)">
			<LayoutDiv>
				<Breadcrumb breadcrumb={breadcrumb} />

				<FilterPanel>
					<FilterPanelSection>
						<div>
							<h2>CATEGORY</h2>
						</div>
						<div>
							{categories.map(category => (
								<CategoryRadioOption {...category} />
							))}
						</div>
					</FilterPanelSection>
					{filterSections.map(({ header, content }) => (
						<FilterPanelSection>
							<div>{header}</div>
							{content}
						</FilterPanelSection>
					))}
				</FilterPanel>
				<div>
					<TitleFilterBar>
						<h2>All Products</h2>
						<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
							<h2>Sort by:</h2>
							<select name="sort-by" id="sort-by">
								<option value="popularity">Popularity</option>
								<option value="relevance">Relevance</option>
								<option value="price">Price</option>
							</select>
						</div>
					</TitleFilterBar>
					<div>
						<span>Showing {products.length} Products</span>
						<span>
							<Filter size={24} color="var(--oex-dark-grey)" />
							<Dashboard size={24} color="var(--oex-orange)" />
						</span>
					</div>
					<ProductsContainer>
						{products
							.filter(product => product)
							.map((product, index) => (
								<ProductCard key={`product_${index}`} product={product} />
							))}
						<div>
							<PaginationButton>
								<ArrowPrevious size={24} />
							</PaginationButton>
							<PaginationButton>
								<CheveronLeft size={24} />
							</PaginationButton>
							<PaginationButton className="active">1</PaginationButton>
							<PaginationButton>2</PaginationButton>
							<PaginationButton>
								<CheveronRight size={24} />
							</PaginationButton>
						</div>
					</ProductsContainer>
				</div>
				<div>
					<Image src={categoryBanner} layout="fill" objectFit="contain" />
				</div>
			</LayoutDiv>
		</Container>
	);
};

export default Products;

export const getStaticProps: GetStaticProps = async context => {
	const products = Array.from(
		{ length: 16 },
		() => productsData[Math.round(Math.random() * productsData.length)],
	);

	return {
		props: {
			products,
		},
	};
};

const LayoutDiv = styled.div`
	display: grid;
	grid-template-columns: 320px 1fr;
	gap: 2rem;
	align-items: start;

	> *:nth-child(1),
	> *:last-child {
		grid-column: span 2;
	}

	> *:nth-child(2),
	> *:nth-child(3) {
		background-color: white;
		padding: 1rem;
	}

	> div:last-child {
		position: relative;
		aspect-ratio: 4.1;
	}

	h2 {
		margin: 0;
		font-size: 1.5rem;
	}
`;

const FilterPanel = styled.aside`
	> div:nth-of-type(2) {
		> div:first-child > div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 1;
		}
	}
`;

const FilterPanelSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding-block: 1rem;
	&:not(:last-child) {
		border-bottom: 1px solid var(--oex-grey);
	}
	&:first-child {
		padding-block-start: 0rem;
	}
	.label {
		display: block;
	}
`;

const TitleFilterBar = styled.div`
	display: flex;
	padding-bottom: 1rem;
	justify-content: space-between;
	gap: 2rem;

	select {
		font-size: 1rem;
		color: var(--oex-dark-grey);
		border: none;
	}

	+ div {
		border-bottom: 1px solid var(--oex-grey);
		border-top: 1px solid var(--oex-grey);
		padding-block: 1rem;
		display: flex;
		justify-content: space-between;
	}
`;

const ProductsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
	gap: 2rem;

	> div:last-child {
		display: flex;
		gap: 1rem;
		justify-content: center;
		grid-column: 1 / -1;
	}
`;

const PaginationButton = styled(CTA)`
	color: black;
	background-color: white;
	border: 1px solid var(--oex-grey);
	border-radius: 4px;

	&.active {
		border-color: var(--oex-orange);
	}
`;
