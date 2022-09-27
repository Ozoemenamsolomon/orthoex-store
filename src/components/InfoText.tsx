import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string,
  description: string
}

function InfoText({title, description}: Props) {
  return (
    <InfoTextStyled>
      <h2>{title}</h2>
      <p>{description}</p>
    </InfoTextStyled>
  )
}

export default InfoText

const InfoTextStyled = styled.div`
  text-align: center;
  background-color: var(--oex-orange);
  color: white;
  padding: 9rem;

  & > h2{
    font-weight: bold;
    font-size: 3rem;
  }
  
  @media(max-width:768px) {
  padding: 3rem;
  text-align: left;

  & > h2{
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  }
`