import {
	ProductCountControlButton,
	ProductCountInput,
} from '@components/styled/Temp';
import { ProductDataType } from '@data/productsData';
import Image from 'next/image';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/heroicons-outline';
import { priceFormatter } from './ProductCard';

const CartItem: FC<{
	product: ProductDataType;
}> = ({ product }) => {
	const removeFromCart = (id: string) => () => {
		console.log({ idToRemove: id });
	};

	const isInStock = false;

	const [productCount, setProductCount] = useState(1);

	return (
		<CartItemWrapper>
			<div>
				<div>
					<ImageContainer>
						<Image src={product.image} fill alt="product image" />
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
						{/* Size: {formatGramm.format(product.weightInGrams)} */}
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
				<Price>{priceFormatter.format(24523524)}</Price>
			</div>
		</CartItemWrapper>
	);
};

export default CartItem;

const CartItemWrapper = styled.div`
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
