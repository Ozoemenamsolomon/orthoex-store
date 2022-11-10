import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link"

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
          <>
            <Link  key={index} href={link} passHref>
              <StyledButton>
                {Icon && (
                  <Icon/>
                )}
                {title}
              </StyledButton>
            </Link>
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
    margin-bottom: 0rem;

    & > div > img {
      border-radius: 0rem;
    }
  }
`;

export const StyledButton = styled.button`
  color: var(--oex-orange);
  background-color: white;
  font: inherit;
  padding: 1rem;
  width: 100%;
  border-radius: 0.2rem;
  border: 0.09rem solid var(--oex-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    color: white;
    background-color: var(--oex-orange);
  }

  @media(min-width: 768px){
    gap: 2rem;
  }

`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width:100%;

  @media(min-width: 768px){
    gap: 2rem;
  }
`;
