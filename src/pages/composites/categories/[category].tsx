import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import FilterPanel, { FilterType } from '@components/FilterPanel';
import ProductsPanel from '@components/ProductsPanel';
import { Container } from '@components/styled';
import FilterProductContainer from '@components/styled/FIlterProductContainer';
import {
	ProductVariantType,
	getCategories,
	getCategoryBySlug,
	getProductsByCategory,
} from '@data/index';
import { ProductDataType, productsData } from '@data/productsData';
import { CategoryProps } from 'data/categories';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Category: NextPage<{
	category: CategoryProps;
	products: ProductDataType[];
	products2: ProductVariantType[];
}> = ({ category: { name: categoryName }, products, products2 }) => {
	console.log({ products2 });
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
			verticalPaddingInREM={2}
			paddingMultiplier={4}
			bg="var(--oex-off-white)">
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
						fill
						object-fit="contain"
					/>
				</ImageContainer>
			</LayoutDiv>
		</Container>
	);
};

export default Category;

export async function getStaticPaths() {
	const categories2 = await getCategories();
	const paths = categories2.map(category => ({
		params: { category: category.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const custier = 'regular';

	if (typeof params?.category !== 'string') {
		return {
			notFound: true,
		};
	}
	const category = await getCategoryBySlug(params.category);

	if (!category) {
		return {
			notFound: true,
		};
	}

	const products2 = await getProductsByCategory(category.id, custier);

	const products = Array.from({ length: 9 }, () => ({
		...productsData[0],
		image: category.image,
		name: category.name,
	}));

	return {
		props: {
			products2,
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
