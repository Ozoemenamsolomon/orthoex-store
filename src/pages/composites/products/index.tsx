import categoryBanner from "@assets/new/images/category-banner.jpg";
import Breadcrumb, { BreadcrumProps } from "@components/Breadcrumb";
import FilterPanel, { FilterType } from "@components/FilterPanel";
import ProductsPanel from "@components/ProductsPanel";
import { Container } from "@components/styled";
import FilterProductContainer from "@components/styled/FIlterProductContainer";
import { ProductDataType, productsData } from "@data/productsData";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const Products: NextPage<{
	products: ProductDataType[];
}> = ({ products }) => {
	const [filter, setFilter] = useState<FilterType>({
		category: "",
		brand: "",
		priceRange: {
			min: 0,
		},
	});

	const title = "All Products";

	const breadcrumb: BreadcrumProps[] = [
		{ name: "Composites", link: "/composites" },
		{ name: title, link: "#" },
	];

	const filteredProducts = products
		.filter(product =>
			filter.category ? filter.category === product.category.slug : true,
		)
		.filter(product =>
			filter.brand ? filter.brand === product.brand.slug : true,
		)
		.filter(product =>
			!filter.priceRange.max
				? true
				: product.price >= filter.priceRange.min &&
				  product.price <= filter.priceRange.max,
		);

	return (
		<Container
			verticalPaddingInREM={7}
			paddingMultiplier={4}
			bg="var(--oex-off-white)"
		>
			<LayoutDiv>
				<Breadcrumb breadcrumb={breadcrumb} />
				<FilterProductContainer>
					<FilterPanel {...{ filter, setFilter }} />
					<ProductsPanel title={title} products={filteredProducts} />
				</FilterProductContainer>
				<ImageContainer>
					<Image src={categoryBanner} layout="fill" objectFit="contain" />
				</ImageContainer>
			</LayoutDiv>
		</Container>
	);
};

export default Products;

export const getStaticProps: GetStaticProps = async context => {
	const products = Array.from(
		{ length: 16 },
		(_, index) =>
			productsData[Math.abs(productsData.length - index) % productsData.length],
	);

	return {
		props: {
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
