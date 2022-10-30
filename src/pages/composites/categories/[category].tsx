import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import { CategoryProps } from '@components/CategoryCard';
import FilterPanel from '@components/FilterPanel';
import ProductsPanel from '@components/ProductsPanel';
import { Container } from '@components/styled';
import { ProductDataType, productsData } from '@data/productsData';
import { categories } from 'data/categories';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Category: NextPage<{
	category: CategoryProps;
	products: ProductDataType[];
}> = ({ category: { name: categoryName }, products }) => {
	const [filter, setFilter] = useState({
		category: '',
		brand: '',
	});

	const breadcrumb: BreadcrumProps[] = [
		{ name: 'Composites', link: '/composites' },
		{ name: 'All Categories', link: '/composites/categories' },
		{ name: categoryName, link: '#' },
	];

	// const filteredProducts = products.filter(product =>
	// 	filter.brand ? filter.brand === product.brand.slug : true,
	// )

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)">
			<LayoutDiv>
				<Breadcrumb breadcrumb={breadcrumb} />
				<FilterPanel {...{ filter, setFilter, noCategory: true }} />
				<ProductsPanel {...{ products, title: categoryName }} />
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
	) || { name: '', image: categoryBanner };

	const products = Array.from({ length: 9 }, () => ({
		...productsData[0],
		image: category.image,
		name: category.name,
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
