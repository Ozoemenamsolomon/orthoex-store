import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import DefaultBG from '@assets/images/website-backfround-image.jpg';
import React, { FC } from 'react';
import { Container } from './styled';

type HeroCompProp = {
	bg?: StaticImageData;
	col?: boolean;
	center?: boolean;
	colour?: 'white' | 'black';
	morePadding?: true;
	darkenBG?: true;
};

export const HeroComp: FC<HeroCompProp> = ({
	children,
	bg,
	col,
	center,
	colour = 'white',
	morePadding = false,
	darkenBG = false,
}) => {
	return (
		<HeroContainer>
			<Hero
				style={{
					color: colour,
					padding: morePadding ? '11em 0em' : undefined,
				}}>
				<Container
					style={{
						display: 'flex',
						flexDirection: col ? 'column' : undefined,
						alignItems: center ? 'center' : undefined,
					}}
					paddingMultiplier={4}>
					{children}
				</Container>
			</Hero>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					zIndex: -5,
				}}>
				<HeroBg alt="hero background" fill src={bg || DefaultBG}></HeroBg>
				{darkenBG && (
					<div
						style={{
							height: '100%',
							backgroundColor: '#000000a8',
						}}
					/>
				)}
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
	object-fit: cover;
`;

const Hero = styled.div`
	--hero-padding: 10em 0em;
	display: flex;
	padding: var(--hero-padding);
	justify-content: center;

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		--hero-padding: 4em 0em;
		& > div {
			flex-direction: column;
		}
	}
`;
