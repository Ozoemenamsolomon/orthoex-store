import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styled from 'styled-components';

type CardType = {
  image: StaticImageData,
  title: string,
  link: string
}

export type ProductVerticalSectionType =  {
  title: string;
  description: string;
  cards: CardType[]
}

type ServiceCardProps = {
  data: ProductVerticalSectionType
}

const ProductVerticalSection: React.FC<ServiceCardProps> = ({data}) => {
  return (
    <ProductVerticalWrapper>
      <Title>{data.title}</Title>
      <Description>{data.description}</Description>

      <CardsContainer>
        {data.cards.map((card, index) => (
            <Card key={`cards-${index}`}>
              <ImageContainer>
                <Image object-fit="contain" fill src={card.image} alt="product card image" />
              </ImageContainer>
              <Text>{card.title}</Text>
            </Card>
        ))}
      </CardsContainer>

    </ProductVerticalWrapper>
  )
}

export default ProductVerticalSection


const ProductVerticalWrapper = styled.div`
  background-color: var(--oex-off-white);
  padding: 3rem 2rem;

  @media ${({ theme }) => theme.breakpoints.above.md} {
    padding: 3rem 2rem;
	}
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 500;
  


@media ${({ theme }) => theme.breakpoints.above.md} {
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
  max-width: 70%;
  margin: 1rem auto;
}
`;


const Description = styled.div`
  color: var(--text-colour-grey);

  @media ${({ theme }) => theme.breakpoints.above.md} {
    text-align: center;
    max-width: 50%;
    margin: 1rem auto;
  }

`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  overflow-x: scroll;
  grid-gap: 0.8rem;
  // grid-column-gap: 0.8rem;
  // grid-row-gap: 0.8rem;
  max-width: 1122px;
  margin: 2rem auto 0rem;



  @media ${({ theme }) => theme.breakpoints.above.lg} {
    overflow-x: unset;
	}
`;

const Card = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 0.7rem;
  width: 150px;
  // orange color effect
  height: 100%;
	position: relative;
	// overflow: hidden;

  &::before {
    background-color: rgba(239, 191, 129, 0.1);
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    opacity: 0;
    border: 1px solid var(--oex-orange);
    border-radius: 0.7rem;

  }
  
  &:hover {
    cursor: pointer;

    &::before {
			opacity: 1;
		}
  }


  @media ${({ theme }) => theme.breakpoints.above.md} {
    width: 180px;
	}

  @media ${({ theme }) => theme.breakpoints.above.lg} {
    width: 215px;
	}
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;

`;

const Text = styled.p`
  text-align: center;
  margin: 1rem 0rem 0rem;
  font-size: 0.8rem;

  @media ${({ theme }) => theme.breakpoints.above.md} {
    font-size: 1.1rem;
    margin-top: 1rem;
	}
`;



