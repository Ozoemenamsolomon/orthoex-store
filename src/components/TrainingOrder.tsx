import Calender from '@assets/new/icons/Calender';
import Location from '@assets/new/icons/Location';
import People from '@assets/new/icons/People';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { calculateDateDifference, formatDate } from '@utils/index';
import React, { useState } from 'react';
import styled from 'styled-components';
import CTA, { CTALink } from './CTA';
import { StyledInfoDiv } from './FeaturedEventCard';
import { priceFormatter } from './ProductCard';
import BoxArrow from '@assets/new/icons/BoxArrow';
import { ParticipantsDataType } from './FeaturedEventDialog';
import DownloadIcon from '@assets/new/icons/DownloadIcon';

type Props = {
	training: TrainingOrderType;
	deleteTraining?: (reference: string) => Promise<void>;
};
const TrainingOrder: React.FC<Props> = ({ training, deleteTraining }) => {
	const [panelOpen, setpanelOpen] = useState(false);
	const participants = JSON.parse(
		training.participants,
	) as ParticipantsDataType[];
	const todaysDate = new Date().toISOString();
	const expiryDays = calculateDateDifference(todaysDate, training.expiredAt);
	const onClickDelete = async (id: number) => {
		if (confirm('Are you sure to delete order?')) {
			if (deleteTraining) {
				await deleteTraining(training.reference);
			}
		} else {
			return;
		}
	};
	return (
		<Wrapper>
			<Header>
				<HeaderInfo>
					<div className="title">Order Date</div>
					<div className="description">{`${formatDate(
						new Date(training.createdAt),
					)}`}</div>
				</HeaderInfo>
				<HeaderInfo>
					<div className="title">Price</div>
					<div className="description">
						{`${priceFormatter.format(training.amountPaid)} `}
						<span className="meta-info">
							(
							{`${
								training.numOfParticipants ? training.numOfParticipants : 1
							} participant${training.numOfParticipants > 1 ? 's' : ''}`}
							)
						</span>
					</div>
				</HeaderInfo>
				<HeaderInfo>
					<div className="title">Order ref:</div>
					<div className="description">{`${training.reference}`}</div>
					{!training.paid && (
						<div className="expiry-info">
							Order
							{expiryDays > 0 ? ` expires in ${expiryDays} Day(s)` : ` Expired`}
							.
						</div>
					)}
				</HeaderInfo>
			</Header>
			{!training.paid && (
				<OrderInfo>
					<span className="order-desc">
						<span className="title">Order Ref: </span>
						<span className="ref"> {training.reference}</span>
					</span>

					<p className="expiry-date">
						Order
						{expiryDays > 0 ? ` expires in ${expiryDays} Day(s)` : ` Expired`}.
					</p>
				</OrderInfo>
			)}
			{!training.paid && (
				<ButtonGroup>
					<CTALink
						className="pay btn"
						href={`/trainings/checkout/${training.reference}`}>
						Pay {`${priceFormatter.format(training.amountPaid)}`}
					</CTALink>
					<CTA
						className="delete btn"
						onClick={() => onClickDelete(training.id)}>
						Delete
					</CTA>
				</ButtonGroup>
			)}
			<DisplayDetails onClick={() => setpanelOpen(prev => !prev)}>
				<BoxArrow rotate={panelOpen} />
				<span className="info">{panelOpen ? 'Hide' : 'View'} Details</span>
			</DisplayDetails>
			<DetailGroup open={panelOpen}>
				<DetailSection>
					<DetailLeft>
						<Title>{training.title}</Title>
						<ParticipantInfo>
							{participants.map((data, index) => (
								<div className="info" key={index}>
									<People />
									<span>
										{data.firstname} {data.lastname}
									</span>
									{data.completedTraining && (
										<CTALink className="download-link" href={'#'}>
											<DownloadIcon /> Download Certificate
										</CTALink>
									)}
								</div>
							))}
						</ParticipantInfo>
					</DetailLeft>
					<DetailRight>
						<StyledInfoDiv>
							<Calender />
							<span className="date">{`${formatDate(
								new Date(training.trainingDate),
							)}`}</span>
						</StyledInfoDiv>
						<StyledInfoDiv>
							<Location />
							<span>{`${training.location}`}</span>
						</StyledInfoDiv>
					</DetailRight>
				</DetailSection>
			</DetailGroup>
		</Wrapper>
	);
};

