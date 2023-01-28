import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import React from 'react';
import styled from 'styled-components';

type InfoCardSectionProps = {
	data: ServiceCardType[];
};

const InfoCardSection: React.FC<InfoCardSectionProps> = ({ data }) => {
	return (
		<InfoCards>
			{data.map((info, index) => (
				<ServiceCard
					bgColor={'var(--oex-off-white)'}
					greyFont
					service={info}
					key={`infoCardsData=${index}`}
				/>
			))}
		</InfoCards>
	);
};

export default InfoCardSection;

const InfoCards = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	gap: 2rem;

	& > div {
		height: auto;
		flex: 1;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		justify-content: space-around;
		gap: 1rem;
		flex-wrap: wrap;

		//  TODO : have a look at this
		& > div {
			height: auto;
			width: 40%;
		}
	}

	@media ${({ theme }) => theme.breakpoints.above.lg} {
		gap: 3rem;
		& > div {
			width: 20%;
		}
	}
`;
