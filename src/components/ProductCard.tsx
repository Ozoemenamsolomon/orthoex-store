import { useUser } from '@auth0/nextjs-auth0/client';
import { ProductDataType } from '@data/productsData';
import { getPrice } from '@utils/index';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import CTA from './CTA';
import ProductStars from './ProductStars';

// type ProductProps = {
// 	name: string;
// 	price: number;
// 	image: StaticImageData;
// 	review: {
// 		average: number;
// 		count: number;
// 	};
// };

type ProductCardProp = {
	product: ProductDataType;
};

export const priceFormatter = Intl.NumberFormat('en-ng', {
	currency: 'NGN',
	style: 'currency',
});

const ProductCard: React.FC<ProductCardProp> = ({
	product: { image, name, review, variants },
}) => {
	const { user } = useUser();

	const price = getPrice(variants, (user?.custier || 'visitor') as string);

	return (
		<ProductCardContainer>
			<div>
				<Link href={`/composites/products/polyester-resin`}>
					<Image src={image} fill object-fit="contain" alt="product image" />
				</Link>
			</div>
			<ProductCardContent>
				<Link href={`/composites/products/polyester-resin`}>
					<ProductName>{name}</ProductName>
				</Link>
				<div style={{ position: 'relative' }}>
					{user ? (
						<Price blur={false}>{priceFormatter.format(price)}</Price>
					) : (
						<>
							<Price blur={true}>{priceFormatter.format(111111.111)}</Price>
							<Link href={'/api/auth/login'}>Login to view price</Link>
						</>
					)}
				</div>

				{review && <ProductStars {...review} />}
				{user && <StyledCTA>ADD TO CART</StyledCTA>}
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
		box-shadow: 5px 5px 16px rgb(0 0 0 / 20%);
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
