import Image, { StaticImageData } from 'next/image';
import { FC, ReactElement } from 'react';
import styled from 'styled-components';

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
	small?: boolean;
	greyFont?: boolean;
	bgColor?: string;
	/**
	 * | classes | action |
	 * |---|---|
	 * |`taller`| spans card two rows |
	 * |`rounded`| makes the card border rounded |
	 * |`shrink-start`| shrinks card  |
	 * |`no-shadow`| removes card shadow  |
	 *  */
	className?: string;
};

const ServiceCard: FC<ServiceCardProps> = ({
	service: { description, image, cta, title, HTMLDescription = false },
	className,
	imagePadding,
	small,
	greyFont,
	bgColor
}) => (
	<ServiceCardContainer bgColor={bgColor} className={`${className}`}>
		<ImageTitleContainer className={`${small ? 'small' : ''}`}>
			<ImageContainer
				small={small}
				className={`image-container ${imagePadding ? 'pad' : ''}`}>
				<Image object-fit="contain" fill src={image} alt="service card image" />
			</ImageContainer>
			<div>
				{title && (
					<Title className={small ? 'small' : undefined}>{title}</Title>
				)}
				<Description
					greyFont={greyFont}
					className={small ? 'small' : undefined}
					dangerouslySetInnerHTML={
						HTMLDescription ? { __html: description } : undefined
					}>
					{!HTMLDescription ? description : undefined}
				</Description>
			</div>
		</ImageTitleContainer>
		{cta}
	</ServiceCardContainer>
);

export default ServiceCard;

const ServiceCardContainer = styled.div<{bgColor?: string}>`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	text-align: center;
	height: 100%;
	width: 100%;
	justify-content: space-between;
	background-color: ${({ bgColor }) => (bgColor ? bgColor : '')};

	&:not(.no-padding) {
		padding: 2rem;
	}

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

	p {
		margin-bottom: 0;
	}
`;

const ImageTitleContainer = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	align-items: center;
	&.small {
		gap: 0.5rem;
	}
	> div:last-of-type {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
`;
export const ImageContainer = styled.div<{ small?: boolean }>`
	position: relative;
	aspect-ratio: 1;
	width: ${({ small }) => (small ? '2rem' : '5rem')};

	&.pad {
		width: 3rem;
	}
`;

const Title = styled.p`
	font-size: 1.5rem;
	font-weight: bold;
	&.small {
		font-size: 1rem;
	}
`;

const Description = styled.p<{ greyFont?: boolean }>`
	font-size: 1.2rem;
	color: ${({ greyFont }) => (greyFont ? 'var(--oex-dark-grey)' : 'inherit')};
	&.small {
		font-size: 0.8rem;
	}
`;
