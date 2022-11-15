import React from "react";
import styled from "styled-components";
import AboutCard from "./AboutCard";

export type AboutDetailDataType = {
  description: string[],
  mission: DescriptionInfoType[],
  business: DescriptionInfoType[],
  values: DescriptionInfoType[]
 }
interface AboutDetailProp {
  currentSelected: string;
  data: AboutDetailDataType
}

export interface DescriptionInfoType {
  image: StaticImageData,
  title: string,
  description: string
}

const AboutDetail: React.FC<AboutDetailProp> = ({ currentSelected, data }) => {
  const {description, mission, business, values} = data
  return (
    <StyledAboutDetail>
      {currentSelected === "overview" ? (
        <AboutCard heading={"Company overview"} descriptionList={description}/>
      ) : currentSelected === "values" ? (
        <>
        <AboutCard heading={"Mission & Vision"} descriptionInfo={mission} />
        <AboutCard heading={"Values"} largeList={true} descriptionInfo={values} />
        </>
      ) : currentSelected === "business" ? (
        <AboutCard heading={"Our businesses"} descriptionInfo={business} />
      ) : null}
    </StyledAboutDetail>
  );
};

export default AboutDetail;

const StyledAboutDetail = styled.div`
  margin-top: 2rem;

  @media (min-width: 768px) {
    background-color: white;
    margin-top: 0rem;
    width: 75%; 

  }
`;
