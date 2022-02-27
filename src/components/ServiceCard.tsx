import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const ServiceCard: FC<{
	service: { name: string; image: StaticImageData; cta?: ReactElement };
	/** class of "taller" makes the card span two rows */
	className?: string;
}> = ({ service: { name, image, cta }, className }) => (
	<ServiceCardContainer className={`${!cta ? 'animate' : ''} ${className}`}>
		<Link href="/">
			<a>
				<ImageTitleContainer>
					<ImageContainer>
						<Image objectFit="contain" layout="fill" src={image} />
					</ImageContainer>
					<p>{name}</p>
				</ImageTitleContainer>
				{cta}
			</a>
		</Link>
	</ServiceCardContainer>
);

export default ServiceCard;

const ServiceCardContainer = styled.div`
	> a {
		padding: 0.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: center;
		height: 100%;
		width: 100%;
		justify-content: space-between;
	}
	position: relative;
	transition: all 0.2s ease-out;

	&::after {
		height: 0%;
		transition: all 0.2s ease-out;
		content: '';
		position: absolute;
		width: 100%;
		background-color: var(--oex-orange);
		z-index: 1;
		bottom: 0;
		left: 0;
	}
	&.animate:hover::after,
	&.animate:focus-within::after {
		height: 5%;
	}
	&:hover {
		box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
	}
	&.taller {
		grid-row: span 2;
	}
	p {
		margin-bottom: 0;
	}
`;

const ImageTitleContainer = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
`;
const ImageContainer = styled.div`
	position: relative;
	aspect-ratio: 1.5;
`;
