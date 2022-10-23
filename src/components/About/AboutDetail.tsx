import React from "react";
import styled from "styled-components";
import AboutCard from "./AboutCard";

interface AboutDetailProp {
  currentSelected: string;
}

const descriptionData = [
  "OrthoEx is a leading prosthetic, orthotic components, and composite materials supplier. Since 2014, we have served thousands of professionals in both the private and public sectors. Our products are designed for our customers' needs across multiple markets in the healthcare and manufacturing industries. In addition, we work closely with prosthetists who provide free artificial limbs to amputees in Nigeria.",
  "As the market leader, we collaborate with top brands across the globe and offer technical training and consultancy to professionals and organizations on our range of products and technologies.",
  "We pride ourselves on satisfying our customers and helping them reach their business goals. OrthoEx is on a mission to empower human potential!",
  "There are many reasons our partners love to work with us. Join us and take advantage of the growing benefits as we continue to grow our competence, quality, and customer experience."
]

const AboutDetail: React.FC<AboutDetailProp> = ({ currentSelected }) => {
  return (
    <StyledAboutDetail>
      {currentSelected === "overview" ? (
        <AboutCard heading={"Company Overview"} descriptionList={descriptionData}/>
      ) : currentSelected === "values" ? (
        <h1>values</h1>
      ) : currentSelected === "business" ? (
        <h1>business</h1>
      ) : null}
    </StyledAboutDetail>
  );
};

export default AboutDetail;

const StyledAboutDetail = styled.div`
  margin-top: 2rem;
  @media (min-width: 768px) {
  }
`;
