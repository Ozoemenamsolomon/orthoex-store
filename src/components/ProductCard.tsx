import { useUser } from '@auth0/nextjs-auth0/client';
import { slugifyName } from '@utils/index';
import { useCart } from 'context/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CTA from './CTA';
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
	const { user } = useUser();
	const router = useRouter();

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
				<div style={{ position: 'relative' }}>
					{user ? (
						<Price blur={false}>{priceFormatter.format(price)}</Price>
					) : (
						<>
							<Price blur={true}>{priceFormatter.format(111111.111)}</Price>
							<Link
								href={`/api/auth/login?returnTo=${encodeURIComponent(
									router.asPath,
								)}`}>
								Login to view price
							</Link>
						</>
					)}
				</div>
				{review && <ProductStars {...review} />}
				{/* user && */}
				{getCartQuantity(variantID.toString()) != 0 ? (
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
						}}>
						<StyledCTA
							disabled={localQuantity <= 0}
							onClick={decrementLocalQuantity}>
							-
						</StyledCTA>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							{localQuantity}
						</div>
						<StyledCTA onClick={incrementLocalQuantity}>+</StyledCTA>

						{localQuantity !== getCartQuantity(variantID.toString()) && (
							<StyledCTA
								style={{ gridColumn: '1 / -1' }}
								onClick={() =>
									setCartQuantity(variantID.toString(), localQuantity)
								}>
								Save to Cart
							</StyledCTA>
						)}
					</div>
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

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 1rem;
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

const Price = styled.p<{ blur: boolean }>`
	font-weight: 300;
	font-size: 0.9rem;
	margin-bottom: 0;
	${({ blur }) =>
		blur &&
		`
		+ a {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 4px;
			backdrop-filter: blur(2px);
			background: #ffffff75;
			}`}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-weight: 400;
		font-size: 1.2rem;
	}
`;
