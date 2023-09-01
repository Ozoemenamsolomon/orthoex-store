import categoryBanner from '@assets/new/images/category-banner.jpg';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Breadcrumb, { BreadcrumProps } from '@components/Breadcrumb';
import FilterPanel, { FilterType } from '@components/FilterPanel';
import ProductsPanel from '@components/ProductsPanel';
import { Container } from '@components/styled';
import FilterProductContainer from '@components/styled/FIlterProductContainer';
import {
	ProductVariantType,
	getAllProductVariants,
	singleDBProductToProductMapper,
} from '@data/products';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Products: NextPage<{
	products: ProductVariantType[];
}> = ({ products }) => {
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

	const title = 'All Products';

	const breadcrumb: BreadcrumProps[] = [
		{ name: 'Composites', link: '/composites' },
		{ name: title, link: '#' },
	];

	const filteredProducts = transformedProducts
		.filter(product =>
			filter.category ? filter.category === product.category.slug : true,
		)
		.filter(product =>
			filter.brand ? filter.brand === product.brand.slug : true,
		);
	// TODO: Fix this
	// .filter(product =>
	// 	!filter.priceRange.max
	// 		? true
	// 		: product.price >= filter.priceRange.min &&
	// 		  product.price <= filter.priceRange.max,
	// );

	return (
		<Container
			verticalPaddingInREM={2}
			paddingMultiplier={4}
			bg="var(--oex-off-white)">
			<LayoutDiv>
				<Breadcrumb breadcrumb={breadcrumb} />
				<FilterProductContainer>
					<FilterPanel {...{ filter, setFilter }} />
					<ProductsPanel title={title} products={filteredProducts} />
				</FilterProductContainer>
				<ImageContainer>
					<Image alt="banner" src={categoryBanner} fill object-fit="contain" />
				</ImageContainer>
			</LayoutDiv>
		</Container>
	);
};

export default Products;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ req, res }) {
		const session = await getSession(req, res);
		const custier = session?.user.custier;
		const products = await getAllProductVariants(custier);

		return {
			props: {
				products,
			},
		};
	},
});

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
