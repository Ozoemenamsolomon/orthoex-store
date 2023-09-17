import CancelIcon from '@assets/new/icons/CancelIcon';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import * as Dialog from '@radix-ui/react-dialog';
import { formatDate } from '@utils/index';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import CTA from './CTA';
import styles from './FeaturedEventCard.module.css';
import { priceFormatter } from './ProductCard';
import { FormRadioLabel } from './styled/Forms';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Checkout from '@assets/new/icons/CheckoutIcon';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	training: TrainingSupbaseDataType;
	trainingPrice: number;
};

enum ModalEnum {
	Checkout = 'checkout',
	OrderSummary = 'orderSummary',
}

interface FormDataType {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
}
const FeaturedEventDialog: React.FC<Props> = ({ training, trainingPrice }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isModalClose, setIsModalClose] = useState(false);
	const [aboutUsChannel, setAboutUsChannel] = useState('');
	const [otherChannel, setOtherChannel] = useState('');
	const [modalLocation, setModalLocation] = useState(ModalEnum.Checkout);
	const [formData, setFormData] = useState<FormDataType[]>([
		{ firstname: '', lastname: '', email: '', phone: '' },
	]);

	// derived state from formData, update when formData changes
	const numPeople = formData.length;

	const onAboutUsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAboutUsChannel(e.target.value);
		if (e.target.value !== 'other') {
			setOtherChannel('');
		}
	};
	const onOtherChannelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtherChannel(e.target.value);
	};

	const handleIncrease = () => {
		setFormData(prevFormData => [
			...prevFormData,
			{ firstname: '', lastname: '', email: '', phone: '' },
		]);
	};

	const handleDecrease = () => {
		if (numPeople === 1) return;
		if (numPeople > 1) {
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

	const onCheckoutClick = (event: any) => {
		event.preventDefault();
		setModalLocation(ModalEnum.OrderSummary);
		// You can send the formData to the API here
		console.log(formData);
		console.log(aboutUsChannel);
		console.log(otherChannel);
	};
	const handleCloseModal = () => {
		setIsModalClose(prev => !prev);
	};

	if (!user)
		return (
			<LoginWrapper>
				<Link
					href={`/api/auth/login?returnTo=${encodeURIComponent(
						router.asPath,
					)}`}>
					<CTA className="no-animate login-btn">Login to Book</CTA>
				</Link>
			</LoginWrapper>
		);

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
					{!isModalClose ? (
						modalLocation === ModalEnum.Checkout ? (
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
												{priceFormatter.format(trainingPrice * numPeople)}
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
														value="instagram"
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
														value="facebook"
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
														value="whatsapp"
														onChange={onAboutUsChange}
													/>
													Whatsapp
												</FormRadioLabel>
											</div>
											<div className="radio-input">
												<FormRadioLabel htmlFor="google">
													<input
														type="radio"
														name="aboutUs"
														id="google"
														value="google"
														onChange={onAboutUsChange}
													/>
													Google
												</FormRadioLabel>
											</div>
											<div className="radio-input">
												<FormRadioLabel htmlFor="other">
													<input
														type="radio"
														name="aboutUs"
														id="other"
														value="other"
														onChange={onAboutUsChange}
													/>
													Other
												</FormRadioLabel>
											</div>
											{aboutUsChannel === 'other' && (
												<AtendeeFormControl>
													<input
														required
														type="text"
														name="other"
														id="other"
														value={otherChannel}
														onChange={onOtherChannelChange}
													/>
												</AtendeeFormControl>
											)}
										</AboutUs>

										<CTA
											onClick={onCheckoutClick}
											className="no-animate register-btn">
											<span>
												<Checkout />
											</span>
											<span>Check out</span>
										</CTA>
									</EditInfo>
								</EditSection>
								<ViewSection>
									<Heading>{training.title}</Heading>
									<DateInfo>{`${formatDate(
										new Date(training.startDateTime),
									)} - ${formatDate(
										new Date(training.endDateTime),
									)}`}</DateInfo>
									<CourseImageDiv>
										<Image
											className="image"
											src={`${training.eventPosterImage}`}
											fill
											style={{ objectFit: 'cover' }}
											sizes="100"
											alt="image"
										/>
									</CourseImageDiv>
									<Summary>Order Summary</Summary>
									<Attendance>
										<People>{numPeople}x People Attending</People>
										<Price>
											{priceFormatter.format(trainingPrice * numPeople)}
										</Price>
									</Attendance>
									<TotalSection>
										<Info>Total</Info>
										<Amount>
											{priceFormatter.format(trainingPrice * numPeople)}
										</Amount>
									</TotalSection>
								</ViewSection>
								<CloseButton onClick={handleCloseModal}>
									<CancelIcon />
								</CloseButton>
							</ContentWrapper>
						) : (
							<OrderSummary>
								<h3>Order Summary</h3>
								<OrderInfo>
									<h5>Orders</h5>
									<OrderDetails>
										<span className='description'>{numPeople}x Subtotal</span>
										<span className='amount'>{priceFormatter.format(training.price * numPeople)}</span>
									</OrderDetails>
									<OrderDetails>
										<span className='description'>{numPeople}x Discount</span>
										<span className='amount'>{priceFormatter.format(training.price * numPeople)}</span>
									</OrderDetails>
									<OrderDetails>
										<span className='description'>Total</span>
										<span className='amount'>{priceFormatter.format(trainingPrice * numPeople)}</span>
									</OrderDetails>
								</OrderInfo>

								<CTA className='order-btn'>Pay {priceFormatter.format(trainingPrice * numPeople)}</CTA>
							</OrderSummary>
						)
					) : (
						<LeaveCheckout>
							<h4>Leave Checkout?</h4>
							<p className="text">
								Are you sure you want to leave checkout? The items you have
								selected may not be available later.
							</p>
							<div>
								<CTA
									onClick={handleCloseModal}
									className="no-animate btn stay-btn">
									Stay
								</CTA>
								<Dialog.Close className={styles.unSet} asChild>
									<CTA
										onClick={handleCloseModal}
										className="no-animate btn leave-btn">
										Leave
									</CTA>
								</Dialog.Close>
							</div>
						</LeaveCheckout>
					)}
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
	display: block;
	width: 100%;
	text-align: center;

	&:hover {
		background-color: white;
		color: var(--oex-orange);
	}
`;

const LoginWrapper = styled.div`
	& .login-btn {
		font-size: 15px;
		padding: 10px 15px;
		width: 100%;
	}
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	position: relative;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		height: 35rem;
		flex-direction: row;
		padding: 0rem;
	}
	@media ${({ theme }) => theme.breakpoints.above.lg} {
		height: 37rem;
	}
`;
const OrderSummary = styled.div`
	height: 100vh;
	position: relative;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		height: 35rem;
		padding: 0rem;
	}
	@media ${({ theme }) => theme.breakpoints.above.lg} {
		height: 37rem;
	}
`;
const OrderInfo = styled.div`

`;
const OrderDetails = styled.div`
	display: flex;
	gap: 2rem;
	justfy-content: space-between;
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
		padding: 0rem 1rem;
		flex: 60%;
		overflow-y: scroll;
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
		display: flex;
		align-items: center;
		gap: 5px;
		margin-top: 2rem;
		border: 1px solid var(--oex-orange);
		font-size: 1rem;
		padding: 0.4rem 3rem;

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
	all: unset;
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

const LeaveCheckout = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	justify-content: center;
	padding: 3rem;

	& .text {
		text-align: center;
	}
	& .btn {
		font-size: 0.7rem;
		padding: 0.8rem 3rem;
		border: 1px solid var(--oex-orange);
	}
	& .stay-btn {
		background-color: white;
		color: var(--oex-orange);
	}
	& .leave-btn {
		margin-left: 2rem;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		height: 30rem;
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
	}
	input[type='radio']:checked {
		border: 1px solid var(--oex-orange);
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
	}
`;

const ViewSection = styled.div`
	display: none;

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
