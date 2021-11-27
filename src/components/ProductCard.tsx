import styled from 'styled-components';
import Image from 'next/image';
import { CTA } from './Header';

export type ProductCardProp = {
	title: string;
	description: string;
	price: string | number;
	imageURL: string;
};

const CTAMod = styled(CTA)`
	--border-radius: 12px;

	margin-top: 0.5rem;
	width: 100%;
	transition: all 0.5s ease-in-out;
	border: 0;
	&:hover {
		background-color: var(--oex-orange-dark);
	}
`;

const ProductCard: React.FC<ProductCardProp> = ({
	imageURL,
	description,
	price,
	title,
}) => {
	// import e from `../assets/images/composite-ad${imageURL}`
	console.log({ imageURL, description, price, title });
	return (
		<Card>
			<ImageContainer>
				<Image
					src={`/composite-ad/${imageURL}`}
					layout="fill"
					objectFit="cover"
					alt=""
				/>
			</ImageContainer>
			<Content>
				<Titel>{title}</Titel>
				<Price>
					<DoubleStrikeThrough>N</DoubleStrikeThrough>
					{Number(price)}.00
				</Price>
				<p className="description">{description}</p>
				<CTAMod>Purchase product &rarr;</CTAMod>
			</Content>
		</Card>
	);
};

export default ProductCard;

const Card = styled.div`
	transition: all 0.3s ease-in-out;
	display: flex;
	flex-direction: column;
	&:hover {
		transform: translateY(-3px);
	}
	&:hover img,
	&:hover ${CTA} {
		box-shadow: 2px 2px 4px rgb(0 0 0 / 19%);
	}
`;
const ImageContainer = styled.div`
	display: flex;
	position: relative;
	height: 200px;
	& img {
		width: 100%;
		transition: all 0.5s ease-in-out;
		border-radius: var(--border-radius) var(--border-radius) 0rem 0rem;
	}
`;
const Content = styled.div`
	border: 1px solid var(--oex-orange);
	border-radius: 0rem 0rem var(--border-radius) var(--border-radius);
	padding: 1rem 0.5rem;
	flex: 1;
`;
const Titel = styled.h3``;
const Price = styled.p`
	margin-bottom: 0.5rem;
`;
const DoubleStrikeThrough = styled.span`
	text-decoration: line-through;
	text-decoration-style: double;
`;
