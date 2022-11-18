import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { StyledIcon } from '@styled-icons/styled-icon';

interface ButtonInfo {
	link: string;
	title: string;
	icon?: StyledIcon;
}

interface Props {
	image: StaticImageData;
	description: string;
	buttons: ButtonInfo[];
}

const InfoCard: React.FC<Props> = ({ image, description, buttons }) => {
	return (
		<StyledInfoCard>
			<Image
				width="100"
				height="60"
				objectFit="cover"
				layout="responsive"
				src={image}
			/>
			<p>{description}</p>
			<ButtonContainer>
				{buttons.map(({ icon, link, title }, index) => (
					<Link key={index} href={link}>
						<ButtonStyled>{title}</ButtonStyled>
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

const ButtonStyled = styled.button`
	color: var(--oex-orange);
	background-color: white;
	font: inherit;
	padding: 1rem;
	width: 100%;
	border-radius: 0.2rem;
	border: 0.09rem solid var(--oex-orange);

	&:hover {
		color: white;
		background-color: var(--oex-orange);
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	gap: 2rem;
`;
