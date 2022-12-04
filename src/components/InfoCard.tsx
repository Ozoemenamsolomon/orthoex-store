import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { CTAFlex } from './CTA';

interface ButtonInfo {
	link: string;
	title: string;
	Icon?: ({ color }: { color?: string | undefined }) => JSX.Element;
}

interface Props {
	image: StaticImageData;
	description: string;
	buttons: ButtonInfo[];
}

// TODO layout is deprecated

const InfoCard: React.FC<Props> = ({ image, description, buttons }) => {
	return (
		<StyledInfoCard>
			<div style={{ position: 'relative', aspectRatio: 16 / 9 }}>
				<Image
					style={{ objectFit: 'cover', maxWidth: '100%' }}
					fill
					src={image}
					alt="info card image"
				/>
			</div>
			<p>{description}</p>
			<ButtonContainer>
				{buttons.map(({ Icon, link, title }, index) => (
					<Link style={{ flex: 1 }} key={index} href={link}>
						<CTAFlex white>
							{Icon && <Icon />}
							{title}
						</CTAFlex>
					</Link>
				))}
			</ButtonContainer>
		</StyledInfoCard>
	);
};

export default InfoCard;

const StyledInfoCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	flex: 1 0 0;
	margin-bottom: 5rem;

	& > p {
		font-size: 0.9rem;
		line-height: 1rem;
		color: var(--text-colour-p);
	}

	& > div > img {
		border-radius: 0.5rem;
	}

	&:hover {
		padding: 0rem;
	}

	@media (min-width: 768px) {
		& > div > img {
			border-radius: 0rem;
		}
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
	justify-content: center;
	width: 100%;
	font: inherit;
	padding: 0rem;
	width: 100%;

	@media (min-width: 768px) {
		padding: 0rem;
	}
`;
