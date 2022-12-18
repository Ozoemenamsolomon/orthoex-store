import React from 'react'
import styled from 'styled-components';

const Address = () => {
  return (
    <StyledAdressDiv>
      <h4>Orthoex Nigeria Limited</h4>
      <p>10 Ipakodo Wharf Road, Ebute</p>
      <p>Ikorodu, Lagos State, Nigeria</p>
    </StyledAdressDiv>
  )
}

export default Address

const StyledAdressDiv = styled.span`
  margin: 1rem 0;

  & > h4 {
    margin-bottom: 0.2rem;
    font-size: 1rem;
    font-weight: 500;

  }

  & > p {
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.2rem;
    letter-spacing: 0.03rem;
    text-align: left;
    color: var(--text-colour-grey);
    margin: 0;
  }

`