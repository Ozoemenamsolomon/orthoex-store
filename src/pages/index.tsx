import type { NextPage } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Image from 'next/image';
import { CTA } from '../components/Header';
import React from 'react';
import SooSection from '../components/SooSection';

import { HeroComp as Hero } from '../components/Hero';
import HeroContent from '../components/HeroContent';
import Consultancy from '../assets/icons/consultancy-ion.png';
import Procurement from '../assets/icons/procurement-icon.png';
import PandO from '../assets/icons/prosthetics-icon.png';
import Composite from '../assets/icons/composite-icon.png';
import AfterSales from '../assets/icons/after-sales-support-icon.png';
import Training from '../assets/icons/training-icon.png';
import Whatsapp from '../assets/icons/whatsapp-icon.jpg';
import HeaderBG from '../assets/images/header-background.png';
import ServiceCard from '../components/ServiceCard';
import ValuesSection from '../components/ValuesSection';

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
							{services.map((service) => (
								<ServiceCard service={service} />
							))}
						</ServicesCards>
					</div>
				</SooSection>
				<ValuesSection />
				<SooSection>
					<ServicesCards className="bigger">
						<div className="wider">
							<h2>Which of our product vertical is relevant for you?</h2>
							<p>
								Take full advantage of our expert knowledge and growing product
								portfolio in these dormains for your specific field of
								application:{' '}
							</p>
						</div>

						<ServiceCard
							className="taller"
							service={{
								name: 'Do you need to speak with one of our products experts for adviceon the right choice for you? We are happy to support you, takinginto account your intended use.',
								image: Whatsapp,
							}}
							cta={<CTA>CHAT WITH US</CTA>}
						/>
						<ServiceCard
							service={{ name: 'PROSTHETICS AND ORTHOTICS', image: PandO }}
							cta={<CTA>LEARN MORE</CTA>}
						/>
						<ServiceCard
							service={{ name: 'COMPOSITES', image: Composite }}
							cta={<CTA>LEARN MORE</CTA>}
						/>
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
							.fill({
								image: {
									url: 'https://dummyimage.com/600x400/000/fff',
									alt: '',
								},
								time: 'JAN 10, 2022',
								link: '#',
								excerpt:
									'Lorem ipsum dolor sit amet consectetur adipi sicing elit. Expedita, nihil.',
							})
							.map(({ image: { url, alt }, time, excerpt, link }) => (
								<div style={{ flex: '1' }}>
									<a
										style={{
											// height: '100%',
											flexDirection: 'column',
											display: 'flex',
										}}
										href={link}
									>
										<img style={{ width: '100%' }} src={url} alt={alt} />
										<div>
											<p>{excerpt}</p>
											<span>{time}</span>
										</div>
									</a>
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
	--min-width: 120px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
	gap: 1rem;

	&.bigger {
		--min-width: 270px;
	}
	@media (min-width: 600px) {
		& > div.wider {
			grid-column: span 2;
		}
	}
`;

const PostCardsContainer = styled.div`
	@media (min-width: 600px) {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
`;
