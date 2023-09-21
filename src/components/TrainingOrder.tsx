import { TrainingOrderType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import React from 'react';
import styled from 'styled-components';
import Calender from '@assets/new/icons/Calender';
import { formatDate } from '@utils/index';
import { StyledInfoDiv } from './FeaturedEventCard';
import Location from '@assets/new/icons/Location';
import Link from 'next/link';
import People from '@assets/new/icons/People';
import { priceFormatter } from './ProductCard';

type Props = {
	training: TrainingOrderType;
};
const TrainingOrder: React.FC<Props> = ({ training }) => {
	return (
		<Wrapper>
			<Link className="link" href={`/trainings/checkout/${training.reference}`}>
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
					<People />
					<span>{`${priceFormatter.format(training.amountPaid)}`}</span>
				</StyledInfoDiv>
			</Link>
		</Wrapper>
	);
};

export default TrainingOrder;

const Wrapper = styled.div`
	margin: 0 auto 2rem;
	min-height: 100px;
	padding: 1rem;
	border-radius: 5px;
	background-color: var(--oex-light-grey);
	box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
		-2px 0px 4px rgba(207, 207, 207, 0.1), 0px 2px 12px rgba(207, 207, 207, 0.1),
		0px -2px 16px rgba(207, 207, 207, 0.1);

	&:hover {
		cursor: pointer;
		transform: scale(1.1);
		transition: transform 0.2s;
		background-color: var(--oex-orange-mute);
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		width: 700px;
	}
`;

const Title = styled.p`
	font-size: 1.3rem;
	font-weight: 500;
`;
