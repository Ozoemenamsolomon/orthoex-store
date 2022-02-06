import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Image from 'next/image';
import { CTA } from '../components/Header';
import React from 'react';
import SooSection from '../components/SooSection';

import safeAndReliableIcon from '../assets/images/safe-and-reliable-icon.png';

import { HeroComp as Hero } from '../components/Hero';
import HeroContent from '../components/HeroContent';
import Cards from '../components/Cards';
import Contact from '../components/Contact';

const Home: NextPage = () => {
	return (
		<Layout>
			<Hero children={<HeroContent />} />
			<Container style={{ margin: 'auto' }}>
				<SooSection>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: '1fr 1fr',
							alignItems: 'center',
						}}
					>
						<div>
							<h2>Our commitment to quality ensures your peace of mind</h2>
							<p>
								At OrthoEx Nigeria Limited, we aim at the highest standard of
								quality in everything we do. This also includes
								providingqualityproductsand technologies that are tailored to
								the requirements of our customers in the
								healthcareandmanufacturing industries, enabling us to satisfy
								their needs and helping them reach their business goals.
							</p>
						</div>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								gap: '1rem',
							}}
						>
							<div
								style={{ aspectRatio: '.85', backgroundColor: 'greenyellow' }}
							>
								<p>Prosthetics and Orthotics</p>
							</div>
							<div
								style={{ aspectRatio: '.85', backgroundColor: 'greenyellow' }}
							>
								<p>Composites</p>
							</div>
							<div
								style={{ aspectRatio: '.85', backgroundColor: 'greenyellow' }}
							>
								<p>Consultancy</p>
							</div>
							<div
								style={{ aspectRatio: '.85', backgroundColor: 'greenyellow' }}
							>
								<p>After Sales Support.</p>
							</div>
							<div
								style={{ aspectRatio: '.85', backgroundColor: 'greenyellow' }}
							>
								<p>Trainings</p>
							</div>
							<div
								style={{ aspectRatio: '.85', backgroundColor: 'greenyellow' }}
							>
								<p>Procurement And Tendering</p>
							</div>
						</div>
					</div>
				</SooSection>
				<SooSection>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							gridTemplateRows: '.8fr .5fr 3fr 1fr 2fr 2fr 1fr',
							gap: '1rem',
							aspectRatio: '1.5',
						}}
					>
						<div
							style={{
								gridRow: '2/4',
								backgroundColor: '#00000080',
							}}
						>
							<p>
								Our customer service team is available via email, phone call and
								WhatsApp
							</p>
							<CTA>CONTACT US</CTA>
						</div>
						<div
							style={{
								gridRow: '1 / 5',
								backgroundColor: '#00000080',
							}}
						>
							<div>
								<p>We are passionate about empowering human potentials.</p>
								<CTA>JOIN US</CTA>
							</div>
						</div>
						<div
							style={{
								gridRow: '3 / 6',
								backgroundColor: '#00000080',
							}}
						>
							<h4>Our Core Values</h4>
						</div>
						<div
							style={{
								gridRow: '4 / 8',
								backgroundColor: '#00000080',
							}}
						>
							<p>We are enabling businesses like yours for success</p>
							<CTA>LEARN MORE</CTA>
						</div>
						<div
							style={{
								gridRow: '5 / 7',
								backgroundColor: '#00000080',
							}}
						>
							<p>
								Our materials are represented in hundreds of products across
								multiple markets in Nigeria
							</p>
							<CTA>VIEW PRODUCTS</CTA>
						</div>
					</div>
				</SooSection>
				<SooSection>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
							gap: '1rem',
						}}
					>
						<div
							style={{
								gridColumn: 'span 2',
							}}
						>
							<h2>Which of our product vertical is relevant for you?</h2>
							<p>
								Take full advantage of our expert knowledge and growing product
								portfolio in these dormains for your specific field of
								application:{' '}
							</p>
						</div>
						<div
							style={{
								gridRow: 'span 2',
							}}
						>
							<p>
								Do you need to speak with one of our products experts for advice
								on the right choice for you? We are happy to support you, taking
								into account your intended use.
							</p>
							<CTA>CHAT WITH US</CTA>
						</div>
						<div>
							<h5>PROSTHETICS AND ORTHOTICS</h5>
							<CTA>LEARN MORE</CTA>
						</div>
						<div>
							<h5>COMPOSITES</h5>
							<CTA>LEARN MORE</CTA>
						</div>
					</div>
				</SooSection>
				<SooSection title={'Testimonial Section'}>
					<span>TESTIMONIAL</span>
					<h2>Our Client Feedback</h2>
					<p style={{ backgroundColor: 'red' }}>
						Please provide me with the mobile version of the site so that I can
						know how to build the layout
					</p>
					<div style={{ backgroundColor: 'green', padding: '1.5rem' }}>
						<p>
							Lorem ipsum dolor sit amet. Duis vero labore augue dolor. Diam
							lorem takimata. Voluptua dolor at. Sed consetetur vel dolores.
							Delenit diam erat ut. Feugiat sea commodo. Vero dolor et takimata
							ipsum consequat. Justo elitr et sadipscing. Nonumy iriure dolor
						</p>
						<p style={{ fontWeight: 'bold' }}>Maxwell Okoro</p>
						<p>Prosthetist/orthothist</p>
					</div>
				</SooSection>
				<SooSection>
					<span>LINKEDIN</span>
					<h2>Latest Posts</h2>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
						{Array(3)
							.fill('')
							.map(() => (
								<div style={{ flex: '1' }}>
									<img
										style={{ width: '100%' }}
										src="https://dummyimage.com/600x400/000/fff"
										alt=""
									/>
									<div>
										<p>
											Lorem ipsum dolor sit amet consectetur adipi sicing elit.
											Expedita, nihil.
										</p>
										<span>JAN 10, 2022</span>
									</div>
								</div>
							))}
					</div>
				</SooSection>
			</Container>
		</Layout>
	);
};

export default Home;

export const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	padding: 0 2rem;
	@media (max-width: 600px) {
		& {
			padding: 0 1rem;
		}
	}
`;
