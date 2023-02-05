import { featuredEvents } from '@data/eventsData';
import { useState } from 'react';
import styled from 'styled-components';
import CTA from './CTA';
import FeaturedEventCard from './FeaturedEventCard';
import { Container } from './styled';

const FeaturedEvents = () => {
	const [eventCount, setEventCount] = useState(2);

	const LoadMoreEvent = () => {
		setEventCount(prev => prev + 1);
	};

	return (
		<StyledWrapperDiv>
			<Container>
				<StyledHeading>Featured Events</StyledHeading>
				{featuredEvents.slice(0, eventCount).map(event => (
					<FeaturedEventCard key={event.id} event={event} />
				))}

				{featuredEvents.length !== eventCount && (
					<StyledLoadMore>
						<CTA className="btn-width" onClick={LoadMoreEvent} white>
							Load more events
						</CTA>
					</StyledLoadMore>
				)}
			</Container>
		</StyledWrapperDiv>
	);
};

export default FeaturedEvents;

const StyledWrapperDiv = styled.div`
	background-color: var(--oex-off-white);
	padding: 3rem 0rem;
`;

export const StyledHeading = styled.h3<{ align?: string; padding?: boolean }>`
	text-align: ${({ align }) => (align ? align : 'center')};
	padding: ${({ padding }) => (padding ? '0rem 1rem' : '0rem')};
	font-size: 2rem;
	margin-bottom: 2rem;
	font-weight: 500;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 0rem;
		text-align: center;
		font-weight: 700;
		font-size: 3rem;
		max-width: 70%;
		margin: 5rem auto;
	}
`;

const StyledLoadMore = styled.div`
	text-align: center;
	margin: 3rem 0;

	& .btn-width {
		display: block;
		margin: 3rem auto;
	}
`;
