import { useState } from "react";
import styled from "styled-components";
import AboutDetail from "../components/About/AboutDetail";
import AboutInfo from "../components/About/AboutInfo";
import { Container } from "@components/styled";

function About() {
  const [currentSelected, setcurrentSelected] = useState<string>("overview");

  return (
    <Container bg="#FAFAFA" paddingMultiplier={0}>
      <StyledAbout>
        <AboutInfo setCurrentSelected={setcurrentSelected} />
        <AboutDetail currentSelected={currentSelected} />
      </StyledAbout>
    </Container>
  );
}

export default About;

// remove min-height below

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  margin-top: 5rem;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 3rem 5rem 5rem;
    background-color: var(--oex-lightest-grey);
  }
`;

