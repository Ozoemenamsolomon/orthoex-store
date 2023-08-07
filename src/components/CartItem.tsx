import { ProductCountInput } from '@components/styled/Temp';
import { formatGramm } from '@utils/index';
import { useCart } from 'context/cartContext';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trash } from 'styled-icons/heroicons-outline';
import { ProductCardProp, priceFormatter } from './ProductCard';

const CartItem: FC<
	ProductCardProp & {
		quantity: number;
	}
> = ({ code, name, image, price, variantID, quantity }) => {
	const isInStock = false;

	const { getQuantity: getCartQuantity, setQuantity: setCartQuantity } =
		useCart();

	const [localQuantity, setLocalQuantity] = useState(
		getCartQuantity(variantID.toString()),
	);

	useEffect(() => {
		setLocalQuantity(getCartQuantity(variantID.toString()));
	}, [getCartQuantity, variantID]);

	const removeFromCart = (id: string) => () => {
		setCartQuantity(id, 0);
	};

	return (
		<CartItemWrapper>
			<div>
				<div>
					<ImageContainer>
						<Image src={image} fill alt="product image" />
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
						onClick={removeFromCart(variantID.toString())}>
						<Trash size={18} />
						Remove
					</button>
				</div>
				<div>
					<h3 style={{}}>{name}</h3>
					<p style={{ fontSize: '1rem', color: 'var(--oex-grey)' }}>
						Size: {formatGramm.format(1234)}
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
					<ProductCountInput
						type="number"
						name="quantity"
						id="quantity"
						value={localQuantity}
						onChange={e =>
							setCartQuantity(variantID.toString(), Number(e.target.value))
						}
					/>
				</div>
				<Price>{priceFormatter.format(price)}</Price>
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
	width: 6rem;
	aspect-ratio: 1;
`;
