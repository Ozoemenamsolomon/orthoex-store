import { slugifyName } from '@utils/index';
import { useCart } from 'context/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CTA from './CTA';
import Price from './Price';
import ProductStars from './ProductStars';

export type ProductCardProp = {
	code: string;
	name: string;
	image: string;
	price: number;
	variantID: number;
	review: {
		average: number;
		count: number;
	};
};

export const priceFormatter = Intl.NumberFormat('en-ng', {
	currency: 'NGN',
	style: 'currency',
});

const ProductCard: React.FC<ProductCardProp> = ({
	image,
	name,
	review,
	price,
	code,
	variantID,
}) => {
	const { getQuantity: getCartQuantity, setQuantity: setCartQuantity } =
		useCart();
	const [localQuantity, setLocalQuantity] = useState(
		getCartQuantity(variantID.toString()),
	);

	useEffect(() => {
		setLocalQuantity(getCartQuantity(variantID.toString()));
	}, [getCartQuantity, variantID]);

	const addProductToCart = () => {
		setCartQuantity(variantID.toString(), 1);
		setLocalQuantity(1);
	};

	const incrementLocalQuantity = () => {
		setLocalQuantity(localQuantity + 1);
	};

	const decrementLocalQuantity = () => {
		setLocalQuantity(localQuantity - 1);
	};

	return (
		<ProductCardContainer>
			<div>
				<Link
					href={`/composites/products/${code}/${slugifyName(
						name,
					)}/${variantID}`}>
					<Image src={image} fill object-fit="contain" alt="product image" />
				</Link>
			</div>
			<ProductCardContent>
				<Link
					href={`/composites/products/${code}/${slugifyName(
						name,
					)}/${variantID}`}>
					<ProductName>{name}</ProductName>
				</Link>
				<Price price={price} />
				{review && <ProductStars {...review} />}
				{/* user && */}
				{getCartQuantity(variantID.toString()) != 0 ? (
					<QuantityAction>
						<div>
							<button
								disabled={localQuantity <= 0}
								onClick={decrementLocalQuantity}>
								<Minus />
							</button>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								{localQuantity}
							</div>
							<button onClick={incrementLocalQuantity}>
								<Plus />
							</button>
						</div>

						{localQuantity !== getCartQuantity(variantID.toString()) && (
							<StyledCTA
								style={{ gridColumn: '1 / -1' }}
								onClick={() =>
									setCartQuantity(variantID.toString(), localQuantity)
								}>
								<Cart />
								Save
							</StyledCTA>
						)}
					</QuantityAction>
				) : (
					<StyledCTA className="add-to-cart" onClick={addProductToCart}>
						ADD TO CART
					</StyledCTA>
				)}
			</ProductCardContent>
		</ProductCardContainer>
	);
};

export default ProductCard;

const ProductCardContainer = styled.div`
	border-radius: 4px;
	transition: all 0.3s ease-in-out;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	> div:first-child {
		aspect-ratio: 210/164;
		position: relative;
	}

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		button.add-to-cart {
			opacity: 0;
		}
	}

	&:hover {
		box-shadow: 5px 5px 16px rgb(0 0 0 / 20%);
		button.add-to-cart {
			opacity: 1;
		}
	}
`;

const StyledCTA = styled(CTA)`
	padding: 0.5rem;
	font-size: 0.6rem;
	display: flex;
	gap: 0.2rem;
	justify-content: center;
	align-items: center;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1rem;
	}
`;

const ProductCardContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		padding: 1rem;
	}
`;

const ProductName = styled.h3`
	font-weight: 400;
	font-size: 0.7rem;
	margin: 0;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1.2rem;
	}
