import React, { FC } from 'react';
import { SectionHeader } from './SooSection';
import { HeroComp as Hero } from './Hero';
import Image from 'next/image';
import styled from 'styled-components';
import QuotationMark from '../assets/icons/quotation-mark.svg';
import TestimonialBG from '../assets/images/testimonial-bg-2.jpg';

const TestimonialSection: FC<{
	testimony: string;
	by: string;
	title: string;
}> = ({ testimony, by, title }) => {
	return (
		<Hero morePadding bg={TestimonialBG} colour="black" col center>
			<SectionHeader first="TESTIMONIAL" second="Our Client Feedback" />

			<TestimonialContainer>
				<div
					style={{
						position: 'absolute',
						width: '4rem',
						aspectRatio: '1 / 1',
						top: '-3rem',
						transform: 'translateX(-50%)',
						left: '50%',
						margin: 'auto',
					}}
				>
					<Image layout="fill" src={QuotationMark} />
				</div>
				<p>{testimony}</p>
				<span style={{ fontWeight: 'bold' }}>{by}</span>
				<p>{title}</p>
			</TestimonialContainer>
		</Hero>
	);
};

export default TestimonialSection;

const TestimonialContainer = styled.div`
	background-color: white;
	padding: 1.5rem;
	width: 70%;
	max-width: 25rem;
	border-radius: 2em;
	box-shadow: rgba(0, 0, 0, 0.17) 1px 6px 8px;
	text-align: center;
	position: relative;
	margin-top: 3.5rem;
`;
