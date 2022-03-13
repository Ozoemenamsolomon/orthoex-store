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
import ServiceCard, { ServiceCardType } from '../components/ServiceCard';
import ValuesSection from '../components/ValuesSection';
import QuotationMark from '../assets/icons/quotation-mark.svg';
import { ServicesCards } from '../components/styled';

const services: ServiceCardType[] = [
	{ description: 'Prosthetics and Orthotics', image: PandO },
	{ description: 'Composites', image: Composite },
	{ description: 'Consultancy', image: Consultancy },
	{ description: 'After Sales Support.', image: AfterSales },
	{ description: 'Trainings', image: Training },
	{ description: 'Procurement And Tendering', image: Procurement },
];

type PostType = {
	image: {
		url: string;
		alt: string;
	};
	time: string;
	link: string;
	excerpt: string;
};

const Home: NextPage = () => {
	const findRep = () => {};
	return (
		<Layout>
			<Hero bg={HeaderBG}>
				<HeroContent
					title={'Your preferred<br />partner of choice'}
					claim={
						'We are facilitating Prosthetics, Orthopaedic devices and composite materials distribution in West Africa. <br /> <br /> Speak with an account manager in your region'
					}
					cta={<CTA onClick={findRep}>Find a representative</CTA>}
				/>
			</Hero>
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
								quality in everything we do. This also includes providing
								quality products and technologies that are tailored to the
								requirements of our customers in the health care and
								manufacturing industries, enabling us to satisfy their needs and
								helping them reach their business goals.
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
							className="taller shrink-start last"
							service={{
								description:
									'Do you need to speak with one of our products experts for advice on the right choice for you? We are happy to support you, taking into account your intended use.',
								image: Whatsapp,
								cta: <CTA>CHAT WITH US</CTA>,
							}}
						/>
						<ServiceCard
							service={{
								description: 'PROSTHETICS AND ORTHOTICS',
								image: PandO,
								cta: <CTA>LEARN MORE</CTA>,
							}}
						/>
						<ServiceCard
							service={{
								description: 'COMPOSITES',
								image: Composite,
								cta: <CTA>LEARN MORE</CTA>,
							}}
						/>
					</ServicesCards>
				</SooSection>
				<Hero colour="black" col center>
					<span style={{ color: 'var(--oex-orange)', fontWeight: 'bold' }}>
						TESTIMONIAL
					</span>
					<h2 style={{ margin: 0, textAlign: 'center' }}>
						Our Client Feedback
					</h2>

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
						<p>
							Lorem ipsum dolor sit amet. Duis vero labore augue dolor. Diam
							lorem takimata. Voluptua dolor at. Sed consetetur vel dolores.
							Delenit diam erat ut. Feugiat sea commodo. Vero dolor et takimata
							ipsum consequat. Justo elitr et sadipscing. Nonumy iriure dolor
						</p>
						<span style={{ fontWeight: 'bold' }}>Maxwell Okoro</span>
						<p>
							Prosthetist/
							<wbr />
							orthothist
						</p>
					</TestimonialContainer>
				</Hero>
				<SooSection>
					<span>LINKEDIN</span>
					<h2>Latest Posts</h2>
					<PostCardsContainer>
						{Array<PostType>(3)
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

const PostCardsContainer = styled.div`
	@media (min-width: 600px) {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
`;