`;

export const QuantityAction = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	> div {
		display: flex;
		align-items: center;
		width: 50%;
		justify-content: space-between;
		> button {
			background: none;
			border: none;
			cursor: pointer;
		}
	}
`;
function Cart() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none">
			<path
				d="M7.33342 3.99984H6.00008C5.8112 3.99984 5.65275 3.93584 5.52475 3.80784C5.39675 3.67984 5.33297 3.52162 5.33342 3.33317C5.33342 3.14428 5.39742 2.98584 5.52542 2.85784C5.65342 2.72984 5.81164 2.66606 6.00008 2.66651H7.33342V1.33317C7.33342 1.14428 7.39742 0.985839 7.52542 0.857839C7.65342 0.729839 7.81164 0.666062 8.00008 0.666506C8.18897 0.666506 8.34742 0.730506 8.47542 0.858506C8.60342 0.986506 8.6672 1.14473 8.66675 1.33317V2.66651H10.0001C10.189 2.66651 10.3474 2.73051 10.4754 2.85851C10.6034 2.98651 10.6672 3.14473 10.6668 3.33317C10.6668 3.52206 10.6028 3.68051 10.4748 3.80851C10.3468 3.93651 10.1885 4.00028 10.0001 3.99984H8.66675V5.33317C8.66675 5.52206 8.60275 5.68051 8.47475 5.80851C8.34675 5.93651 8.18853 6.00028 8.00008 5.99984C7.8112 5.99984 7.65275 5.93584 7.52475 5.80784C7.39675 5.67984 7.33297 5.52162 7.33342 5.33317V3.99984ZM4.66675 14.6665C4.30008 14.6665 3.98608 14.5358 3.72475 14.2745C3.46342 14.0132 3.33297 13.6994 3.33342 13.3332C3.33342 12.9665 3.46408 12.6525 3.72542 12.3912C3.98675 12.1298 4.30053 11.9994 4.66675 11.9998C5.03342 11.9998 5.34742 12.1305 5.60875 12.3918C5.87008 12.6532 6.00053 12.967 6.00008 13.3332C6.00008 13.6998 5.86942 14.0138 5.60808 14.2752C5.34675 14.5365 5.03297 14.667 4.66675 14.6665ZM11.3334 14.6665C10.9668 14.6665 10.6528 14.5358 10.3914 14.2745C10.1301 14.0132 9.99964 13.6994 10.0001 13.3332C10.0001 12.9665 10.1308 12.6525 10.3921 12.3912C10.6534 12.1298 10.9672 11.9994 11.3334 11.9998C11.7001 11.9998 12.0141 12.1305 12.2754 12.3918C12.5368 12.6532 12.6672 12.967 12.6668 13.3332C12.6668 13.6998 12.5361 14.0138 12.2748 14.2752C12.0134 14.5365 11.6996 14.667 11.3334 14.6665ZM2.00008 2.66651H1.33342C1.14453 2.66651 0.986084 2.60251 0.858084 2.47451C0.730084 2.34651 0.666306 2.18828 0.66675 1.99984C0.66675 1.81095 0.73075 1.65251 0.85875 1.52451C0.98675 1.39651 1.14497 1.33273 1.33342 1.33317H2.43342C2.55564 1.33317 2.67231 1.36651 2.78342 1.43317C2.89453 1.49984 2.97786 1.59428 3.03342 1.71651L5.68342 7.33317H10.3501L12.7668 2.99984C12.8223 2.88873 12.9001 2.8054 13.0001 2.74984C13.1001 2.69428 13.2112 2.66651 13.3334 2.66651C13.589 2.66651 13.7808 2.77495 13.9088 2.99184C14.0368 3.20873 14.0394 3.42806 13.9168 3.64984L11.5334 7.96651C11.4112 8.18873 11.2472 8.36095 11.0414 8.48317C10.8356 8.6054 10.6108 8.66651 10.3668 8.66651H5.40008L4.66675 9.99984H12.0001C12.189 9.99984 12.3474 10.0638 12.4754 10.1918C12.6034 10.3198 12.6672 10.4781 12.6668 10.6665C12.6668 10.8554 12.6028 11.0138 12.4748 11.1418C12.3468 11.2698 12.1885 11.3336 12.0001 11.3332H4.66675C4.16675 11.3332 3.78608 11.1165 3.52475 10.6832C3.26342 10.2498 3.25519 9.81095 3.50008 9.36651L4.40008 7.73317L2.00008 2.66651Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function Plus() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none">
			<path
				d="M16 1.48242C8.26875 1.48242 2 7.75117 2 15.4824C2 23.2137 8.26875 29.4824 16 29.4824C23.7313 29.4824 30 23.2137 30 15.4824C30 7.75117 23.7313 1.48242 16 1.48242ZM16 27.1074C9.58125 27.1074 4.375 21.9012 4.375 15.4824C4.375 9.06367 9.58125 3.85742 16 3.85742C22.4188 3.85742 27.625 9.06367 27.625 15.4824C27.625 21.9012 22.4188 27.1074 16 27.1074Z"
				fill="#F3F3F3"
			/>
			<path
				d="M15.9998 3.85742C9.58101 3.85742 4.37476 9.06367 4.37476 15.4824C4.37476 21.9012 9.58101 27.1074 15.9998 27.1074C22.4185 27.1074 27.6248 21.9012 27.6248 15.4824C27.6248 9.06367 22.4185 3.85742 15.9998 3.85742ZM21.9998 16.2324C21.9998 16.3699 21.8873 16.4824 21.7498 16.4824H16.9998V21.2324C16.9998 21.3699 16.8873 21.4824 16.7498 21.4824H15.2498C15.1123 21.4824 14.9998 21.3699 14.9998 21.2324V16.4824H10.2498C10.1123 16.4824 9.99976 16.3699 9.99976 16.2324V14.7324C9.99976 14.5949 10.1123 14.4824 10.2498 14.4824H14.9998V9.73242C14.9998 9.59492 15.1123 9.48242 15.2498 9.48242H16.7498C16.8873 9.48242 16.9998 9.59492 16.9998 9.73242V14.4824H21.7498C21.8873 14.4824 21.9998 14.5949 21.9998 14.7324V16.2324Z"
				fill="#F4F7FF"
			/>
			<path
				d="M21.7498 14.4829H16.9998V9.73291C16.9998 9.59541 16.8873 9.48291 16.7498 9.48291H15.2498C15.1123 9.48291 14.9998 9.59541 14.9998 9.73291V14.4829H10.2498C10.1123 14.4829 9.99976 14.5954 9.99976 14.7329V16.2329C9.99976 16.3704 10.1123 16.4829 10.2498 16.4829H14.9998V21.2329C14.9998 21.3704 15.1123 21.4829 15.2498 21.4829H16.7498C16.8873 21.4829 16.9998 21.3704 16.9998 21.2329V16.4829H21.7498C21.8873 16.4829 21.9998 16.3704 21.9998 16.2329V14.7329C21.9998 14.5954 21.8873 14.4829 21.7498 14.4829Z"
				fill="#A0A0A0"
			/>
		</svg>
	);
}

