import ArrowDownUp from '@assets/new/icons/ArrowDownUp';
import Calender from '@assets/new/icons/Calender';
import Call from '@assets/new/icons/Call';
import Location from '@assets/new/icons/Location';
import People from '@assets/new/icons/People';
import Time from '@assets/new/icons/Time';
import Whatsapp from '@assets/new/icons/Whatsapp';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import {
	calculateDateDifference,
	debounce,
	formatDate,
	formatTime,
} from '@utils/index';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import CTA, { CTALink } from './CTA';
import FeaturedEventDialog from './FeaturedEventDialog';
import { priceFormatter } from './ProductCard';
import SocialMediaButtons from './shared/SocialMediaButtons';

type FeaturedEventProp = {
	userEmail: string;
	training: TrainingSupbaseDataType;
};

enum EventFormat {
	ONLINE = 'ONLINE',
	ONSITE = 'ONSITE',
}

type PromoResultType = {
	promoIsValid: boolean;
	promoNotification: string;
	discountedPrice: number | null;
};

const FeaturedEventCard: React.FC<FeaturedEventProp> = ({ training }) => {
	const websiteUrl = `https://orthoex.ng/trainings#training-${training.id}`;
	const createUrlText = () => {
		return encodeURI(`Check out this training: ${training.title} at`);
	};

	const [panelOpen, setpanelOpen] = useState(false);
	const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
	const [promoCode, setPromoCode] = useState('');
	const [isRequestPending, setIsRequestPending] = useState(false);
	const [promoResult, setPromoResult] = useState<PromoResultType>({
		promoIsValid: false,
		promoNotification: '',
		discountedPrice: null,
	});

	const { promoIsValid, promoNotification, discountedPrice } = promoResult;

	const openBookingDialog = () => setIsBookingDialogOpen(true);
	const closeBookingDialog = () => setIsBookingDialogOpen(false);

	const trainingPrice = discountedPrice ? discountedPrice : training.price;

	const redeemPromoCode = async () => {
		// avoid making request if promo code is empty, saves on api calls
		if (!promoCode) {
			toast.error('Please enter a promo code');
			return;
		}
		try {
			const response = await fetch('/api/promo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ promoCode, price: training.price }),
			});
			return (await response.json()) as PromoResultType;
		} catch (error) {
			console.log(error);
		}
	};

	const handleRedeemClick = async () => {
		if (isRequestPending) {
			return; // Prevent multiple requests while one is already pending
		}
		setIsRequestPending(true);
		const data = await redeemPromoCode();
		if (data) {
			setPromoResult(data);
		}
		setIsRequestPending(false);
	};

	// Debounced version of handleRedeemClick
	// you don't even really need a debounce, just disable the button while the request is pending
	const debouncedHandleRedeemClick = debounce(handleRedeemClick, 1000); // Adjust the delay as needed

	return (
		<StyledWrapperDiv id={`training-${training.id}`}>
			<StyledDetailsSection>
				<StyledLeftContent>
					<StyledCourseFormat type={training.trainingFormat}>
						{training.trainingFormat}
					</StyledCourseFormat>
					<h4>{training.title}</h4>
					<StyledInfoDiv>
						<Calender />
						<span className="date">{`${formatDate(
							new Date(training.startDateTime),
						)} - ${formatDate(new Date(training.endDateTime))}`}</span>
						<StyledDays>{`${calculateDateDifference(
							training.startDateTime,
							training.endDateTime,
						)} DAYS`}</StyledDays>
					</StyledInfoDiv>
					<StyledInfoDiv>
						<Time />
						<span>{`${formatTime(
							new Date(training.startDateTime),
						)} - ${formatTime(new Date(training.endDateTime))}`}</span>
					</StyledInfoDiv>
					<StyledInfoDiv>
						<Location />
						<span>{`${training.location}`}</span>
					</StyledInfoDiv>
					<SocialSection>
						<p className="title">Share this event</p>
						<SocialMediaButtons
							whatsappLink={`https://api.whatsapp.com/send?text=${createUrlText()} ${websiteUrl}`}
							twitterLink={`https://twitter.com/intent/tweet?text=${createUrlText()}&url=${websiteUrl}`}
							facebookLink={`https://www.facebook.com/sharer.php?u=${websiteUrl}&text=${createUrlText()}`}
							linkedInLink={`https://www.linkedin.com/shareArticle?text=${createUrlText()}&url=${websiteUrl}`}
							height={20}
							width={20}
							color={'black'}
						/>
					</SocialSection>
				</StyledLeftContent>
				<StyledRightContent>
					<StyledInfoDiv>
						<People />
						<span>{training.participants} participants</span>
						<StyledSpot>3 Spots left</StyledSpot>
					</StyledInfoDiv>
					<StyledPrice>
						<p className="price">{priceFormatter.format(trainingPrice)}</p>
						<PromoSection promoIsValid={promoIsValid}>
							<p className="promo-title">Promo code</p>
							<PromoInput>
								<input
									className="promo-input"
									value={promoCode}
									onChange={e => setPromoCode(e.target.value)}
									type="text"
									name="promo"
									id="promo"
									placeholder="Enter a valid discount code"
								/>
								<CTA
									className="promo-btn"
									disabled={isRequestPending}
									onClick={debouncedHandleRedeemClick}>
									Redeem
								</CTA>
							</PromoInput>
							{promoNotification && (
								<span className="promo-notification">{promoNotification}</span>
							)}
						</PromoSection>
						<FeaturedEventDialog
							trainingPrice={trainingPrice}
							training={training}
							onOpen={openBookingDialog}
							isOpen={isBookingDialogOpen}
							onClose={closeBookingDialog}></FeaturedEventDialog>
					</StyledPrice>
					<StyledIconText>Speak with the Event Team</StyledIconText>
					<StyledButtonGroup>
						<CTALink
							white
							href={`tel:${
								training?.phoneContact ? training?.phoneContact : ''
							}`}>
							<Call /> Phone call
						</CTALink>
						<CTALink
							white
							href={`https://wa.me/${
								training.whatsappContact
							}?text=Hello, I am writing regarding the upcoming training program ${
								training.title
							} scheduled for ${formatDate(
								new Date(training.startDateTime),
							)}.`}>
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
					<CourseInfoFlex>
						<CourseInfoDiv>
							<h4>Description</h4>
							<StyledText>{training.description}</StyledText>
							{training.prerequisites && (
								<>
									<h4>Prerequisites</h4>
									<StyledText>{training.prerequisites}</StyledText>
								</>
							)}
							<h4>Benefits</h4>
							<StyledList>
								{training.benefits.map((info, index) => (
									<li key={index}>{info}</li>
								))}
							</StyledList>
							{training.extraInformation && (
								<Text>Note: {training.extraInformation}</Text>
							)}
							<Text>
								Refreshment: {training.refreshment === true ? 'Yes' : 'No'}
							</Text>
							<Text>
								Starter Pack: {training.starterPack === true ? 'Yes' : 'No'}
							</Text>
							<MoreInfoBox>
								To attend this training, please register at least two working
								days before the event.{' '}
								{training.nextTrainingDate && (
									<span>
										{`The next training will take place on ${formatDate(
											new Date(training.nextTrainingDate),
										)}`}
									</span>
								)}
							</MoreInfoBox>
						</CourseInfoDiv>

						{training.eventPosterImage && (
							<CourseImageDiv>
								<Image
									src={training.eventPosterImage}
									fill
									sizes="100"
									alt="image"
								/>
							</CourseImageDiv>
						)}
					</CourseInfoFlex>
				</StyledCourseInfo>
			</StyledInfoSection>
		</StyledWrapperDiv>
	);
};

