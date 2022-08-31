import { CategoryProps } from '@components/CategoryCard';
import ProductCard from '@components/ProductCard';
import { Container } from '@components/styled';
import { categories } from 'data/categories';
import { GetStaticProps, NextPage } from 'next';
import OrderIcon from '@assets/new/icons/Order';
import LayoutIcon from '@assets/new/icons/Layout';

import React from 'react';
import styled from 'styled-components';

const Category: NextPage<{ category: CategoryProps }> = ({
	category: { title, image },
}) => {
	const { productCount } = { productCount: 9 };
	return (
		<Container verticalPaddingInREM={7} paddingMultiplier={4} bg="#fafafa">
			<LayoutDiv>
				<div>
					<span>Composites</span>
					<span>&gt;&gt;</span>
					<span>All Categories</span>
					<span>&gt;&gt;</span>
					<span>{title}</span>
				</div>

				<div>
					<h2>BRAND</h2>
					<div>
						<div>
							<input type="checkbox" name="brand" id="brand" />
							<span>OEX Composite</span>
						</div>
						<div>
							<input type="checkbox" name="brand" id="brand" />
							<span>Shangaix</span>
						</div>
					</div>
					<div>
						<div>
							<h2>PRICE (₦)</h2>
							Apply
						</div>
						<div>
							<input type="range" name="price-filte" id="price-filter" />
						</div>
						<div>
							<output name="price-filter-start">200</output> -{' '}
							<output name="price-filter-end">30,000</output>
						</div>
					</div>
				</div>
				<div>
					<TitleFilterBar>
						<h2>{title}</h2>
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
						<span>Showing {productCount} Products</span>{' '}
						<span>
							<OrderIcon />
							<LayoutIcon />
						</span>
					</div>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
							gap: '2rem',
						}}
					>
						{Array.from({ length: productCount }, () => ({
							image: image,
							price: 170000,
							name: title,
							rating: {
								count: 0,
								stars: 3.5,
							},
						})).map((product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						))}
						<div style={{ gridColumn: '1/-1' }}>pagination</div>
					</div>
				</div>
				<div>hello</div>
			</LayoutDiv>
		</Container>
	);
};

export default Category;

export async function getStaticPaths() {
	const paths = categories.map(({ slug }) => ({ params: { category: slug } }));
	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const category = categories.find(
		({ slug }) => slug === context.params?.category
	);

	return {
		props: { category },
	};
};

const LayoutDiv = styled.div`
	display: grid;
	grid-template-columns: 320px 1fr;
	gap: 2rem;

	> div:nth-child(1),
	> div:last-child {
		grid-column: span 2;
	}
`;

const TitleFilterBar = styled.div`
	display: flex;
	padding-block: 1rem;
	justify-content: space-between;

	h2 {
		margin: 0;
	}

	+ div {
		border-bottom: 1px solid #cfcfcf;
		border-top: 1px solid #cfcfcf;
		padding-block: 1rem;
		display: flex;
		justify-content: space-between;
	}
`;
