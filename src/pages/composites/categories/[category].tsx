import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import FilterPanel, { FilterType } from '@components/FilterPanel';
import ProductsPanel from '@components/ProductsPanel';
import { Container } from '@components/styled';
import FilterProductContainer from '@components/styled/FIlterProductContainer';
import { getCategories, getCategoryBySlug } from '@data/index';
import {
	ProductVariantType,
	getProductVariantsByCategory,
	singleDBProductToProductMapper,
} from '@data/products';
import { CategoryProps } from 'data/categories';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Category: NextPage<{
	category: CategoryProps;
	products: ProductVariantType[];
}> = ({ category: { name: categoryName }, products }) => {
	const transformedProducts = products.map(product =>
		singleDBProductToProductMapper(product),
	);

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
					<ProductsPanel
						{...{ products: transformedProducts, title: categoryName }}
					/>
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
	const paths = categories2?.map(category => ({
		params: { category: category.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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

	const products = await getProductVariantsByCategory(category.id);

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
