import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
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
import helpIcon from '../assets/images/help-icon_ImgID1.png';
import chatIcon from '../assets/images/chat-icon_ImgID1.png';
import phoneIcon from '../assets/images/phone-icon_ImgID1.png';

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

const helps: ServiceCardType[] = [
	{
		description:
			'Talk To A Customer Care Representative \n\n Mon-Fri: 9:00am-5:00pm',
		image: phoneIcon,
		cta: <CTA>DIAL NO.</CTA>,
	},
	{
		description: 'Chat with a Product expert',
		image: chatIcon,
		cta: <CTA>LIVE CHAT</CTA>,
	},
	{
		description:
			'Find a list of answers to the mostPopular questions that are asked',
		image: helpIcon,
		cta: <CTA>ONLINE HELP</CTA>,
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
			<Container style={{ margin: 'auto' }}>
				<QualitiesSection>
					<h2>
						We empower your creativity with quality productsand expert advise
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
				</QualitiesSection>
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
				<SooSection
					style={{ display: 'flex', columnGap: '6rem', flexWrap: 'wrap' }}
				>
					<div style={{ flex: '1', minWidth: '200px' }}>
						<h2>Stay tuned!</h2>
						<p>
							Sign up to be the first to know about new products, workshops and
							special offers
						</p>
					</div>

					<SubscribeForm>
						<input type="tel" placeholder="Your Whatsapp Number" />
						<input type="email" placeholder="Your email" />
						<CTA type="submit">Subscribe</CTA>
					</SubscribeForm>
				</SooSection>

				<SooSection>
					<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
						<h2>Do you Need help?</h2>
						<p>
							We have several resources available to help you with our products
						</p>
					</div>

					<ServicesCards className="bigger">
						{helps.map((quality) => (
							<ServiceCard className="no-animate" service={quality} />
						))}
					</ServicesCards>
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
			</Container>
		</>
	);
};

export default Home;

const QualitiesSection = styled.section`
	margin: 5rem 0;
	@media (min-width: 900px) {
		display: flex;
		align-items: center;
		gap: 2rem;
		& > * {
			flex: 1;
		}
	}
`;

const SubscribeForm = styled.form`
	display: flex;
	gap: 1rem;
	flex: 1;
	flex-direction: column;
	max-width: 350px;

	input {
		padding: 0.51rem;
	}
`;
