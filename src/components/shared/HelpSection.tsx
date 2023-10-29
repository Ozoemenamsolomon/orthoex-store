import { StyledHeading } from '@components/FeaturedEvents';
import { helps } from '@data/helps';
import ServiceCard from '@components/ServiceCard';
import styled from 'styled-components';

const HelpSection = () => {
	return (
		<Wrapper>
			<StyledHeading>Do you need help?</StyledHeading>
			<CardsContainer>
				{helps.map((help, index) => (
					<ServiceCard key={'helps_' + index} service={help} />
				))}
			</CardsContainer>
		</Wrapper>
	);
};

export default HelpSection;

const Wrapper = styled.div`
	padding: 0rem 1rem;
	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const CardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	> div {
		height: auto;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
	}
`;
