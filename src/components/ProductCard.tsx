import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import CTA from './CTA';
import ProductStars from './ProductStars';

export type ProductProps = {
	name: string;
	price: number;
	image: StaticImageData;
	rating: {
		stars: number;
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
	product: { image, price, name, rating },
}) => {
	return (
		<ProductCardContainer>
			<div>
				<Link href={`/composites/products/polyester-resin`}>
					<a>
						<Image
							src={image}
							layout="fill"
							objectFit="contain"
							alt="product image"
						/>
					</a>
				</Link>
			</div>
			<ProductCardContent>
				<Link href={`/composites/products/polyester-resin`}>
					<a>
						<h3>{name}</h3>
					</a>
				</Link>
				<p>{priceFormatter.format(price)}</p>
				<ProductStars {...rating} />
				<CTA>ADD TO CART</CTA>
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

	button {
		opacity: 0;
	}

	&:hover {
		box-shadow: 8px 8px 13px rgb(0 0 0 / 7%);
		button {
			opacity: 1;
		}
	}
`;

const ProductCardContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	gap: 0.51rem;

	h3 {
		font-weight: normal;
		font-size: 1.5rem;
		margin: 0;

		+ p {
			margin: 0;
			font-size: 1.2rem;
			font-weight: 600;
		}
	}
`;
