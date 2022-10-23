import React from "react";
import styled from "styled-components";
import AboutCard from "./AboutCard";

interface AboutDetailProp {
  currentSelected: string;
}

const AboutDetail: React.FC<AboutDetailProp> = ({ currentSelected }) => {
  return (
    <StyledAboutDetail>
      {currentSelected === "overview" ? (
        <h1>overview</h1>
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
