import { FC, ReactElement } from 'react';
import styled from 'styled-components';

const HeroContentComp: FC<{
	title?: string;
	claim: string;
	cta?: ReactElement;
}> = ({ title = '&nbsp;', claim, cta }) => {
	return (
		<HeroContent>
			<HeroTitle dangerouslySetInnerHTML={{ __html: title }} />
			<HeroClaim dangerouslySetInnerHTML={{ __html: claim }} />
			{cta || null}
		</HeroContent>
	);
};

export default HeroContentComp;

const HeroContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 2rem;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		max-width: 33rem;
	}
`;

const HeroTitle = styled.h1`
	color: var(--oex-orange);
	font-size: 3rem;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		font-size: 4rem;
	}
`;

const HeroClaim = styled.p``;
