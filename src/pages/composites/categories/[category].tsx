import categoryBanner from '@assets/new/images/category-banner.jpg';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import FilterPanel, { FilterType } from '@components/FilterPanel';
import ProductsPanel from '@components/ProductsPanel';
import { Container } from '@components/styled';
import FilterProductContainer from '@components/styled/FIlterProductContainer';
import { getBrands } from '@data/brands';
import { getCategories, getCategoryBySlug } from '@data/categories';
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
	brands: Awaited<ReturnType<typeof getBrands>>;
}> = ({ category: { name: categoryName }, products, brands }) => {
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
					<FilterPanel {...{ filter, setFilter, noCategory: true, brands }} />
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
	const categories = await getCategories();
	const paths = categories?.map(category => ({
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
	const brands = await getBrands(params.category);

	if (!category) {
		return {
			notFound: true,
		};
	}

	const products = await getProductVariantsByCategory(category.id.toString());

	return {
		props: {
			category,
			products,
			brands,
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
