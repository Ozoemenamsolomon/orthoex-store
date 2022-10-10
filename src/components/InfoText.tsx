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
  padding: 3rem;
  text-align: left;  
  
  & > h2{
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 1rem;
  }


  @media (min-width: 768px) {
    text-align: center;
    padding: 9rem;
  }
  & > h2{
    font-weight: bold;
    font-size: 3rem;
  }

`