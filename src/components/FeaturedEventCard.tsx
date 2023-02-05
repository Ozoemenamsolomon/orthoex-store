import ArrowDownUp from '@assets/new/icons/ArrowDownUp';
import Calender from '@assets/new/icons/Calender';
import Call from '@assets/new/icons/Call';
import Location from '@assets/new/icons/Location';
import People from '@assets/new/icons/People';
import Time from '@assets/new/icons/Time';
import Whatsapp from '@assets/new/icons/Whatsapp';
import { EventDataType, EventFormat } from '@data/eventsData';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CTALink } from './CTA';
import { priceFormatter } from './ProductCard';

interface FeaturedEventProp {
	event: EventDataType;
}

const FeaturedEventCard: React.FC<FeaturedEventProp> = ({ event }) => {
	const [panelOpen, setpanelOpen] = useState(false);

	return (
		<StyledWrapperDiv>
			<StyledDetailsSection>
				<StyledLeftContent>
					<StyledCourseFormat type={event.eventFormat}>
						{event.eventFormat}
					</StyledCourseFormat>
					<h4>{event.title}</h4>
					<StyledInfoDiv>
						<Calender />
						<span>2nd Aug 2022 - 7th Aug 2022</span>
						<StyledDays>10 DAYS</StyledDays>
					</StyledInfoDiv>
					<StyledInfoDiv>
						<Time />
						<span>8.00 am - 5.00pm</span>
					</StyledInfoDiv>
					<StyledInfoDiv>
						<Location />
						<span>{`${event.location.city}, ${event.location.state}`}</span>
					</StyledInfoDiv>
				</StyledLeftContent>
				<StyledRightContent>
					<StyledInfoDiv>
						<People />
						<span>12 particpants</span>
						<StyledSpot>3 Spots left</StyledSpot>
					</StyledInfoDiv>
					<StyledPrice>
						<p>{priceFormatter.format(event.price)}</p>
						<CTALink href={'/'}>Book now</CTALink>
					</StyledPrice>
					<StyledIconText>Speak with the Event Team</StyledIconText>
					<StyledButtonGroup>
						<CTALink white href={'/'}>
							<Call /> Phone call
						</CTALink>
						<CTALink white href={'/'}>
							<Whatsapp /> Whatsapp
						</CTALink>
					</StyledButtonGroup>
				</StyledRightContent>
			</StyledDetailsSection>
			<StyledInfoSection>
				<StyledIconText onClick={() => setpanelOpen(prev => !prev)}>
					<span>Read more about this course </span>
					<ArrowDownUp rotate={panelOpen} />
				</StyledIconText>
				<StyledCourseInfo open={panelOpen}>
					<h4>About the Course</h4>
					<StyledText>{event.courseInfo.course}</StyledText>
					<h4>About the Instructor(s)</h4>
					<StyledList>
						{event.courseInfo.instructor.map((info, index) => (
							<li key={index}>{info}</li>
						))}
					</StyledList>
					<p>Refreshment: {event.refreshment === true ? 'Yes' : 'No'}</p>
					<p>Starter Pack: {event.starterPack === true ? 'Yes' : 'No'}</p>
					<StyledSpanLink>
						Please note our{' '}
						<Link href="/">COVID-19 Protocol & social distancing measures</Link>
					</StyledSpanLink>
				</StyledCourseInfo>
			</StyledInfoSection>
		</StyledWrapperDiv>
	);
};

export default FeaturedEventCard;

const StyledWrapperDiv = styled.div`
	background-color: white;
	padding: 1rem;
	margin-bottom: 3rem;
	border-radius: 0.8rem;
	box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
		-2px 0px 4px rgba(207, 207, 207, 0.1), 0px 2px 12px rgba(207, 207, 207, 0.1),
		0px -2px 16px rgba(207, 207, 207, 0.1);

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem 2rem 1rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.lg} {
		padding: 4rem 3rem 1rem;
	}
`;

const StyledDetailsSection = styled.div`
	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
`;

const StyledLeftContent = styled.div`
	& > h4 {
		margin: 1rem 0;
	}
`;

const StyledRightContent = styled.div``;

const StyledCourseFormat = styled.p<{ type: string }>`
	padding: 0.6rem 0.9rem;
	color: ${({ type }) =>
		type == EventFormat.ONSITE ? 'var(--oex-orange)' : 'var(--oex-success)'};
	border: ${({ type }) =>
		type == EventFormat.ONSITE
			? '1px solid var(--oex-orange)'
			: '1px solid var(--oex-success)'};
	border-radius: 0.3rem;
	font-weight: 600;
	font-size: 1rem;
	display: inline-block;
`;

const StyledInfoDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	justify-content: flex-start;
	margin-bottom: 1rem;
	gap: 0.7rem;
`;

const StyledDays = styled.span`
	background-color: var(--oex-light-grey);
	padding: 0.4rem 0.2rem;
	font-size: 0.6rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 0.4rem 0.6rem;
		font-size: 1rem;
	}
`;

const StyledSpot = styled.span`
	color: var(--oex-danger);
	padding: 0.4rem 0.8rem;
	font-size: 0.9rem;
`;

const StyledPrice = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1rem;
	gap: 2rem;

	& > p {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
	}

	& > a > button {
		padding: 0.7rem 1.2rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		gap: 2rem;
		flex-direction: column;
		align-items: flex-start;

		& > a > button {
			flex: 0.5 0;
			min-width: 60%;
		}
	}
`;

const StyledIconText = styled.p`
	font-size: 1.1rem;
	margin: 0;
	font-weight: 400;
	display: inline-block;
	margin-bottom: 2rem;

	& > span {
		padding-right: 1rem;
		cursor: pointer;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1.2rem;
	}
`;

const StyledButtonGroup = styled.div`
	display: flex;
	gap: 2rem;
	margin: 1rem 0;

	& > a > button {
		padding: 0.5rem 0.5rem;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		margin: 0;
		justify-content: space-between;
		gap: 1rem;

		& > a > button {
			font-size: 0.7rem;
		}
	}

	@media (min-width: 920px) {
		gap: 2rem;
		& > a > button {
			font-size: 1rem;
		}
	}
`;

const StyledInfoSection = styled.div``;

const StyledCourseInfo = styled.div<{ open: boolean }>`
	display: ${({ open }) => (open === true ? 'block' : 'none')};
	padding: 0.7rem;
	background-color: var(--oex-off-white);

	& > h4 {
		margin: 0;
		font-weight: 500;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		color: black;
		padding: 1rem;

		& > p {
			font-size: 1.2rem;
		}
	}
`;

const StyledText = styled.p`
	color: var(--text-colour-grey);
	line-height: 1.5;
	margin: 1rem 0;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1.2rem;
		color: black;
	}
`;

const StyledList = styled.ul`
	color: var(--text-colour-grey);
	line-height: 1.8;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1.2rem;
		color: black;
	}
`;

const StyledSpanLink = styled.span`
	font-size: 0.8rem;
	& > a {
		color: var(--oex-orange);
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		color: black;
	}
`;
