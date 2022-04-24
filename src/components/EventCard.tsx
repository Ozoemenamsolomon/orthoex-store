import React, { FC } from 'react';
import styled from 'styled-components';
import { CTA } from './Header';

const formatDate: (dateTime: Date) => string = (dateTime) => {
	return dateTime.toLocaleDateString('en-GB', {
		dateStyle: 'long',
	});
};

const formatTime: (dateTime: Date) => string = (dateTime) => {
	return dateTime.toLocaleTimeString('en-GB', {
		formatMatcher: 'basic',
		hour12: true,
	});
};

const EventCard: FC<{ disabled?: true }> = ({ disabled = false }) => {
	const startDateTime = new Date('2022-03-03T13:10');
	const endDateTime = new Date('2022-03-07T13:10');
	return (
		<CardContainer className={disabled ? 'disabled' : ''}>
			<img src="" alt="" />
			<CardContent>
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
						<LocationContainer>\/ Ikeja,Lagos</LocationContainer>
						<div>
							Course title: Resin art workshop
							<br />
							Instructor: Ciroma Chukwuma
							<br />
							Refreshment: Yes
							<br />
							Starter Pack: Yes
						</div>
					</CardMetaDataLeft>
					<CardMetaDataRight>
						12 Participants
						<br />
						{!disabled && (
							<>
								3 Spots Remaining!
								<br />
							</>
						)}
						N10,000
						<br />
						<CTA disabled={disabled}>{disabled ? 'Sold Out' : 'Book Now'}</CTA>
						<br />
						Speak With The Event Team
					</CardMetaDataRight>
				</EventMetadataContainer>

				<EventDetailsAccordion tabIndex={disabled ? -1 : undefined}>
					<summary>
						Please note our COVID-19 Protocol & social distancing measures
					</summary>
					<div style={{ margin: '1rem' }}>
						<h3>About the Workshop</h3>
						<p>
							In this workshop, the anatomical basics of modeling are taught on
							the basis of the eye, nose and ear. The right choice of modelling
							clay will be another component. Important tools and corresponding
							techniques are discussed.At the end of the seminar, a certificate
							of participation will be handed over
						</p>
						<h3>About the Workshop</h3>
						<ul>
							<li>Attended the school of fine arts and design in berlin</li>
							<li>Founded his own miniature label "savage feget minis"</li>
							<li>
								In 2012 - has since worked for leading companies in the gaming
								industry
							</li>
						</ul>
					</div>
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
const TimeContainer = styled.div``;

const LocationContainer = styled.div``;

const EventDetailsAccordion = styled.details`
	> summary {
		cursor: pointer;
	}
`;

const DaysCountContainer = styled.span`
	background-color: bisque;
	padding: 0.1rem 0.3rem;
`;
