import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Image from 'next/image';
import { CTA } from '../components/Header';
import React from 'react';
import SooSection from '../components/SooSection';

import { HeroComp as Hero } from '../components/Hero';
import HeroContent from '../components/HeroContent';
import Consultancy from '../assets/icons/consultancy ion.png';
import Procurement from '../assets/icons/procurement icon.png';
import PandO from '../assets/icons/prosthetics icon.png';
import Composite from '../assets/icons/composite icon.png';
import AfterSales from '../assets/icons/after sales support icon.png';
import Training from '../assets/icons/training icon.png';
import HeaderBG from '../assets/images/header-background.png';
import Link from 'next/link';

const services: {
	name: string;
	image: StaticImageData;
}[] = [
	{ name: 'Prosthetics and Orthotics', image: PandO },
	{ name: 'Composites', image: Composite },
	{ name: 'Consultancy', image: Consultancy },
	{ name: 'After Sales Support.', image: AfterSales },
	{ name: 'Trainings', image: Training },
	{ name: 'Procurement And Tendering', image: Procurement },
];

const Home: NextPage = () => {
	return (
		<Layout>
			<Hero bg={HeaderBG} children={<HeroContent />} />
			<Container style={{ margin: 'auto' }}>
				<SooSection>
					<div
						style={{
							display: 'grid',
							gap: '2rem',
							gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
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
						<ServicesCards>
							{services.map(({ name, image }) => (
								<ServiceCardContainer>
									<ServiceCardImage>
										<Link href="/">
											<a>
												<Image objectFit="contain" layout="fill" src={image} />
											</a>
										</Link>
									</ServiceCardImage>
									<p>{name}</p>
								</ServiceCardContainer>
							))}
						</ServicesCards>
					</div>
				</SooSection>
				<SooSection>
					<ValueCardsContainer>
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
					</ValueCardsContainer>
				</SooSection>
				<SooSection>
					<ServicesCards>
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
					</ServicesCards>
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
					<PostCardsContainer>
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
					</PostCardsContainer>
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

const ServicesCards = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	gap: 1rem;
	/* > div {
		aspect-ratio: 0.85;
	} */
`;

const ServiceCardContainer = styled.div`
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	text-align: center;
	position: relative;
	transition: all 0.2s ease-out;
	&::after {
		height: 0%;
		transition: all 0.2s ease-out;
		content: '';
		position: absolute;
		width: 100%;
		background-color: var(--oex-orange);
		z-index: 1;
		bottom: 0;
		left: 0;
	}
	&:hover::after {
		height: 7%;
	}
	&:hover {
		box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
	}
	p {
		margin-bottom: 0;
	}
`;
const ServiceCardImage = styled.div`
	position: relative;
	aspect-ratio: 1.5;
`;

const PostCardsContainer = styled.div`
	@media (min-width: 600px) {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
`;
const ValueCardsContainer = styled.div`
	gap: 1rem;
	aspect-ratio: 1.5;
	display: flex;
	flex-direction: column;
	@media (min-width: 900px) {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 0.8fr 0.5fr 3fr 1fr 2fr 2fr 1fr;
	}
`;
