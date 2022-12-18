import { featuredEvents } from '@data/eventsData';
import React, { useState } from 'react';
import styled from 'styled-components';
import FeaturedEventCard from './FeaturedEventCard';
import { Container, StyledCustomButton } from './styled';

const FeaturedEvents = () => {
	const [displayElements, setdisplayElements] = useState(2);
	const [increment] = useState(1);
	// increment is how many more you add to the displayed list.
	// displayElements is how many to render on mount.

	const onClickLoad = () => {
		setdisplayElements(prev => prev + increment);
	};

	return (
		<StyledWrapperDiv>
			<Container>
				<StyledHeading>Featured Events</StyledHeading>
				{featuredEvents.slice(0, displayElements).map(event => (
					<FeaturedEventCard key={event.id} event={event} />
				))}

				{featuredEvents.length !== displayElements && (
					<StyledLoadMore>
						<StyledCustomButton onClick={onClickLoad} white>
							Load more events
						</StyledCustomButton>
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

	& > button {
		display: block;
		margin: 3rem 0;
	}

	@media (min-width: 768px) {
		// padding: 4rem;
	}
`;

export const StyledHeading = styled.h3`
	text-align: center;
	font-size: 2rem;
	margin-bottom: 2rem;
	font-weight: 500;

	@media (min-width: 768px) {
		font-weight: 700;
		font-size: 3rem;
		margin-bottom: 5rem;
	}
`;

const StyledLoadMore = styled.div`
	text-align: center;
	margin: 3rem 0;

	& > button {
		width: 16rem;
	}
`;
