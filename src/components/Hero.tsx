import styled from 'styled-components';
import { Container } from '../pages';
import Image from 'next/image';

import BG from '../assets/images/website-backfround-image.jpg';
import React, { FC, ReactElement } from 'react';

type HeroCompProp = {
	content: FC | ReactElement<any, any> | null;
};

export const HeroComp: React.FC<HeroCompProp> = ({ content, children }) => {
	return (
		<HeroContainer>
			<Hero>
				<Container style={{ display: 'flex' }}>
					{content} <span>{children}</span>
				</Container>
			</Hero>
			<div
				style={{
					position: 'absolute',
					top: 0,
					height: '100%',
					width: '100%',
					zIndex: -5,
				}}
			>
				<HeroBg layout="fill" objectFit="cover" src={BG}></HeroBg>
			</div>
		</HeroContainer>
	);
};

const HeroContainer = styled.div`
	position: relative;
	max-height: 70%;
`;
const HeroBg = styled(Image)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
`;

const Hero = styled.div`
	background-color: #000000c6;
	color: white;
	display: flex;
	padding: 4.5em 0em 2em 0em;
	justify-content: center;

	@media (max-width: 600px) {
		& > div {
			flex-direction: column;
		}
	}
`;
const HeroImg = styled.div`
	margin-left: 3em;
	align-self: center;
	@media (max-width: 600px) {
		display: none;
	}
`;