function Minus() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none">
			<path
				d="M16 1.48242C8.26875 1.48242 2 7.75117 2 15.4824C2 23.2137 8.26875 29.4824 16 29.4824C23.7313 29.4824 30 23.2137 30 15.4824C30 7.75117 23.7313 1.48242 16 1.48242ZM16 27.1074C9.58125 27.1074 4.375 21.9012 4.375 15.4824C4.375 9.06367 9.58125 3.85742 16 3.85742C22.4188 3.85742 27.625 9.06367 27.625 15.4824C27.625 21.9012 22.4188 27.1074 16 27.1074Z"
				fill="#F3F3F3"
			/>
			<path
				d="M16 3.85742C9.58125 3.85742 4.375 9.06367 4.375 15.4824C4.375 21.9012 9.58125 27.1074 16 27.1074C22.4188 27.1074 27.625 21.9012 27.625 15.4824C27.625 9.06367 22.4188 3.85742 16 3.85742ZM22 16.2324C22 16.3699 21.8875 16.4824 21.75 16.4824H10.25C10.1125 16.4824 10 16.3699 10 16.2324V14.7324C10 14.5949 10.1125 14.4824 10.25 14.4824H21.75C21.8875 14.4824 22 14.5949 22 14.7324V16.2324Z"
				fill="#F4F7FF"
			/>
			<path
				d="M21.7495 14.4824H10.2495C10.112 14.4824 9.99951 14.5949 9.99951 14.7324V16.2324C9.99951 16.3699 10.112 16.4824 10.2495 16.4824H21.7495C21.887 16.4824 21.9995 16.3699 21.9995 16.2324V14.7324C21.9995 14.5949 21.887 14.4824 21.7495 14.4824Z"
				fill="#A0A0A0"
			/>
		</svg>
	);
}
