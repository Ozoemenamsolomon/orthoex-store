import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

export type ServiceCardType = {
	description: string;
	image: StaticImageData;
	cta?: ReactElement;
	title?: string;
};

type ServiceCardProps = {
	service: ServiceCardType;
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
	service: { description, image, cta, title },
	className,
}) => (
	<ServiceCardContainer className={`${className}`}>
		<Link href="/">
			<a>
				<ImageTitleContainer>
					<ImageContainer className="image-container">
						<Image objectFit="contain" layout="fill" src={image} />
					</ImageContainer>
					{title && <h3>{title}</h3>}
					<p>{description}</p>
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
		gap: 1rem;
		text-align: center;
		height: 100%;
		width: 100%;
		justify-content: space-between;

		button {
			align-self: center;
		}
	}
	position: relative;
	transition: all 0.2s ease-out;

	&.rounded {
		border-radius: 1rem;
		overflow: hidden;
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
	&:hover {
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
`;
const ImageContainer = styled.div`
	position: relative;
	aspect-ratio: 1.5;
`;
