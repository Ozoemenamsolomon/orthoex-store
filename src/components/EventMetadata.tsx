import { FC } from 'react';
import styled from 'styled-components';
import { formatDate, formatPrice, formatTime } from '../utils';
import { EventType } from './EventCard';
import { CTA } from './Header';

const EventMetaData: FC<EventType & { disabled: boolean }> = ({
	startDateTimeString,
	endDateTimeString,
	location,
	courseTitle,
	instructor,
	refreshment,
	starterPack,
	registeredParticipant,
	disabled,
	spots,
	price,
}) => {
	const startDateTime = new Date(startDateTimeString);
	const endDateTime = new Date(endDateTimeString);

	return (
		<EventMetadataContainer>
			<CardMetaDataLeft>
				<div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
					<div>
						<h4 style={{ margin: 'unset' }}>OEX</h4>
						<p>composite</p>
					</div>
					<img src="" alt="" />
					<div>
						<DateContainer>
							{formatDate(startDateTime)}
							<wbr /> - <wbr />
							{formatDate(endDateTime)}
							<DaysCountContainer>
								{endDateTime.getDate() - startDateTime.getDate() + 1} Days
							</DaysCountContainer>
						</DateContainer>
						<TimeContainer>
							{formatTime(startDateTime)}
							<wbr /> - <wbr />
							{formatTime(endDateTime)}
						</TimeContainer>
					</div>
				</div>
				<LocationContainer>\/ {location}</LocationContainer>
				<div>
					Course title: {courseTitle}
					<br />
					Instructor: {instructor}
					<br />
					Refreshment: {refreshment ? 'Yes' : 'NO'}
					<br />
					Starter Pack: {starterPack ? 'Yes' : 'NO'}
				</div>
			</CardMetaDataLeft>
			<CardMetaDataRight>
				{registeredParticipant} Participants
				<br />
				{!disabled && (
					<>
						{spots} Spot{spots > 1 && 's'} Remaining!
						<br />
					</>
				)}
				{formatPrice(price)}
				<br />
				<CTA disabled={disabled}>{disabled ? 'Sold Out' : 'Book Now'}</CTA>
				<br />
				Speak With The Event Team
			</CardMetaDataRight>
		</EventMetadataContainer>
	);
};

export default EventMetaData;

const EventMetadataContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;
const CardMetaDataLeft = styled.div``;
const CardMetaDataRight = styled.div``;

const DateContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const DaysCountContainer = styled.span`
	background-color: bisque;
	padding: 0.1rem 0.3rem;
`;

const TimeContainer = styled.div``;

const LocationContainer = styled.div``;
