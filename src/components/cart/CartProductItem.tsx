import { FC } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import product1 from '@assets/new/images/product1.jpg';
import AddIcon from '@assets/new/icons/button-plus-icon';
import SubsractIcon from '@assets/new/icons/button-minus-icon';
import DeleteIcon from '@assets/new/icons/cart-delete-icon';

export type CartProducts = {
	name: string;
	slug: string;
	image: StaticImageData | string;
};

type CartProductProps = {
	product: CartProducts;
};

// FC<CartProductProps>

const CartProductItem = () => {
	return (
		<Wrapper>
			<ProductData>
				<ProductImage>
					<Image src={product1} alt="cart product image" />
					<RemoveProduct>
						<span>
							<DeleteIcon />
						</span>
						<span>Delete</span>
					</RemoveProduct>
				</ProductImage>

				<ProductDetails>
					<p>Polyester Resin</p>
					<p>Size: 1kg</p>
					<p>In Stock</p>
				</ProductDetails>
			</ProductData>

			<ProductUpdate>
				<ButtonControl>
					<SubstractProduct>
						<SubsractIcon />
					</SubstractProduct>
					<span>Delete</span>
					<AddProduct>
						<AddIcon />
					</AddProduct>
				</ButtonControl>

				<ProductPrice>N450,000,00</ProductPrice>
			</ProductUpdate>
		</Wrapper>
	);
};

export default CartProductItem;

const Wrapper = styled.div`
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	background-color: white;
	border-radius: 0.4rem;
`;

const ProductData = styled.div``;

const ProductUpdate = styled.div``;

const ProductImage = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
`;

const ProductDetails = styled.div``;

const RemoveProduct = styled.button``;
const SubstractProduct = styled.button``;
const AddProduct = styled.button``;

const ButtonControl = styled.div``;

const ProductPrice = styled.span``;