export default FeaturedEventCard;

const MoreInfoBox = styled.div`
	background-color: var(--oex-light-grey);
	padding: 0.8rem;
	border-radius: 0.5rem 0.5rem 0 0;
	margin: 0 auto;
	font-size: 0.8rem;
	line-height: 1.5;
	text-align: center;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem;
		font-size: 1rem;
		margin: 0 1rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.lg} {
		padding: 2rem;
	}
`;

const CourseInfoFlex = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		max-height: 35rem;
	}
`;

const CourseImageDiv = styled.div`
	position: relative;
	border-radius: 0.5rem;
	aspect-ratio: 1;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex: 1;
	}
`;
const CourseInfoDiv = styled.div`
	background-color: var(--oex-off-white);
	padding: 0rem 0.7rem 0;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex: 1;
		position: relative;
		padding: 0rem 1rem 0;
		overflow-y: scroll;
		// max-height: 40rem;

		&::-webkit-scrollbar {
			display: none;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}
	}
`;

const Text = styled.p`
	line-height: 1.5;
	margin: 1rem 0rem;

	&:last-child {
		margin-bottom: 0rem;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1rem;
	}
`;

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
		width: 700px;
		margin: 0 auto 3rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.lg} {
		padding: 4rem 3rem 1rem;
		width: 1000px;
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
	margin-bottom: 1rem;
	gap: 0.7rem;
	flex-wrap: wrap;

	& .date {
		font-size: 0.9rem;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		& .date {
			font-size: 1rem;
		}
	}
`;

const SocialSection = styled.div`
	margin: 1rem 0;
	& .title {
		text-transform: uppercase;
		font-weight: 700;
		font-size: 0.8rem;
	}
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
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 1rem;
	gap: 1.2rem;

	& > p {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
	}

	& > a > button {
		padding: 0.7rem 1.2rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		gap: 1rem;
		margin-bottom: 0rem;

		& > a > button {
			flex: 0.5 0;
			min-width: 60%;
		}
	}
`;

const PromoSection = styled.div<{ promoIsValid: boolean }>`
	margin-bottom: 1rem;

	& .promo-title {
		font-weight: 600;
		margin-bottom: 5px;
	}

	& .promo-notification {
		font-size: 12px;
		margin-bottom: 0;
		color: ${({ promoIsValid }) =>
			promoIsValid ? 'var(--oex-success)' : 'var(--oex-danger)'};
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		margin-bottom: 0rem;
	}
`;

const PromoInput = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: space-between;

	& .promo-input {
		border: 1px solid var(--text-colour-light-grey);
		padding: 10px;
		outline: var(--oex-orange);
		border-radius: 4px;
		width: 80%;

		&:placeholder {
			color: 1px solid var(--text-colour-light-grey);
			font-size: 2px;
		}
	}

	& .promo-btn {
		padding: 8px 12px;
		font-size: 10px;
		background-color: var(--text-colour-grey);
		border: 1px solid var(--text-colour-grey);

		&:hover {
			color: white;
			background-color: var(--text-colour-grey);
		}
	}
`;

const StyledIconText = styled.p`
	font-size: 1.1rem;
	margin: 0;
	font-weight: 400;
	display: inline-block;
	margin-top: 1rem;

	& > span {
		padding-right: 1rem;
		cursor: pointer;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1.2rem;
		margin-bottom: 1rem;
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
	padding: 0.7rem 0.7rem 0rem;

	& > h4 {
		margin: 0;
		font-weight: 500;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		color: black;
		padding: 1rem 1rem 0;

		& > p {
			font-size: 1.2rem;
		}
	}
`;

const StyledText = styled.p`
	line-height: 1.5;
	margin: 1rem 0;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1rem;
		color: black;
	}
`;

const StyledList = styled.ul`
	line-height: 1.8;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1rem;
		color: black;
	}
`;
