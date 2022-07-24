import type { NextPage } from 'next';
import React from 'react';
import heroBG from '../assets/images/composite-hero-background.jpg';
import { CTA } from '../components/Header';
import { HeroComp as Hero } from '../components/Hero';
import HeroContent from '../components/HeroContent';
import ServiceCard, { ServiceCardType } from '../components/ServiceCard';
import SooSection, { SOOSectionProp } from '../components/SooSection';
import {
	Container,
	PostCardsContainer,
	ServicesCards,
} from '../components/styled';
import calculator from '../assets/new/icons/calculate.svg';
import composite from '../assets/new/icons/composite.svg';
import deliveryVan from '../assets/new/icons/delivery-van.svg';
import creditCard from '../assets/new/icons/credit-card.svg';
import headphone from '../assets/new/icons/headphone.svg';
import durable from '../assets/new/icons/durable.svg';
import handShake from '../assets/new/icons/handshake.svg';
import highPerformanceIcon from '../assets/new/icons/high-performance.svg';
import nigeria from '../assets/new/icons/nigeria.svg';
import quality from '../assets/new/icons/quality.svg';
import product1 from '../assets/new/images/product1.jpg';
import { helps } from '../components/sections/NeedHelpSection';
import StayTunedSection from '../components/sections/StayTunedSection';
import CategoryCard, { CategoryProps } from '../components/CategoryCard';

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
			'We are committed to delivering superior composite materials that you can trust for your craft. Take advantage of our high quality products',
		image: highPerformanceIcon,
		cta: <CTA white>View products</CTA>,
		title: undefined,
	},
	{
		description:
			'With our safe and reliable composite solutions, you can make a wide range of stronger, lighter and tougher products',
		image: handShake,
		cta: <CTA white>Shop now</CTA>,
		title: undefined,
	},
	{
		description:
			'Use our resin calculator to estimate the amount of epoxy resin you will need for your projects.',
		image: calculator,
		cta: <CTA white>Calculate your resin</CTA>,
		title: undefined,
	},
];

const categories: CategoryProps[] = [
	{
		title: 'Polyester Resin & Components',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Epoxy Resin & Components',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Silicone & Polyurethane Rubber',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Fabric & Prepreg Reinforcements',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Gelcoats',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Expanding Foams',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Colour Pigments',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Sealants & Adhesives',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Tools, Machines & Supplies',
		slug: 'composite',
		image: product1,
	},
	{
		title: 'Mould Release Agents',
		slug: 'composite',
		image: product1,
	},
];

const sections: (SOOSectionProp & { children: React.ReactNode })[] = [
	{
		header: {
			title:
				'Experience a new level of performance with our safe and reliable products',
		},
		children: (
			<ServicesCards>
				{expectancies.map((quality, index) => (
					<ServiceCard
						key={'expectancies_' + index}
						className="no-animate"
						service={quality}
					/>
				))}
			</ServicesCards>
		),
	},
	{
		header: {
			title: 'Which of our product vertical is relevant for you?',
			subtitle:
				'Take full advantage of our expert knowledge and growing product portfolio in these dormains for your specific field of application:',
		},
		children: (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
					gap: '1rem',
				}}
			>
				{categories.map((category, index) => (
					<CategoryCard category={category} key={`category_${index}`} />
				))}
			</div>
		),
	},
	{
		header: {
			title:
				'We empower your creativity with quality products and expert advise',
		},
		children: (
			<ServicesCards minWidth="200px">
				{qualities.map((quality, index) => (
					<ServiceCard
						key={'qualities_' + index}
						className="no-animate"
						service={quality}
					/>
				))}
			</ServicesCards>
		),
	},
	{
		style: {
			backgroundColor: 'var(--oex-orange)',
			paddingBlock: '5rem',
		},
		children: (
			<ServicesCards>
				{Array(3)
					.fill(0)
					.map((_, index) => (
						<ServiceCard
							imagePadding
							className="no-animate white"
							key={`e-comerce-${index}`}
							service={{
								description: 'Shipped same day',
								image:
									index === 1
										? creditCard
										: index === 2
										? headphone
										: deliveryVan,
								title: 'Order by 12PM',
							}}
						/>
					))}
			</ServicesCards>
		),
	},
	{
		children: <StayTunedSection />,
	},
	{
		header: { title: 'Do you Need help?' },
		children: (
			<ServicesCards>
				{helps.map((help, index) => (
					<ServiceCard
						key={'helps_' + index}
						className="no-animate"
						service={help}
					/>
				))}
			</ServicesCards>
		),
	},
	{
		header: {
			title: 'What people say about us',
			subtitle:
				'There are many reasons why our partners love to work with us. Hear it from the people for yourself',
		},
		children: (
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
					.map(({ image: { url, alt }, time, excerpt, link }, index) => (
						<div key={'posts_' + index} style={{ flex: '1' }}>
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
		),
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

const CompositePage: NextPage = () => {
	return (
		<>
			<Container bg="white" paddingMultiplier={0}>
				<Hero bg={heroBG}>
					<HeroContent
						title={'Your preferred <br/> partner of choice'}
						claim={
							"We are Nigeria's leading supplier of epoxy and polyester resins, fibre glass, carbon reinforcements, RTV silicone, polyurethane foams, and other composite materials. Our products are tailored to the needs of our customers in healthcare and manufacturing industries. We pride in satisfying our customers and helping them reach their business goals."
						}
						cta={<CTA>Shop now</CTA>}
					/>
				</Hero>
				<Container>
					{sections.map((section, index) => (
						<SooSection key={index} {...section} />
					))}
				</Container>
			</Container>
		</>
	);
};

export default CompositePage;
