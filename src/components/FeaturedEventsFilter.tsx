import React from 'react'
import styled from 'styled-components';
import CTA from './CTA';


const FeaturedEventsFilter: React.FC = () => {
  return (
    <FilterWrapper>
      <FilterInputs>
        <input placeholder='Date' type="date" name="" id="" />
        <input type="text" />
      </FilterInputs>
      <CTA className='no-animate filter-btn'>Filter</CTA>
    </FilterWrapper>
  )
}

export default FeaturedEventsFilter


const FilterWrapper = styled.div`
  width: 40rem;
  margin: 2rem auto;
  display: flex;

  & .filter-btn {
    font-size: 1rem;
    padding: 0.8rem 2rem;
  }

`;
const FilterInputs = styled.div`
  min-width: 30rem;
  background-color: white;
`;