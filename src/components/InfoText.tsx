import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string,
  description: string
}

const InfoText: React.FC<Props> = ({title, description}) => {
  return (
    <InfoTextStyled>
      <h2>{title}</h2>
      <p>{description}</p>
    </InfoTextStyled>
  )
}

export default InfoText

const InfoTextStyled = styled.div`
  background-color: var(--oex-orange);
  color: white;
  padding: 2rem;
  text-align: left;  
  
  & > h2{
    font-weight: 500;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  & > p {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }


  @media (min-width: 768px) {
    text-align: center;
    padding: 4rem 22rem;

    & > p {
      padding: 0rem 6rem;
    }

    & > h2{
      font-weight: 500;
      font-size: 2rem;
    }
  }

`