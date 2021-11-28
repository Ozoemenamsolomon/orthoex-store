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

	margin-top: auto;
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
	const handleProductPurchase = () => {
		window.open(
			`https://wa.me/2347030324696?text=Hello%2C%0D%0A%0D%0AI%27d+love+to+purchase+${title}%2C+I+got+linked+from+the+products+page+of+your+composite+website.`,
			'_blank',
			'noopener noreferrer'
		);
	};

	return (
		<Card>
			<ImageContainer onClick={handleProductPurchase}>
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
				<CTAMod onClick={handleProductPurchase}>Purchase product &rarr;</CTAMod>
			</Content>
		</Card>
	);
};

export default ProductCard;

const Card = styled.div`
	transition: all 0.3s ease-in-out;
	display: flex;
	border-radius: var(--border-radius);
	flex-direction: column;
	&:hover {
		transform: translateY(-3px);
		box-shadow: 2px 2px 4px rgb(0 0 0 / 19%);
	}
	&:hover img {
		transform: scale(1.051);
	}
	&:hover ${CTA} {
		box-shadow: 2px 2px 4px rgb(0 0 0 / 19%);
	}
`;
const ImageContainer = styled.div`
	display: flex;
	position: relative;
	height: 200px;
	cursor: pointer;
	border-radius: var(--border-radius) var(--border-radius) 0rem 0rem;
	overflow: hidden;
	& img {
		width: 100%;
		transition: all 0.8s ease-in-out;
	}
`;
const Content = styled.div`
	border: 1px solid var(--oex-orange);
	border-radius: 0rem 0rem var(--border-radius) var(--border-radius);
	padding: 1rem 0.5rem;
	display: flex;
	flex-direction: column;
	flex: 1;
`;
const Titel = styled.h3`
	margin: 0;
`;
const Price = styled.p`
	margin: 0;
`;
const DoubleStrikeThrough = styled.span`
	text-decoration: line-through;
	text-decoration-style: double;
`;
