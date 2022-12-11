import FilterPanel, { FilterType } from '@components/FilterPanel';
import ProductCard from '@components/ProductCard';
import ProductsPanel from '@components/ProductsPanel';
import SooSection from '@components/SooSection';
import { Container } from '@components/styled';
import FilterProductContainer from '@components/styled/FIlterProductContainer';
import { ProductDataType, productsData } from '@data/productsData';
import { GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react';
import Image from 'next/image';
import { ImageContainer } from '@components/ServiceCard';
import CTA from '@components/CTA';

const Cart: NextPage<{
	products: ProductDataType[];
}> = ({ products }) => {
	const [filter, setFilter] = useState<FilterType>({
		category: '',
		brand: '',
		priceRange: {
			min: 0,
		},
	});

	const removeFromCart = (id: string) => () => {
		console.log({ idToRemove: id });
	};

	return (
		<Container>
			<div>Cart</div>
			<div>
				<h2>Your cart (3 items)</h2>
				<div style={{ display: 'flex' }}>
					<div>
						{Array.from({ length: 3 }, () => productsData[3]).map(
							(product, index) => (
								<div>
									<ImageContainer>
										<Image src={product.image} alt="product image" />
									</ImageContainer>
									<p>{product.name}</p>
									<p>{product.price}</p>
									<CTA onClick={removeFromCart(product.code)}>Remove</CTA>

									{/* <p
										key={`product_${index}`}
										children={JSON.stringify(product, null, 2)}
									/> */}
								</div>
							),
						)}
					</div>
					<FilterPanel {...{ filter, setFilter, noCategory: true }} />
				</div>
			</div>
			{/* <FilterProductContainer>
				<ProductsPanel {...{ products, title: 'categoryName' }} />
			</FilterProductContainer> */}
			<SooSection
				BGColor="white"
				header={{ title: 'Popular Products', align: 'left' }}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
						gap: '2rem',
					}}>
					{Array.from({ length: 4 }, () => productsData[0]).map(
						(product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						),
					)}
				</div>
			</SooSection>
		</Container>
	);
};

export default Cart;

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
