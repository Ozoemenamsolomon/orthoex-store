import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';
import { ImageContainer } from './ServiceCard';

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
				<Image alt="client logo" src={image}></Image>
			</ImageContainer>
			<Text>{message}</Text>
		</TestimonialCardContainer>
	);
};

export default TestimonialCard;

const TestimonialCardContainer = styled.div`
	padding: 2rem;
	border: 1px solid var(--oex-light-grey);
	border-radius: 4px;
`;

const Text = styled.p`
	color: var(--text-colour-grey);
`;
