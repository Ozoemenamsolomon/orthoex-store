import React from 'react';
import { CTAFlex } from './CTA';
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
						<CTAFlex white key={index}>
							<Icon /> {title}
						</CTAFlex>
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

	@media (min-width: 768px) {
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

	& > a {
		flex: 1;
	}

	@media (min-width: 768px) {
		padding: 0rem;
	}
`;

const StyledIconWrapper = styled.span`
	display: inline-block;
	text-align: center;
`;