export default TrainingOrder;

const Wrapper = styled.div`
	margin: 0 auto 2rem;
	min-height: 100px;
	border-radius: 5px;
	border: 1px solid var(--oex-light-grey);
	box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
		-2px 0px 4px rgba(207, 207, 207, 0.1), 0px 2px 12px rgba(207, 207, 207, 0.1),
		0px -2px 16px rgba(207, 207, 207, 0.1);

	& .pay-btn {
		font-size: 0.8rem;
		padding: 0.7rem 1rem;
		margin: 1rem 0 0 1rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		&:last-child {
			margin-bottom: 1rem;
		}
	}
	@media ${({ theme }) => theme.breakpoints.above.lg} {
		min-width: 700px;
	}
`;

const Title = styled.p`
	font-size: 1.3rem;
	font-weight: 500;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: var(--oex-orange-mute);
	min-height: 50px;
	padding: 1rem;
`;

const HeaderInfo = styled.span`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;

	& .title {
		text-transform: uppercase;
		font-weight: 700;
	}
	& .description {
		font-size: 0.7rem;
		font-weight: 500;
		overflow: hidden;
		// white-space: nowrap;
		text-overflow: ellipsis;
		width: 100px;
	}
	& .meta-info {
		color: var(--text-colour-grey);
	}
	& .expiry-info {
		color: var(--oex-danger);
		font-size: 0.6rem;
	}

	&:last-child {
		display: none;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		&:last-child {
			display: flex;
		}
	}
`;

const OrderInfo = styled.div`
	padding: 1rem;
	& .order-desc {
	}
	& .title {
		text-transform: uppercase;
		font-weight: 700;
	}
	& .expiry-date {
		color: var(--oex-danger);
		font-size: 0.7rem;
		margin-top: 0.5rem;
	}

	& .ref {
		font-size: 0.8rem;
		width: 150px;
		display: inline-flex;
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: 500;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: none;
	}
`;

const DisplayDetails = styled.p`
	font-size: 0.8rem;
	margin: 0;
	font-weight: 400;
	display: inline-block;
	margin-top: 0.5rem;
	color: var(--oex-orange);
	cursor: pointer;
	display: flex;
	margin-left: 1rem;
	margin-bottom: 1rem;

	& .info {
		margin-left: 0.5rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		margin-bottom: 1rem;
	}
`;

const DetailGroup = styled.div<{ open: boolean }>`
	display: ${({ open }) => (open === true ? 'block' : 'none')};
`;
const DetailSection = styled.div`
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		gap: 5rem;
	}
`;
const DetailLeft = styled.div``;
const ParticipantInfo = styled.div`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: stretch;
	gap: 1rem;

	& .info {
		display: flex;
		align-items: center;
		justify-content: stretch;
		gap: 0.5rem;
	}
	& .download-link {
		padding: unset;
		background-color: unset;
		font-size: 0.7rem;
		color: var(--oex-orange);
		display: flex;
		align-items: center;
	}
`;

const DetailRight = styled.div``;
const ButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	padding: 0 1rem;
	& .btn {
		width: 100%;
		padding: 0.4rem 1rem;
		cursor: pointer;
		font-size: 0.9rem;
	}
	& .pay {
		border: 1px solid var(--oex-orange);
	}
	& .delete {
		color: white;
		border: 1px solid var(--oex-danger);
		background-color: var(--oex-danger);
		&:hover {
			color: var(--oex-danger);
		}
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		margin-top: 1rem;
		flex-direction: row;
	}
	@media ${({ theme }) => theme.breakpoints.above.lg} {
		width: 50%;
	}
`;
