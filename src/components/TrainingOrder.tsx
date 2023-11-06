import Calender from '@assets/new/icons/Calender';
import Location from '@assets/new/icons/Location';
import MoneyIcon from '@assets/new/icons/MoneyIcon';
import People from '@assets/new/icons/People';
import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { formatDate } from '@utils/index';
import React from 'react';
import styled from 'styled-components';
import CTA, { CTALink } from './CTA';
import { StyledInfoDiv } from './FeaturedEventCard';
import { priceFormatter } from './ProductCard';

type Props = {
	training: TrainingOrderType;
	deleteTraining: (reference: string) => Promise<void>;
};
const TrainingOrder: React.FC<Props> = ({ training, deleteTraining }) => {
	const onClickDelete = async (id: number) => {
		if (confirm('Are you sure to delete order?')) {
			await deleteTraining(training.reference);
		} else {
			return;
		}
	};
	return (
		<Wrapper>
			<DetailGroup>
				<Title>{training.title}</Title>
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
				<StyledInfoDiv>
					<People />
					<span>{`${
						training.numOfParticipants ? training.numOfParticipants : 1
					} participant${training.numOfParticipants > 1 ? 's' : ''}`}</span>
				</StyledInfoDiv>
				<StyledInfoDiv>
					<MoneyIcon />
					<span>{`${priceFormatter.format(training.amountPaid)}`}</span>
				</StyledInfoDiv>
			</DetailGroup>
			<ButtonGroup>
				<CTA className="delete btn" onClick={() => onClickDelete(training.id)}>
					Delete
				</CTA>
				<CTALink
					className="pay btn"
					href={`/trainings/checkout/${training.reference}`}>
					Pay Order
				</CTALink>
			</ButtonGroup>
		</Wrapper>
	);
};

export default TrainingOrder;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 0 auto 2rem;
	min-height: 100px;
	padding: 1rem;
	border-radius: 5px;
	background-color: var(--oex-light-grey);
	box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
		-2px 0px 4px rgba(207, 207, 207, 0.1), 0px 2px 12px rgba(207, 207, 207, 0.1),
		0px -2px 16px rgba(207, 207, 207, 0.1);

	&:hover {
		background-color: var(--oex-orange-mute);
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		width: 700px;
		flex-direction: row;
	}
`;

const Title = styled.p`
	font-size: 1.3rem;
	font-weight: 500;
`;

const DetailGroup = styled.div``;
const ButtonGroup = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	justify-content: center;
	& .btn {
		width: 100%;
		padding: 0.4rem 1.5rem;
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
		flex-direction: column;
		width: 40%;
	}
`;
