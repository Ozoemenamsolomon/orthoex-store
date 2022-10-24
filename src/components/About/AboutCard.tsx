import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { DescriptionInfoType } from "./AboutDetail";
import OurMission from "@assets/new/icons/about/our-mission.svg"



interface AboutCardType {
  heading: string;
  title?: string;
  image?: any;
  description?: string;
  descriptionList?: string[];
  descriptionInfo?: DescriptionInfoType[];
}

const AboutCard: React.FC<AboutCardType> = ({
  heading,
  title,
  image,
  description,
  descriptionInfo,
  descriptionList,
}) => {
  return (
    <StyledAboutCard>
      <h1>{heading}</h1>
      {descriptionList &&
        descriptionList.map((text, index) => <Text key={index}>{text}</Text>)}

      {descriptionInfo && (
        <StyledAboutWrapper>
          {descriptionInfo.map((info, index) => (
            <StyledAboutSection key={`${info.title}-${index}`}>
              <Image src={info.image} alt={info.title} />
              <h4>{info.title}</h4>
              <Text>{info.description}</Text>
            </StyledAboutSection>
          ))}
        </StyledAboutWrapper>
      )}
    </StyledAboutCard>
  );
};

export default AboutCard;

const StyledAboutCard = styled.div`
  margin-bottom: 6rem;

  & > h1 {
    font-size: 1.5rem;
    border-bottom: 0.1rem solid var(--oex-lighter-grey);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    font-weight: 500;
    text-align: center;
  }
`;
const StyledAboutSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & > h4 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0rem;
  }
  & > p {
    text-align: center;
    padding: 0rem 2.8rem;
  }

`;

const StyledAboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;


`;

const Text = styled.p`
  color: var(--oex-dark-grey);
  font-size: 0.9rem;

  @media(min-width:768px){
    font-size: 1.1rem;
  }
`;
