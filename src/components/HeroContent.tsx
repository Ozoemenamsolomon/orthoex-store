import { FC } from 'react';
import styled from 'styled-components';
import { CTA } from './Header';

const HeroContentComp: FC = () => {
	const findRep = () => {};
	return (
		<HeroContent>
			<HeroTitle>
				Your preferred
				<br />
				partner of choice
			</HeroTitle>
			<HeroClaim>
				We are facilitating Prosthetics, Orthopaedic devices and composite
				materials distribution in West Africa. <br />
				<br />
				Speak with an account manager in your region
			</HeroClaim>
			<CTA onClick={findRep}>Find a representative</CTA>
		</HeroContent>
	);
};

export default HeroContentComp;

const HeroContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	@media (min-width: 600px) {
		max-width: 60%;
	}
`;

const HeroTitle = styled.h1`
	color: var(--oex-orange);
`;

const HeroClaim = styled.p`
	@media (max-width: 600px) {
		text-align: justify;
	}
`;
