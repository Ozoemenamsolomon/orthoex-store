import { testimonials } from "pages/composites";
import React from "react";
import styled from "styled-components";
import TestimonialCard from "./TestimonialCard";

function InfoTestimonial() {
  return (
    <InfoContainerStyled>
      <h2>What our clients say about us</h2>
      <p>
        There are many reasons why our partners love to work with us. Hear it
        from the people for yourself
      </p>
      <TestimonialCardStyled>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`testimonial_${index}`}
            testimonial={testimonial}
          ></TestimonialCard>
        ))}
      </TestimonialCardStyled>
    </InfoContainerStyled>
  );
}

export default InfoTestimonial;

const InfoContainerStyled = styled.div`
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

const TestimonialCardStyled = styled.div`
  display: flex;
  gap: 2rem;
  margin: 4rem 0;


  @media(max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;

    & > h2 {
      font-size: 2rem;
    }
  }
  

`;
