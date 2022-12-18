import { OpenJobPositionsType } from '@data/openJobPositionsData';
import React from 'react';
import styled from 'styled-components';
import { CTALink } from './CTA';

type JobPositionProp = {
	data: OpenJobPositionsType;
};

const JobPositonCard: React.FC<JobPositionProp> = ({ data }) => {
	return (
		<StyledJobPositionCard>
			<StyledJobPositionCardContent>
				<h3>{data.title}</h3>
				<p>{data.description}</p>
				<StyledContentDiv>
					<span>{data.type}</span>
					<span>{data.location}</span>
					<span>{data.department}</span>
				</StyledContentDiv>
			</StyledJobPositionCardContent>
			<CTALink className="no-animate" href={data.applyLink}>
				Apply Now
			</CTALink>
		</StyledJobPositionCard>
	);
};

export default JobPositonCard;

const StyledJobPositionCard = styled.div`
	padding: 2rem 1rem;
	display: flex;
	margin: 0rem auto 3rem;
	flex-direction: column;

	box-shadow: 2px 0px 16px rgba(207, 207, 207, 0.1),
		-2px 0px 4px rgba(207, 207, 207, 0.1), 0px 2px 12px rgba(207, 207, 207, 0.1),
		0px -2px 16px rgba(207, 207, 207, 0.1);

	& > .btn {
		font-size: 1rem;
	}

	@media (min-width: 768px) {
		max-width: 1000px;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
`;

const StyledJobPositionCardContent = styled.div`
	& > h3 {
		font-size: 1.5rem;
		font-weight: 400;
	}

	& > p {
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--text-colour-grey);
	}
	@media (min-width: 768px) {
		width: 70%;
	}
`;

const StyledContentDiv = styled.div`
	margin: 2rem 0rem;
	font-size: 0.8rem;

	& > span:not(:first-child)::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		-moz-border-radius: 7.5px;
		-webkit-border-radius: 7.5px;
		border-radius: 7.5px;
		background-color: var(--oex-grey);
		margin: 0rem 0.5rem;
	}
`;
