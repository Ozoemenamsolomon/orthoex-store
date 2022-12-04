import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import React from 'react';
import styled from 'styled-components';
import { ServicesCards } from '@components/styled';

export type AboutCardSectionType = {
	heading: string;
	description?: string;
	cards?: ServiceCardType[];
};

const AboutCardSection: React.FC<{ sections: AboutCardSectionType[] }> = ({
	sections,
}) => {
	return (
		<>
			{sections.map((section, index) => {
				const { heading, description, cards } = section;
				return (
					<StyledAboutCard key={`heading-${index}`}>
						<h1>{heading}</h1>
						{description ? (
							<div>{description}</div>
						) : (
							<ServicesCards>
								{cards?.map((card, index) => (
									<ServiceCard
										small
										greyFont
										className="no-shadow"
										key={`service-card-${index}`}
										service={card}
									/>
								))}
							</ServicesCards>
						)}
					</StyledAboutCard>
				);
			})}
		</>
	);
};

export default AboutCardSection;

const StyledAboutCard = styled.div`
	margin-bottom: 6rem;

  >div{
    --min-width: 190px;
  }

	& > h1 {
		font-size: 1.5rem;
		border-bottom: 0.1rem solid var(--oex-lighter-grey);
		padding-bottom: 2rem;
		margin-bottom: 1rem;
		font-weight: 500;
		text-align: center;
	}

	@media (min-width: 768px) {
		padding: 2rem;
		margin-bottom: 0rem;

		& > h1 {
			font-size: 2.5rem;
			text-align: left;
			font-weight: 500;

	}
 `;
