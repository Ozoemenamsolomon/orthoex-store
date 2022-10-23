import React from "react";
import styled from "styled-components";

interface AboutCardType {
  heading: string;
  title?: string;
  image?: any;
  description?: string;
  descriptionList?: string[]
}

const AboutCard: React.FC<AboutCardType> = ({
  heading,
  title,
  image,
  description,
  descriptionList,
}) => {
  return (
    <StyledAboutCard>
      <h1>{heading}</h1>
      {descriptionList && descriptionList.map((text, index) => (
        <Text key={index}>{text}</Text>
      ))}

      {description && (
        <StyledAboutSection>
          <h4>{title}</h4>
          <p>{description}</p>
        </StyledAboutSection>
      )}
    </StyledAboutCard>
  );
};

export default AboutCard;

const StyledAboutCard = styled.div`

& > h1 {
  font-size: 1.5rem;
  border-bottom: 0.1rem solid var(--oex-light-grey);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
`;
const StyledAboutSection = styled.div`

`;

const Text = styled.p`
  color: var(--oex-dark-grey);
`