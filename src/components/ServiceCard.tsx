import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export type ServiceCardType = {
	description: string;
	image: StaticImageData;
	cta?: ReactElement;
	title?: string;
	HTMLDescription?: boolean;
};

type ServiceCardProps = {
	service: ServiceCardType;
	imagePadding?: boolean;
	/**
	 * | classes | action |
	 * |---|---|
	 * |`last`| orders card to last in mobile |
	 * |`taller`| spans card two rows |
	 * |`rounded`| makes the card border rounded |
	 * |`no-animate`| no line animation |
	 * |`shrink-start`| shrinks card  |
	 *  */
	className?: string;
};

const ServiceCard: FC<ServiceCardProps> = ({
	service: { description, image, cta, title, HTMLDescription = false },
	className,
	imagePadding,
}) => (
	<ServiceCardContainer className={`${className}`}>
		<ImageTitleContainer>
			<ImageContainer
				className={`image-container ${imagePadding ? 'pad' : ''}`}
			>
				<Image objectFit="contain" layout="fill" src={image} />
			</ImageContainer>
			<div>
				{title && <p style={{ fontWeight: 'bold' }}>{title}</p>}
				<Description
					dangerouslySetInnerHTML={
						HTMLDescription ? { __html: description } : undefined
					}
				>
					{!HTMLDescription ? description : undefined}
				</Description>
			</div>
		</ImageTitleContainer>
		{cta}
	</ServiceCardContainer>
);

export default ServiceCard;

const ServiceCardContainer = styled.div`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	text-align: center;
	height: 100%;
	width: 100%;
	justify-content: space-between;
	/* background-color: green; */

	&:not(.no-shadow) {
		box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
			-2px 0px 4px rgba(207, 207, 207, 0.1),
			0px 2px 12px rgba(207, 207, 207, 0.1),
			0px -2px 16px rgba(207, 207, 207, 0.1);
	}

	position: relative;
	transition: all 0.2s ease-out;

	&.rounded {
		border-radius: 1rem;
		overflow: hidden;
	}

	&.white {
		color: white;
	}

	&.taller {
		grid-row: span 2;
	}

	&.shrink-start {
		align-self: start;
	}

	&:not(.no-animate) {
		padding-bottom: 5%;
	}

	&:not(.no-animate)::after {
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
	&:not(.no-animate):hover::after,
	&:not(.no-animate):focus-within::after {
		height: 5%;
	}
	&:not(.no-animate):hover {
		box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
	}
	p {
		margin-bottom: 0;
	}

	@media (max-width: 600px) {
		&.last {
			order: 1;
		}
	}
`;

const ImageTitleContainer = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	align-items: center;
`;
const ImageContainer = styled.div`
	position: relative;
	aspect-ratio: 1;
	width: 5rem;
	&.pad {
		width: 3rem;
	}
`;

const Description = styled.p`
	font-size: 1.2rem;
`;
