import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import { CategoryProps } from '@components/CategoryCard';
import PriceFilter from '@components/PriceFilter';
import ProductsPanel from '@components/ProductsPanel';
import { Container } from '@components/styled';
import { ProductDataType, productsData } from '@data/productsData';
import { categories } from 'data/categories';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import StarRating from 'react-svg-star-rating';
import styled from 'styled-components';

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

const Category: NextPage<{
	category: CategoryProps;
	products: ProductDataType[];
}> = ({ category: { name: title, image }, products }) => {
	const breadcrumb: BreadcrumProps[] = [
		{ name: 'Composites', link: '/composites' },
		{ name: 'All Categories', link: '/composites/categories' },
		{ name: title, link: '#' },
	];

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)">
			<LayoutDiv>
				<Breadcrumb breadcrumb={breadcrumb} />

				<FilterPanel>
					{filterSections.map(({ header, content }) => (
						<FilterPanelSection>
							<div>{header}</div>
							{content}
						</FilterPanelSection>
					))}
				</FilterPanel>

				<ProductsPanel
					{...{
						products: products.map(product => ({
							...product,
							image,
							name: title,
						})),
						title,
					}}
				/>
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

export const getStaticProps: GetStaticProps = async context => {
	const category = categories.find(
		({ slug }) => slug === context.params?.category,
	);

	const products = Array.from({ length: 9 }, () => productsData[0]);

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
