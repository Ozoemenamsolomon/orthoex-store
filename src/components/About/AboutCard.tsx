import React from "react"
import styled from "styled-components"

interface AboutCardType {
  heading: string;
  title: string;
  image: any;
  description: string;

}

const AboutCard: React.FC<AboutCardType> = ({heading, title,image,description}) => {
  return (
    <StyledAboutCard>
      <h1>{title}</h1>

      <StyledAboutSection>
        <h4>{title}</h4>
        <p>{description}</p>
      </StyledAboutSection>
    </StyledAboutCard>
  )
}

export default AboutCard

const StyledAboutCard = styled.div`

`
const StyledAboutSection = styled.div`

`