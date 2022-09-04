import styled from 'styled-components';
import Image from 'next/image';
import { CTA } from './Header';
import StarRating from 'react-svg-star-rating';

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
	product: {
		image,
		price,
		name,
		rating: { count, stars },
	},
}) => {
	return (
		<ProductCardContainer>
			<div>
				<Image
					src={image}
					layout="fill"
					objectFit="contain"
					alt="product image"
				/>
			</div>
			<ProductCardContent>
				<h3>{name}</h3>
				<p>{priceFormatter.format(price)}</p>
				<div>
					<StarRating size={16} initialRating={stars} isReadOnly />
					<span>({count})</span>
				</div>
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
