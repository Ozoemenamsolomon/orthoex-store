import React, { FC } from 'react';
import styled from 'styled-components';
import EventMetaData from './EventMetadata';

export type EventType = {
	startDateTimeString: string;
	endDateTimeString: string;
	location: string;
	courseTitle: string;
	instructor: string;
	refreshment: boolean;
	starterPack: boolean;
	spots: number;
	registeredParticipant: number;
	price: string;
	eventDetails: string;
};

const EventCard: FC<{
	disabled?: true;
	event: EventType;
}> = ({ disabled = false, event }) => {
	return (
		<CardContainer className={disabled ? 'disabled' : ''}>
			<img src="" alt="" />
			<CardContent>
				<EventMetaData {...event} disabled={disabled} />

				<EventDetailsAccordion tabIndex={disabled ? -1 : undefined}>
					<summary>
						Please note our COVID-19 Protocol &amp; social distancing measures
					</summary>
					<div
						style={{ margin: '1rem' }}
						dangerouslySetInnerHTML={{ __html: event.eventDetails }}
					></div>
				</EventDetailsAccordion>
			</CardContent>
		</CardContainer>
	);
};

export default EventCard;

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-block: 2rem;

	&.disabled,
	&.disabled * {
		pointer-events: none;
		user-select: none;
		opacity: 0.8;
	}
`;
const CardContent = styled.div`
	/* display: flex; */
`;

const EventDetailsAccordion = styled.details`
	& > summary::marker {
		margin-right: 4rem;
	}
	&[open] > summary::marker {
		content: 'minimise';
	}
	&:not([open]) > summary::marker {
		content: 'maximise';
	}
	> summary {
		cursor: pointer;
	}
`;
