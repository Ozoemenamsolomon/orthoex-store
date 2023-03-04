import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CartTotalPanel from '@components/CartTotalPanel';
import ProductCard, { priceFormatter } from '@components/ProductCard';
import SooSection from '@components/SooSection';
import { Container, ProductCards } from '@components/styled';
import FilterProductContainer from '@components/styled/FIlterProductContainer';
import { ProductDataType, productsData } from '@data/productsData';
import { formatGramm } from '@utils/index';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/heroicons-outline';
import {
	ProductCountControlButton,
	ProductCountInput,
} from './composites/products/polyester-resin';

const Cart: NextPage<{
	products?: ProductDataType[];
}> = ({ products }) => {
	const isInStock = false;

	const [productCount, setProductCount] = useState(0);

	const removeFromCart = (id: string) => () => {
		console.log({ idToRemove: id });
	};

	return (
		<Container>
			<div>
				<FilterProductContainer>
					<div
						style={{
							flex: 2.5,
						}}>
						<Title>Your cart (3 items)</Title>
						{products?.map((product, index) => (
							<CartItem product={product} key={`cart_item_${index}`} />
						))}
					</div>
					<CartTotalPanel />
				</FilterProductContainer>
			</div>
			<SooSection
				BGColor="white"
				header={{ title: 'Popular Products', align: 'left' }}>
				<ProductCards>
					{Array.from({ length: 4 }, () => productsData[0]).map(
						(product, index) => (
							<ProductCard key={`product_${index}`} product={product} />
						),
					)}
				</ProductCards>
			</SooSection>
		</Container>
	);
};

export default Cart;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const products = Array.from(
			{ length: 16 },
			(_, index) =>
				productsData[
					Math.abs(productsData.length - index) % productsData.length
				],
		);

		return {
			props: {
				products,
			},
		};
	},
});

const CartItem: React.FC<{ product: ProductDataType }> = ({ product }) => {
	const isInStock = false;

	const [productCount, setProductCount] = useState(0);

	const removeFromCart = (id: string) => () => {
		console.log({ idToRemove: id });
	};

	return (
		<CartItemContainer>
			<div>
				<div>
					<ImageContainer>
						<Image src={product.image} alt="product image" />
					</ImageContainer>
					<button
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.21rem',
							background: 'none',
							border: 'none',
							color: 'var(--oex-danger)',
						}}
						onClick={removeFromCart(product.code)}>
						<Trash size={18} />
						Remove
					</button>
				</div>
				<div>
					<h3 style={{}}>{product.name}</h3>
					<p style={{ fontSize: '1.2rem', color: 'var(--oex-grey)' }}>
						Size: {formatGramm.format(product.weightInGrams)}
					</p>
					{!isInStock ? (
						<p style={{ color: 'var(--oex-danger)' }}>Out of stock</p>
					) : (
						<p style={{ color: 'var(--oex-success)' }}>In stock</p>
					)}
				</div>
			</div>

			<div>
				<div
					style={{
						display: 'flex',
						gap: '.5rem',
						alignItems: 'center',
					}}>
					<ProductCountControlButton
						onClick={() => {
							console.log(productCount);
							setProductCount(prevProductCount => prevProductCount - 1);
						}}>
						-
					</ProductCountControlButton>
					<ProductCountInput
						type="number"
						name="quantity"
						id="quantity"
						value={productCount}
						onChange={e => setProductCount(Number(e.target.value))}
					/>
					<ProductCountControlButton
						onClick={() =>
							setProductCount(prevProductCount => prevProductCount + 1)
						}>
						+
					</ProductCountControlButton>
				</div>
				<Price>{priceFormatter.format(product.price)}</Price>
			</div>
		</CartItemContainer>
	);
};

const Title = styled.h2`
	margin: 0;
	font-weight: 600;
	font-size: 1.2rem;
	border-bottom: 1px solid var(--oex-light-grey);
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
	display: flex;
`;

const CartItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border-bottom: 1px solid var(--oex-light-grey);

	& > div:first-child {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
`;

const Price = styled.p`
	font-weight: 600;
	font-size: 1.5rem;
	text-align: right;
	margin-block: 1rem;
`;

const ImageContainer = styled.div`
	position: relative;
`;
