import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './FeaturedEventCard.module.css';
import styled from 'styled-components';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { formatDate } from '@utils/index';
import Image from 'next/image';
import CTA from './CTA';
import { priceFormatter } from './ProductCard';
import { FormRadioLabel } from './styled/Forms';
import CancelIcon from '@assets/new/icons/CancelIcon';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	training: TrainingSupbaseDataType;
};

interface FormDataType {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
}
const FeaturedEventDialog: React.FC<Props> = ({
	training,
}) => {
	const [numPeople, setNumPeople] = useState(1);
	const [aboutUsChannel, setAboutUsChannel] = useState('');
	const [formData, setFormData] = useState<FormDataType[]>([
		{ firstname: '', lastname: '', email: '', phone: '' },
	]);

	const onAboutUsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAboutUsChannel(e.target.id);
	};

	const handleIncrease = () => {
		setNumPeople(prevNum => prevNum + 1);
		setFormData(prevFormData => [
			...prevFormData,
			{ firstname: '', lastname: '', email: '', phone: '' },
		]);
	};

	const handleDecrease = () => {
		if (numPeople === 1) return;
		if (numPeople > 1) {
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
		console.log(aboutUsChannel);
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
									<FeePrice>
										{priceFormatter.format(training.price * numPeople)}
									</FeePrice>
								</PeopleFee>

								<RegisterFormSection>
									<form>
										{formData.map((participant, index) => (
											<AtendeeForm key={index}>
												<AtendeeText>Attendee {index + 1}:</AtendeeText>
												<FormFlex>
													<AtendeeFormControl>
														<label>First Name:</label>
														<input
															required
															type="text"
															name="firstname"
															value={participant.firstname}
															onChange={e => handleChange(index, e)}
														/>
													</AtendeeFormControl>
													<AtendeeFormControl>
														<label>Last Name:</label>
														<input
															required
															type="text"
															name="lastname"
															value={participant.lastname}
															onChange={e => handleChange(index, e)}
														/>
													</AtendeeFormControl>
												</FormFlex>
												<FormFlex>
													<AtendeeFormControl>
														<label>Email:</label>
														<input
															required
															type="email"
															name="email"
															value={participant.email}
															onChange={e => handleChange(index, e)}
														/>
													</AtendeeFormControl>
													<AtendeeFormControl>
														<label>Phone:</label>
														<input
															required
															type="tel"
															name="phone"
															value={participant.phone}
															onChange={e => handleChange(index, e)}
														/>
													</AtendeeFormControl>
												</FormFlex>
											</AtendeeForm>
										))}
									</form>
								</RegisterFormSection>
								<AboutUs>
									<p className="title">How did you hear about us?</p>
									<div className="radio-input">
										<FormRadioLabel htmlFor="instagram">
											<input
												required
												type="radio"
												name="aboutUs"
												id="instagram"
												value={aboutUsChannel}
												onChange={onAboutUsChange}
											/>
											Instagram
										</FormRadioLabel>
									</div>
									<div className="radio-input">
										<FormRadioLabel htmlFor="facebook">
											<input
												type="radio"
												name="aboutUs"
												id="facebook"
												value={aboutUsChannel}
												onChange={onAboutUsChange}
											/>
											Facebook
										</FormRadioLabel>
									</div>
									<div className="radio-input">
										<FormRadioLabel htmlFor="whatsapp">
											<input
												type="radio"
												name="aboutUs"
												id="whatsapp"
												value={aboutUsChannel}
												onChange={onAboutUsChange}
											/>
											Whatsapp
										</FormRadioLabel>
									</div>
									<div className="radio-input">
										<FormRadioLabel htmlFor="friends">
											<input
												type="radio"
												name="aboutUs"
												id="friends"
												value={aboutUsChannel}
												onChange={onAboutUsChange}
											/>
											Friends
										</FormRadioLabel>
									</div>
								</AboutUs>

								<CTA onClick={handleSubmit} className="no-animate register-btn">
									Register Event
								</CTA>
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
								<People>{numPeople} X People Attending</People>
								<Price>
									{priceFormatter.format(training.price * numPeople)}
								</Price>
							</Attendance>
							<TotalSection>
								<Info>Total</Info>
								<Amount>
									{priceFormatter.format(training.price * numPeople)}
								</Amount>
							</TotalSection>
						</ViewSection>
						<Dialog.Close className={styles.unSet} asChild>
							<CloseButton>
								<CancelIcon />
							</CloseButton>
						</Dialog.Close>
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
	position: relative;

	// padding: 1rem;
	@media ${({ theme }) => theme.breakpoints.above.md} {
		height: 37rem;
		flex-direction: row;
		padding: 0rem;
	}
`;

const EditSection = styled.div`
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}

	& {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

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
		padding: 0.7rem 3rem;

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

const CloseButton = styled.button`
	position: absolute;
	top: -0.5rem;
	right: -0.5rem;
	display: inline-flex;
	height: 3.25rem;
	width: 3.25rem;
	align-items: center;
	justify-content: center;
	border-radius: 9999px;
	padding: 0.5rem;
	color: black;
	cursor: pointer;

	&:hover {
		background-color: #f3d2be;
	}

	&:focus-visible,
	&[data-focus-visible] {
		outline-style: solid;
		outline-width: 2px;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		top: 0.5rem;
		right: 0.5rem;
		height: 2.5rem;
		width: 2.5rem;
	}
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

const RegisterFormSection = styled.div`
	margin: 2rem 0 0;
`;

const AtendeeText = styled.p`
	color: var(--text-colour-grey);
	/* margin: 1rem 0rem; */
`;
const AtendeeForm = styled.div``;

const FormFlex = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

const AtendeeFormControl = styled.div`
	display: flex;
	flex-direction: column;
	flex: 50%;

	label {
		font-size: 0.7rem;
		font-weight: 500;
		margin: 0.7rem 0rem 0.3rem;
	}

	input {
		padding: 0.5rem 0.7rem;
		outline-color: var(--oex-orange);
		outline-width: thin;
		border-radius: 0.1rem;
		border: 1px solid var(--oex-lighter-grey);
	}
`;

const AboutUs = styled.div`
	margin-top: 1rem;
	& .title {
		margin-bottom: 0.5rem;
	}
	& .radio-input {
		margin-bottom: 0.3rem;
	}
	label {
		margin-bottom: 0.5rem;
		color: var(--oex-bg-grey);
	}

	input[type='radio'] {
		border: 1px solid black;
	}
	input[type='radio']::before {
		border: 1px solid var(--oex-orange);
		// border: 0.5px solid red;
	}
	input[type='radio']:checked {
		border: 1px solid var(--oex-orange);
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const ViewSection = styled.div`
	display: none;
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
