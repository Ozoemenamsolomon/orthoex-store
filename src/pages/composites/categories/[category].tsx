import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import { CategoryProps } from '@components/CategoryCard';
import { CTA } from '@components/Header';
import ProductCard, { ProductProps } from '@components/ProductCard';
import { Container } from '@components/styled';
import { categories } from 'data/categories';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import styled from 'styled-components';
import { Dashboard } from 'styled-icons/boxicons-solid';
import { ArrowPrevious, Filter } from 'styled-icons/fluentui-system-filled';
import { CheveronLeft, CheveronRight } from 'styled-icons/zondicons';
const Category: NextPage<{
	category: CategoryProps;
	products: ProductProps[];
}> = ({ category: { title, image }, products }) => {
	const breadcrumb: BreadcrumProps[] = [
		{ name: 'Composites', link: '/composites' },
		{ name: 'All Categories', link: '/composites/categories' },
		{ name: title, link: '#' },
	];

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)"
		>
			<LayoutDiv>
				<Breadcrumb breadcrumb={breadcrumb} />

				<FilterPanel>
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
							<CTA>Apply</CTA>
						</div>
						<div>
							<input type="range" name="price-filte" id="price-filter" />
						</div>
						<div>
							<output name="price-filter-start">200</output> -{' '}
							<output name="price-filter-end">30,000</output>
						</div>
					</div>
				</FilterPanel>
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
						<span>Showing {products.length} Products</span>
						<span>
							<Filter size={24} color="var(--oex-dark-grey)" />
							<Dashboard size={24} color="var(--oex-orange)" />
						</span>
					</div>
					<ProductsContainer>
						{products.map((product, index) => (
							<ProductCard
								key={`product_${index}`}
								product={{ ...product, name: title, image }}
							/>
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

	const products = Array.from({ length: 9 }, () => ({
		image: categoryBanner,
		price: 170000,
		name: 'title',
		rating: {
			count: 0,
			stars: 3.5,
		},
	}));

	return {
		props: {
			category,
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
		/* background-color: goldenrod; */
		border-bottom: 1px solid var(--oex-grey);
		border-top: 1px solid var(--oex-grey);
		padding-block: 1rem;

		> div:first-child {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
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
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
