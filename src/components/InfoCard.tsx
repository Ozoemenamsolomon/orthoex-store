import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link"
import { CTAFlex } from "./CTA";

interface ButtonInfo {
  link: string;
  title: string;
  Icon?: ({ color }: { color?: string | undefined }) => JSX.Element;
}

interface Props {
  image: StaticImageData;
  description: string;
  buttons: ButtonInfo[];
}

const InfoCard: React.FC<Props> = ({ image, description, buttons }) => {
  return (
    <StyledInfoCard>
      <Image
        width="100px"
        height="60px"
        objectFit="cover"
        layout="responsive"
        src={image}
        alt={description}
      />
      <p>{description}</p>
      <ButtonContainer>
        {buttons.map(({ Icon, link, title }, index) => (
            <Link  key={index} href={link} passHref>
              <CTAFlex white>
                {Icon && (
                    <Icon/>
                  )}
                  {title}
              </CTAFlex>
            </Link>
        ))}
      </ButtonContainer>
    </StyledInfoCard>
  );
};

export default InfoCard;

const StyledInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  flex: 1 0 0;
  margin-bottom: 5rem;

  & > p {
    font-size: 0.9rem;
    line-height: 1rem;
    color: var(--text-colour-p);
  }

  & > div > img {
    border-radius: 0.5rem;
  }

  &:hover {
    padding: 0rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 0rem;

    & > div > img {
      border-radius: 0rem;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width:100%;
  font: inherit;
  padding: 0rem;
  width: 100%;

  @media(min-width: 768px){
    padding: 0rem;
  }
`;
