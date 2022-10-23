import { useState } from "react";
import styled from "styled-components";
import AboutDetail from "../components/About/AboutDetail";
import AboutInfo from "../components/About/AboutInfo";
import { Container } from "@components/styled";

function about() {
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

export default about;

// remove min-height below

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  margin-top: 5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
