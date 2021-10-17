import { FC } from 'react';
import styled from 'styled-components';
import { CTA } from './Header';

const HeroContentComp: FC = () => {
	const callUs = () => {
		window.open('tel://+2347030324696', '_self');
	};
	return (
		<HeroContent>
			<HeroTitle>
				We are your preferred <br /> partner of choice for quality!
			</HeroTitle>
			<HeroClaim>
				OEX Composite is Nigeria’s leading brand of epoxy and polyester resins,
				fibreglass, carbon reinforcements, RTV silicone, polyurethane foams, and
				other composite materials. Our products are tailored to the requirements
				of our customers in the healthcare and manufacturing industries,
				enabling us to satisfy their needs and helping them reach their business
				goals. Contact us to know how to fit our solutions to your needs.{' '}
			</HeroClaim>
			<CTA onClick={callUs}>Contact Us</CTA>
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
		max-width: 70%;
	}
`;

const HeroTitle = styled.h1``;

const HeroClaim = styled.p``;
