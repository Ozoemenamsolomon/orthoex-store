import React, { useState } from 'react';
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

interface FormDataType {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
}
const FeaturedEventDialog = ({ isOpen, onClose, onOpen, training }: Props) => {
	const [numPeople, setNumPeople] = useState(1);
	const [formData, setFormData] = useState<FormDataType[]>([]);

	const handleIncrease = () => {
		setNumPeople(prevNum => prevNum + 1);
		setFormData(prevFormData => [
			...prevFormData,
			{ firstname: '', lastname: '', email: '', phone: '' },
		]);
	};

	const handleDecrease = () => {
		if (numPeople > 0) {
			setNumPeople(prevNum => prevNum - 1);
			setFormData(prevFormData => prevFormData.slice(0, -1));
		}
	};

	const handleChange = (index: number, event: any) => {
		const { name, value } = event.target;
		setFormData(prevFormData => {
			const updatedFormData = [...prevFormData];
			updatedFormData[index] = { ...updatedFormData[index], [name]: value };
			return updatedFormData;
		});
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		// You can send the formData to the API here
		console.log(formData);
	};

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
									<PeopleNumber>
										<button onClick={handleDecrease}>-</button>
										{numPeople}
										<button onClick={handleIncrease}>+</button>
									</PeopleNumber>
								</PeopleAttendance>
								<PeopleFee>
									<FeeText>Fee:</FeeText>
									<FeePrice>N0.00</FeePrice>
								</PeopleFee>

								<RegisterFormSection>
									<form onSubmit={handleSubmit}>
										{formData.map((participant, index) => (
											<div key={index}>
												<h2>Participant {index + 1}:</h2>
												<div>
													<label>First Name:</label>
													<input
														type="text"
														name="firstname"
														value={participant.firstname}
														onChange={e => handleChange(index, e)}
													/>
												</div>
												<div>
													<label>Last Name:</label>
													<input
														type="text"
														name="lastname"
														value={participant.lastname}
														onChange={e => handleChange(index, e)}
													/>
												</div>
												<div>
													<label>Email:</label>
													<input
														type="email"
														name="email"
														value={participant.email}
														onChange={e => handleChange(index, e)}
													/>
												</div>
												<div>
													<label>Phone:</label>
													<input
														type="tel"
														name="phone"
														value={participant.phone}
														onChange={e => handleChange(index, e)}
													/>
												</div>
											</div>
										))}
										{numPeople > 0 && (
											<button type="submit">Register Event</button>
										)}
									</form>
								</RegisterFormSection>

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
const PeopleNumber = styled.div`
	button {
		border-radius: 50%;
		background-color: var(--oex-grey);
		border: none;
		color: white;
		margin: 0 1rem;
		padding: 0.1rem 0.34rem;
		cursor: pointer;

		:active {
			background-color: var(--oex-orange);
		}
	}
`;

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

const RegisterFormSection = styled.div``;

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
