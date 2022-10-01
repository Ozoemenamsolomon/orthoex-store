import { testimonials } from "pages/composites";
import React from "react";
import styled from "styled-components";
import TestimonialCard from "./TestimonialCard";

function InfoTestimonial() {
  return (
    <StyledInfoContainer>
      <h2>What our clients say about us</h2>
      <p>
        There are many reasons why our partners love to work with us. Hear it
        from the people for yourself
      </p>
      <StyledTestimonialCard>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`testimonial_${index}`}
            testimonial={testimonial}
          ></TestimonialCard>
        ))}
      </StyledTestimonialCard>
    </StyledInfoContainer>
  );
}

export default InfoTestimonial;

const StyledInfoContainer = styled.div`
  margin: 0rem 0;
  padding: 2rem;

  & > p {
    color: var(--text-colour-p);
  }

  & > h2 {
    font-size: 3rem;
  }

  @media(min-width:768px){
    & > p, h2 {
      text-align: center;
    }
  }

`;

const StyledTestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 4rem 0;

  & > h2 {
    font-size: 2rem;
  }

  @media(min-width:768px){
    flex-direction: row;
  }

`;
