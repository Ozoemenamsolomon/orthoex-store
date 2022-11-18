import React, { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ImageContainer } from "./ServiceCard";

export type TestimonialProps = {
	image: StaticImageData;
	message: string;
};

type TestimonialCardProps = { testimonial: TestimonialProps };

const TestimonialCard: FC<TestimonialCardProps> = ({
	testimonial: { image, message },
}) => {
	return (
		<TestimonialCardContainer>
			<ImageContainer>
				<Image src={image}></Image>
			</ImageContainer>
			<p>{message}</p>
		</TestimonialCardContainer>
	);
};

export default TestimonialCard;

const TestimonialCardContainer = styled.div`
	padding: 2rem;
	border: 1px solid var(--oex-light-grey);
	border-radius: 4px;
`;
