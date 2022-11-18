import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import { CategoryProps } from '@components/CategoryCard';
import FilterPanel, { FilterType } from '@components/FilterPanel';
import ProductsPanel from '@components/ProductsPanel';
import { Container } from '@components/styled';
import FilterProductContainer from '@components/styled/FIlterProductContainer';
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
	const [filter, setFilter] = useState<FilterType>({
		category: '',
		brand: '',
		priceRange: {
			min: 0,
		},
	});

	const breadcrumb: BreadcrumProps[] = [
		{ name: 'Composites', link: '/composites' },
		{ name: 'All Categories', link: '/composites/categories' },
		{ name: categoryName, link: '#' },
	];

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)"
		>
			<LayoutDiv>
				<Breadcrumb breadcrumb={breadcrumb} />
				<FilterProductContainer>
					<FilterPanel {...{ filter, setFilter, noCategory: true }} />
					<ProductsPanel {...{ products, title: categoryName }} />
				</FilterProductContainer>
				<ImageContainer>
					<Image
						alt="category banner"
						src={categoryBanner}
						layout="fill"
						object-fit="contain"
					/>
				</ImageContainer>
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
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const ImageContainer = styled.div`
	position: relative;
	aspect-ratio: 4.1;
	grid-column: span 2;
`;
