import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { DescriptionInfoType } from "./AboutDetail";
// import OurMission from "@assets/new/icons/about/our-mission.svg"


interface AboutCardType {
  heading: string;
  title?: string;
  image?: any;
  description?: string;
  descriptionList?: string[];
  descriptionInfo?: DescriptionInfoType[];
  largeList?: boolean;
}

const AboutCard: React.FC<AboutCardType> = ({
  heading,
  largeList,
  descriptionInfo,
  descriptionList,
}) => {
  return (
    <StyledAboutCard largeList={largeList}>
      <h1>{heading}</h1>
      {descriptionList &&
        descriptionList.map((text, index) => <Text key={index}>{text}</Text>)}

      {descriptionInfo && (
        <StyledAboutWrapper largeList={largeList}>
          {descriptionInfo.map((info, index) => (
            <StyledAboutSection largeList={largeList} key={`${info.title}-${index}`}>
              <Image src={info.image} alt={info.title} />
              <h4>{info.title}</h4>
              <p>{info.description}</p>
            </StyledAboutSection>
          ))}
        </StyledAboutWrapper>
      )}
    </StyledAboutCard>
  );
};

export default AboutCard;

type LargeListProps = {
  largeList?: boolean
};

const StyledAboutCard = styled.div<LargeListProps>`
  margin-bottom: 6rem;

  & > h1 {
    font-size: 1.5rem;
    border-bottom: 0.1rem solid var(--oex-lighter-grey);
    border-top: ${({largeList}) => largeList === true ? "0.1rem solid var(--oex-lighter-grey)": ""};
    padding-top: ${({largeList}) => largeList === true ? "3rem": ""};
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
  }

`;
const StyledAboutSection = styled.div<LargeListProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;


  & > h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0rem;
  }
  & > p {
    text-align: center;
    font-size: 0.9rem; 
    padding: 0rem 2.8rem;
    color: var(--oex-dark-grey);
  }

  @media(min-width:768px){
    width: ${({largeList}) => largeList === true ? "30%": ""};

    & > h4{
    font-size: 1.2rem;
    }

    & > p {
      text-align: center;
      font-size: 0.9rem; 
      padding: 0rem;
      color: var(--oex-dark-grey);
    }

  }
`;

const StyledAboutWrapper = styled.div<LargeListProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: ${({largeList}) => largeList === true ? "wrap": ""};
    align-items: center;
    justify-content: space-around;
    padding-top: 2rem;
    padding-bottom: ${({largeList}) => largeList === true ? "3rem": ""};
  }

`;

const Text = styled.p`
  color: var(--oex-dark-grey);
  font-size: 0.9rem;

  @media(min-width:768px){
    font-size: 1.1rem;
  }
`;
