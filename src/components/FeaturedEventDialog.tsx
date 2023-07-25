import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './FeaturedEventCard.module.css';
import styled from 'styled-components';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes';
import { formatDate } from '@utils/index';
import Image from 'next/image';
import CTA from './CTA';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	// children: ReactNode;
	training: TrainingSupbaseDataType;
};
const FeaturedEventDialog = ({ isOpen, onClose, onOpen, training }: Props) => {
	return (
		<Dialog.Root>
			<Dialog.Trigger className={styles.DialogButton}>
				<CTAButton>Book Now</CTAButton>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.DialogOverlay} />
				<Dialog.Content
					onInteractOutside={e => e.preventDefault()}
					className={styles.DialogContent}>
					<ContentWrapper>
						<EditSection>
							<EditHeading>Checkout</EditHeading>
							<EditInfo>
								<PeopleAttendance>
									<PeopleText>People attending</PeopleText>
									<PeoplePrice>- 1 +</PeoplePrice>
								</PeopleAttendance>
								<PeopleFee>
									<FeeText>Fee:</FeeText>
									<FeePrice>N0.00</FeePrice>
								</PeopleFee>

								<CTA className="no-animate register-btn">Register Event</CTA>
							</EditInfo>
						</EditSection>
						<ViewSection>
							<Heading>{training.title}</Heading>
							<DateInfo>{`${formatDate(
								new Date(training.startDateTime),
							)} - ${formatDate(new Date(training.endDateTime))}`}</DateInfo>
							<CourseImageDiv>
								<Image
									className="image"
									// src={`http:${training.eventPosterImage}`}
									src={`https://res.cloudinary.com/dcfntkzap/image/upload/v1690004091/Training-data-images/Event_Flier_Template_Single_Person_yaj9is.png`}
									fill
									style={{ objectFit: 'cover' }}
									sizes="100"
									alt="image"
								/>
							</CourseImageDiv>
							<Summary>Order Summary</Summary>
							<Attendance>
								<People>1X People Attending</People>
								<Price>N10.000,00</Price>
							</Attendance>
							<TotalSection>
								<Info>Total</Info>
								<Amount>N10.000,00</Amount>
							</TotalSection>
						</ViewSection>
					</ContentWrapper>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default FeaturedEventDialog;

const CTAButton = styled.span`
	background-color: var(--oex-orange);
	color: white;
	padding: 0.6rem;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.5s ease;
	font-size: 1rem;
	border: 1px solid var(--oex-orange);
	cursor: pointer;
	width: 100%;

	&:hover {
		background-color: white;
		color: var(--oex-orange);
	}
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;

	// padding: 1rem;
	@media ${({ theme }) => theme.breakpoints.above.md} {
		height: 32rem;
		flex-direction: row;
		padding: 0rem;
	}
`;

const EditSection = styled.div`
	overflow-y: scroll;
	// padding: 15px;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		flex: 60%;
		overflow-y: scroll;
		// padding: 15px;
	}
`;

const EditHeading = styled.p`
	padding: 1rem 0;
	font-size: 1rem;
	text-align: center;
	border-bottom: 1px solid var(--oex-light-grey);
`;

const EditInfo = styled.div`
	padding: 1rem;

	.register-btn {
		margin-top: 2rem;
		border: 1px solid var(--oex-orange);
		font-size: 0.8rem;
		padding: 1rem 3rem;

		&:hover {
			background-color: white;
			color: var(--oex-orange);
		}
	}
`;

const PeopleAttendance = styled.div`
	display: flex;
	align-items: center;
	gap: 4rem;
`;
const PeopleText = styled.span`
	font-size: 0.9rem;
	font-weight: 500;
`;
const PeoplePrice = styled.span``;

const PeopleFee = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
`;

const FeeText = styled.div`
	font-size: 0.8rem;
`;
const FeePrice = styled.div`
	font-weight: 600;
`;

const ViewSection = styled.div`
	display: hidden;
	// height: 500px;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: block;
		flex: 40%;
		padding: 35px 18px;
		background-color: var(--oex-light-grey);
	}
`;

const Heading = styled.h2`
	font-size: 1.3rem;
	font-weight: bold;
	margin: 0;
`;

const DateInfo = styled.p`
	color: var(--oex-dark-grey);
	margin: 1rem 0;
	font-size: 0.9rem;
`;
const CourseImageDiv = styled.div`
	position: relative;
	// aspect-ratio: 1;
	height: 15rem;

	.image {
		border-radius: 0.5rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		// uncomment this if the image becomes
		// height: 55%;
	}
`;

const Summary = styled.p`
	margin: 1rem 0;
	font-size: 1rem;
`;
const Attendance = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 1rem;
	font-size: 0.8rem;
	border-bottom: 1.5px solid var(--oex-lighter-grey);
`;

const People = styled.span``;
const Price = styled.span``;

const TotalSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 1rem;
	font-weight: bold;
`;

const Info = styled.span``;
const Amount = styled.span``;
