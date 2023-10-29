import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { formatDate } from '@utils/index';
import React from 'react';
import styled from 'styled-components';
import { priceFormatter } from './ProductCard';
import CTA, { CTALink } from './CTA';

interface TrainingEventCardProp {
	training: TrainingSupbaseDataType;
}

const TrainingEventCard: React.FC<TrainingEventCardProp> = ({ training }) => {
	return (
		<TrainingEventWrapper>
			<div>{training.title}</div>
			<div>{`${formatDate(new Date(training.startDateTime))}`}</div>
			<div>{`${formatDate(new Date(training.endDateTime))}`}</div>
			<div>{training.trainingFormat}</div>
			<div>{priceFormatter.format(training.price)}</div>
			<CTAGroup>
				<CTALink
					className="no-animate training"
					href={`/admin/temp/add-trainings/${training.id}`}>
					view
				</CTALink>
				<CTA className="training delete">Delete</CTA>
			</CTAGroup>
		</TrainingEventWrapper>
	);
};

export default TrainingEventCard;

const TrainingEventWrapper = styled.div`
	display: grid;
	grid-template-columns: 2fr repeat(5, 1fr);
	overflow-wrap: anywhere;
	align-items: center;
	gap: 2px;
	padding: 10px 5px;
	font-size: 14px;
	background-color: white;
	font-size: 0.6rem;

	& > :first-child {
		padding-left: 4px;
	}

	& > :last-child {
		visibility: hidden;
	}

	&:hover > :last-child {
		visibility: visible;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 1rem;
	}
`;

const CTAGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 8px;

	& .training {
		padding: 3px 2px;
		font-size: 6px;
		border: 1px solid var(--oex-orange);
		width: 100%;

		:hover {
			background-color: white;
			color: var(--oex-orange);
		}
	}
	& > .delete {
		background-color: var(--oex-danger);
		:hover {
			background-color: white;
			color: var(--oex-danger);
			border: 1px solid var(--oex-danger);
		}
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;

		& .training {
			padding: 5px 8px;
			font-size: 15px;
		}
	}
`;
