import { FC, ReactElement } from 'react';
import styled from 'styled-components';

const HeroContentComp: FC<{
	title: string;
	claim: string;
	cta: ReactElement;
}> = ({ title, claim, cta }) => {
	return (
		<HeroContent>
			<HeroTitle dangerouslySetInnerHTML={{ __html: title }} />
			<HeroClaim dangerouslySetInnerHTML={{ __html: claim }} />
			{cta}
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
		max-width: 55%;
	}
`;

const HeroTitle = styled.h1`
	color: var(--oex-orange);
`;

const HeroClaim = styled.p`
	/* @media (max-width: 600px) {
		text-align: justify;
	} */
`;
