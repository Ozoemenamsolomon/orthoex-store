import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { CTALink } from "./Header";

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
        width="100"
        height="60"
        objectFit="cover"
        layout="responsive"
        src={image}
        alt={description}
      />
      <p>{description}</p>
      <ButtonContainer>
        {buttons.map(({ Icon, link, title }, index) => (
          <>
            {/* <Link  key={index} href={link}>
              <ButtonStyled>
                {icon && (
                  <Image
                    width="20px"
                    height="20px"
                    src={icon}
                    alt={title}
                  />
                )}
                {title}
              </ButtonStyled>
            </Link> */}
            <CTALink href={link} white>
              {Icon ? (
                <StyledButtonFlex>
                  <Icon />
                  {title}
                </StyledButtonFlex>
              ) : (
                title 
              )}
            </CTALink>
          </>
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
    & > div > img {
      border-radius: 0rem;
    }
  }
`;

const ButtonStyled = styled.button`
  color: var(--oex-orange);
  background-color: white;
  font: inherit;
  padding: 1rem;
  width: 100%;
  border-radius: 0.2rem;
  border: 0.09rem solid var(--oex-orange);
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    color: white;
    background-color: var(--oex-orange);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledButtonFlex = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
