import styled from 'styled-components';
import Image from 'next/image';

import BG from '../assets/images/website-backfround-image.jpg';
import React, { FC } from 'react';
import { Container } from './styled';

type HeroCompProp = {
	bg?: StaticImageData;
	col?: boolean;
	center?: boolean;
	colour?: 'white' | 'black';
	morePadding?: true;
};

export const HeroComp: FC<HeroCompProp> = ({
	children,
	bg,
	col,
	center,
	colour = 'white',
	morePadding = false,
}) => {
	return (
		<HeroContainer>
			<Hero
				style={{
					color: colour,
					padding: morePadding ? '11em 0em' : undefined,
				}}
			>
				<Container
					style={{
						display: 'flex',
						flexDirection: col ? 'column' : undefined,
						alignItems: center ? 'center' : undefined,
					}}
					paddingMultiplier={4}
				>
					{children}
				</Container>
			</Hero>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: -5,
				}}
			>
				<HeroBg layout="fill" objectFit="cover" src={bg || BG}></HeroBg>
			</div>
		</HeroContainer>
	);
};

const HeroContainer = styled.div`
	position: relative;
	max-height: 70%;
	z-index: 1;
`;
const HeroBg = styled(Image)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
`;

const Hero = styled.div`
	--hero-padding: 8em 0em 4em 0em;
	display: flex;
	padding: var(--hero-padding);
	justify-content: center;

	@media (max-width: 600px) {
		& > div {
			flex-direction: column;
		}
	}
`;
