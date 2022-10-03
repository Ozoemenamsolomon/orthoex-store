import { testimonials } from "pages/composites";
import React from "react";
import SooSection from "./SooSection";
import { PostCardsContainer } from "./styled";
import TestimonialCard from "./TestimonialCard";

function InfoTestimonial() {
  return (
    <SooSection
      header={{
        title: "What our clients say about us",
        subtitle:
          "There are many reasons why our partners love to work with us. Hear it from the people for yourself.",
      }}
    >
      <PostCardsContainer>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`testimonial_${index}`}
            testimonial={testimonial}
          ></TestimonialCard>
        ))}
      </PostCardsContainer>
    </SooSection>
  );
}

export default InfoTestimonial;