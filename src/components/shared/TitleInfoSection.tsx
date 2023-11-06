import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import styled from 'styled-components';

export type TitleCardDataType = {
	title: string;
	cards: ServiceCardType[];
};

type TitleCardSectionProps = {
	data: TitleCardDataType;
};

const TitleInfoSection: React.FC<TitleCardSectionProps> = ({ data }) => {
	return (
		<TitleCards>
			<Heading>{data.title}</Heading>
			<InfoCards>
				{data.cards.map((info, index) => (
					<ServiceCard
						greyFont
						className="no-shadow shrink-start"
						service={info}
						key={`infoCardsData-${index}`}
					/>
				))}
			</InfoCards>
		</TitleCards>
	);
};

export default TitleInfoSection;

const TitleCards = styled.div`
	padding: 1rem;
	margin-bottom: 2rem;
`;

const InfoCards = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	& > div {
		width: 50%;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		& > div {
			width: 25%;
		}
	}
`;

export const Heading = styled.h3`
	font-size: 2rem;
	margin-bottom: 3rem;
	font-weight: 500;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		font-size: 3rem;
		margin-bottom: 5rem;
		font-weight: 700;
		text-align: center;
		max-width: 70%;
		margin: 1rem auto;
	}
`;
