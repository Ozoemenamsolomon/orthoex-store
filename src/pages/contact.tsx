import React from 'react';
import { HeroComp as Hero } from '../components/Hero';
import HeroContent from '../components/HeroContent';
import { Container } from '../components/styled';

const Contact = () => {
	return (
		<>
			<Hero>
				<HeroContent
					title={"We'd love to hear from you!"}
					claim={
						'Whether you are curious about our products or excited about a career with us, or even press - We are happy to answer all your questions.'
					}
				/>
			</Hero>
			<Container>
				<h2>You can contact us through any of this means</h2>
			</Container>
			<div>contact</div>;
		</>
	);
};

export default Contact;
