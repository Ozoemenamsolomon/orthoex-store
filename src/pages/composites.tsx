import type { NextPage } from 'next';
import React from 'react';
import calculator from '../assets/images/Calculator-icon_ImgID1.png';
import heroBG from '../assets/images/composite-hero-background.jpg';
import composite from '../assets/images/composite-material-icon_ImgID1.png';
import durable from '../assets/images/durable-icon_ImgID1.png';
import quality from '../assets/images/high-quality-icon_ImgID1.png';
import nigeria from '../assets/images/map-icon_ImgID1.png';
import newLevel from '../assets/images/new-level-icon_ImgID1.png';
import safeReliable from '../assets/images/safe-and-reliable-icon_ImgID1.png';
import { CTA } from '../components/Header';
import { HeroComp as Hero } from '../components/Hero';
import HeroContent from '../components/HeroContent';
import ServiceCard, { ServiceCardType } from '../components/ServiceCard';
import SooSection from '../components/SooSection';
import {
	Container,
	PostCardsContainer,
	ServicesCards,
} from '../components/styled';
import TestimonialSection from '../components/TestimonialSection';
import StayTunedSection from '../components/sections/StayTunedSection';
import NeedHelpSection from '../components/sections/NeedHelpSection';

const qualities: ServiceCardType[] = [
	{
		description: 'We offer the right composite material for your projects',
		image: composite,
	},
	{
		description: 'High quality products to keep you satisfied',
		image: quality,
	},
	{
		description:
			'Durable and abrasion resistant resins to keep you competitive',
		image: durable,
	},
	{
		description:
			'Our materials are represented in hundreds of products across multiple markets in Nigeria.',
		image: nigeria,
	},
];

const expectancies: ServiceCardType[] = [
	{
		description:
			'We are committed to delivering superior composite materials that you can trust for your craft. Take advantage of our high quality products.',
		image: newLevel,
		title: 'Experience a new level of performance',
		cta: <CTA>LEARN MORE</CTA>,
	},
	{
		description:
			'With our safe and reliable composite solutions, you can make a wide range of stronger,lighter and tougher products',
		image: safeReliable,
		title: 'Safe and reliable',
		cta: <CTA>LEARN MORE</CTA>,
	},
	{
		description:
			'Use our resin calculator to estimate the amount of epoxy resin you will need for your projects',
		image: calculator,
		title: 'How much epoxy do I need?',
		cta: <CTA>TRY IT</CTA>,
	},
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
	return (
		<>
			<Hero bg={heroBG}>
				<HeroContent
					title={'We are your preferred <br/> partner of choice for quality!'}
					claim={
						"OEX Composite is Nigeria's leading supplier of epoxy and polyester resins fibre glass, carbon reinforcements, RTV silicone, polyurethane foams, and other composite materials. Our products are tailored to the needs of our customers in healthcare and manufacturing industries. We pride in satisfying our customers and helping them reach their business goals."
					}
					cta={<CTA>Contact us</CTA>}
				/>
			</Hero>
			<Container>
				<SooSection twoColumns>
					<h2>
						We empower your creativity with quality products and expert advise
					</h2>
					<ServicesCards minWidth="200px">
						{qualities.map((quality) => (
							<ServiceCard
								className="no-animate"
								imagePadding
								service={quality}
							/>
						))}
					</ServicesCards>
				</SooSection>
				<SooSection>
					<ServicesCards className="bigger">
						{expectancies.map((quality) => (
							<ServiceCard className="rounded no-animate" service={quality} />
						))}
					</ServicesCards>
				</SooSection>
				<SooSection
					header={{ first: 'SHOP', second: 'Our products' }}
					style={{
						backgroundColor: 'var(--oex-gray)',
						display: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
						gap: '1em',
						paddingBlock: '2rem',
						margin: 'auto',
					}}
				>
					<p>Polyester Resin</p>
					<p>Epoxy Resin</p>
					<p>Fibre Glass</p>
					<p>Carbon Fibre</p>
					<p>Polyurethane Foams</p>
					<p>RTV Silicone</p>
					<p>Pigments</p>
					<p>Accelerator</p>
					<p>Hardner</p>
				</SooSection>
				<SooSection header={{ first: 'FEATURED', second: 'Articles' }}>
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
				<TestimonialSection
					testimony={
						'Lorem ipsum dolor sit amet. Duis vero labore augue dolor. Diam lorem takimata. Voluptua dolor at. Sed consetetur vel dolores. Delenit diam erat ut. Feugiat sea commodo. Vero dolor et takimata ipsum consequat. Justo elitr et sadipscing. Nonumy iriure dolor'
					}
					by={'Maxwell Okoro'}
					title={'Prosthetist / orthothist'}
				/>
				<StayTunedSection />
				<NeedHelpSection />

				<SooSection header={{ first: 'FEATURED', second: 'Articles' }}>
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
		</>
	);
};

export default Home;
