import React from 'react';
import CTA from './CTA';
import Link from 'next/link';
import styled from 'styled-components';
import { SupportCardDetailType } from './SupportInfo';

interface SupportInfoCardType {
	data: SupportCardDetailType;
}

const SupportInfoCard: React.FC<SupportInfoCardType> = ({ data }) => {
	const { title: cardTitle, CardIcon, paragraph, buttons } = data;
	return (
		<StyledSupportInfoCard>
			<StyledIconWrapper>
				<CardIcon />
			</StyledIconWrapper>
			<h4>{cardTitle}</h4>
			<p>{paragraph}</p>
			<StyledBtnContainer>
				{buttons.map(({ title, Icon, link }, index) => (
					<Link
						target="_blank"
						key={`button-link-${index}`}
						href={link}
						passHref>
						<CTA className='btn' white key={index}>
							<Icon /> {title}
						</CTA>
					</Link>
				))}
			</StyledBtnContainer>
		</StyledSupportInfoCard>
	);
};

export default SupportInfoCard;

const StyledSupportInfoCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	flex: 1 0 0;
	margin-bottom: 1.5rem;
	border: 1.5px solid var(--oex-light-grey);
	padding: 1.5rem;

	& > h4 {
		font-size: 1rem;
	}

	& > p {
		font-size: 0.9rem;
		line-height: 1rem;
		color: var(--text-colour-p);
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		margin-bottom: 0rem;
	}
`;

const StyledBtnContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
	justify-content: center;
	width: 100%;
	font: inherit;
	padding: 0rem;
	width: 100%;

	& .btn {
		font: inherit;
		padding: 0.5rem;
		width: 100%;
		border-radius: 0.2rem;
		border: 0.09rem solid var(--oex-orange);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	& > a {
		flex: 1;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 0rem;
	}
`;

const StyledIconWrapper = styled.span`
	display: inline-block;
	text-align: center;
`;
