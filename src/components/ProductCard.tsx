import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import CTA from './CTA';
import ProductStars from './ProductStars';

export type ProductProps = {
	name: string;
	price: number;
	image: StaticImageData;
	review: {
		average: number;
		count: number;
	};
};

type ProductCardProp = {
	product: ProductProps;
};

export const priceFormatter = Intl.NumberFormat('en-ng', {
	currency: 'NGN',
	style: 'currency',
});

const ProductCard: React.FC<ProductCardProp> = ({
	product: { image, price, name, review },
}) => {
	return (
		<ProductCardContainer>
			<div>
				<Link href={`/composites/products/polyester-resin`} legacyBehavior>
					<a>
						<Image src={image} fill object-fit="contain" alt="product image" />
					</a>
				</Link>
			</div>
			<ProductCardContent>
				<Link href={`/composites/products/polyester-resin`} legacyBehavior>
					<a>
						<ProductName>{name}</ProductName>
					</a>
				</Link>
				<Price>{priceFormatter.format(price)}</Price>
				<ProductStars {...review} />
				<StyledCTA>ADD TO CART</StyledCTA>
			</ProductCardContent>
		</ProductCardContainer>
	);
};

export default ProductCard;

const ProductCardContainer = styled.div`
	border-radius: 4px;
	transition: all 0.3s ease-in-out;

	> div:first-child {
		aspect-ratio: 210/164;
		position: relative;
	}

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		button {
			opacity: 0;
		}
	}

	&:hover {
		box-shadow: 8px 8px 13px rgb(0 0 0 / 7%);
		button {
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

const Price = styled.p`
	font-weight: 300;
	font-size: 0.9rem;
	margin-bottom: 0;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-weight: 400;
		font-size: 1.2rem;
	}
`;
