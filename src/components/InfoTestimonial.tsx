import React from "react";
import client1 from '@assets/new/images/client1.jpg';
import client2 from '@assets/new/images/client2.jpg';
import client3 from '@assets/new/images/client3.jpg';
import SooSection from "./SooSection";
import { PostCardsContainer } from "./styled";
import TestimonialCard, { TestimonialProps } from "./TestimonialCard";

export const testimonials: TestimonialProps[] = [
	{
		image: client1,
		message:
			'Consectetur sit lacinia odio sed egestas. Habitant ornare risus donec tristique lobortis egestas amet. In aenean in ut risus pulvinar vitae erat mattis sit fusce ac quisque suspendisse.',
	},
	{
		image: client2,
		message:
			'A aliquet nibh amet nam sit morbi sagittis. Id id ipsum arcu diam massa lacus. Sit tincidunt gravida lobortis fringilla quam dis elit malesuada. Ipsum blandit mattis vitae viverra leo non.',
	},
	{
		image: client3,
		message:
			'Leo felis, sed nec ultrices. Imperdiet quis aliquam id habitasse natoque non. Bibendum pretium ornare at ullamcorper est. Eget tellus turpis tellus dui id diam pharetra. Tempus viverra.',
	},
];


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