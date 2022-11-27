import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import React from 'react';
import styled from 'styled-components';
import { ServicesCards } from '@components/styled';

// import styled from 'styled-components';

// interface AboutCardType {
//   heading: string;
//   title?: string;
//   image?: any;
//   description?: string;
//   descriptionList?: string[];
//   descriptionInfo?: DescriptionInfoType[];
//   largeList?: boolean;
// }
export type AboutCardSectionType = {
	heading: string;
	description?: string;
	cards?: ServiceCardType[];
};

const AboutCardSection: React.FC<{ sections: AboutCardSectionType[] }> = ({
	sections,
}) => {
	// return (
	//   <StyledAboutCard largeList={largeList}>
	//     <h1>{heading}</h1>
	//     {descriptionList &&
	//       descriptionList.map((text, index) => <Text key={index}>{text}</Text>)}

	//     {descriptionInfo && (
	//       <StyledAboutWrapper largeList={largeList}>
	//         {descriptionInfo.map((info, index) => (
	//           <StyledAboutSection
	//             largeList={largeList}
	//             key={`${info.title}-${index}`}
	//           >
	//             <Image src={info.image} alt={info.title} />
	//             <h4>{info.title}</h4>
	//             <p>{info.description}</p>
	//           </StyledAboutSection>
	//         ))}
	//       </StyledAboutWrapper>
	//     )}
	//   </StyledAboutCard>
	// );

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
										<ServiceCard small
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

    --min-width: 170px;
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

// border-top: ${({ largeList }) =>
// 	largeList === true ? '0.1rem solid var(--oex-lighter-grey)' : ''};
// padding-top: ${({ largeList }) => (largeList === true ? '3rem' : '')};

// const StyledAboutSection = styled.div<LargeListProps>`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	gap: 1rem;

// 	& > h4 {
// 		font-size: 1.1rem;
// 		font-weight: 600;
// 		margin: 0rem;
// 	}
// 	& > p {
// 		text-align: center;
// 		font-size: 0.9rem;
// 		padding: 0rem 2.8rem;
// 		color: var(--oex-dark-grey);
// 	}

// 	@media (min-width: 768px) {
// 		width: ${({ largeList }) => (largeList === true ? '30%' : '')};

// 		& > h4 {
// 			font-size: 1.2rem;
// 		}

// 		& > p {
// 			text-align: center;
// 			font-size: 0.9rem;
// 			padding: 0rem;
// 			color: var(--oex-dark-grey);
// 		}
// 	}
// `;

// const StyledAboutWrapper = styled.div<LargeListProps>`
// 	display: flex;
// 	flex-direction: column;
// 	gap: 2rem;
// 	padding-top: 3rem;

// 	@media (min-width: 768px) {
// 		flex-direction: row;
// 		flex-wrap: ${({ largeList }) => (largeList === true ? 'wrap' : '')};
// 		align-items: center;
// 		justify-content: space-around;
// 		padding-top: 2rem;
// 		padding-bottom: ${({ largeList }) => (largeList === true ? '3rem' : '')};
// 	}
// `;

// const Text = styled.p`
// 	color: var(--oex-dark-grey);
// 	font-size: 0.9rem;

// 	@media (min-width: 768px) {
// 		font-size: 1.1rem;
// 	}
// `;
