import calculator from '@assets/new/icons/calculate.svg';
import composite from '@assets/new/icons/composite.svg';
import creditCard from '@assets/new/icons/credit-card.svg';
import deliveryVan from '@assets/new/icons/delivery-van.svg';
import durable from '@assets/new/icons/durable.svg';
import handShake from '@assets/new/icons/handshake.svg';
import headphone from '@assets/new/icons/headphone.svg';
import highPerformanceIcon from '@assets/new/icons/high-performance.svg';
import moreArrow from '@assets/new/icons/more-arrow.svg';
import nigeria from '@assets/new/icons/nigeria.svg';
import quality from '@assets/new/icons/quality.svg';
import client1 from '@assets/new/images/client1.jpg';
import client2 from '@assets/new/images/client2.jpg';
import client3 from '@assets/new/images/client3.jpg';
import heroBG from '@assets/new/images/hero-bg.jpg';
import Categories from '@components/Categories';
import { CTA, CTALink } from '@components/Header';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import IconText from '@components/IconText';
import { helps } from '@components/sections/NeedHelpSection';
import StayTunedSection from '@components/sections/StayTunedSection';
import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import SooSection, { SOOSectionProp } from '@components/SooSection';
import {
	Container,
	PostCardsContainer,
	ServicesCards,
} from '@components/styled';
import TestimonialCard, { TestimonialProps } from '@components/TestimonialCard';
import { categories } from 'data/categories';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

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
		cta: (
			<CTALink href="#categories" white>
				View products
			</CTALink>
		),
		title: undefined,
	},
	{
		description:
			'With our safe and reliable composite solutions, you can make a wide range of stronger, lighter and tougher products',
		image: handShake,
		cta: (
			<CTALink href="/composites/categories" white>
				Shop now
			</CTALink>
		),
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

const orderBenefits: ServiceCardType[] = [
	{
		title: 'Order by 12PM',
		description: 'Shipped same day',
		image: deliveryVan,
	},
	{
		title: 'Safe payment',
		description: 'Trusted SSL protection',
		image: creditCard,
	},
	{
		title: 'Technical Advice',
		description: 'We offer helpful tips & tricks to aid your craft',
		image: headphone,
	},
];

const testimonials: TestimonialProps[] = [
	{
		image: client1,
		message:
			'Consectetur sit lacinia odio sed egestas. Habitant ornare risus donec tristique lobortis egestas amet. In aenean in ut risus pulvinar vitae erat mattis sit fusce ac quisque suspendisse.',
	},
	{
		image: client2,
		message:
			'A aliquet nibh amet nam sit morbi sagittis. Id id ipsum arcu diam massa lacus. Sit tincidunt gravida lobortis fringilla quam dis elit malesuada. Ipsum blandit mattis vitae viverra leo non.',
	},
	{
		image: client3,
		message:
			'Leo felis, sed nec ultrices. Imperdiet quis aliquam id habitasse natoque non. Bibendum pretium ornare at ullamcorper est. Eget tellus turpis tellus dui id diam pharetra. Tempus viverra.',
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
					<ServiceCard key={'expectancies_' + index} service={quality} />
				))}
			</ServicesCards>
		),
	},
	{
		id: 'categories',
		header: {
			title: 'Which of our product vertical is relevant for you?',
			subtitle:
				'Take full advantage of our expert knowledge and growing product portfolio in these dormains for your specific field of application:',
		},
		children: (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
				<Categories categories={categories} />
				<Link href="/composites/categories">
					<a
						style={{
							alignSelf: 'flex-end',
							textDecoration: 'underline',
							color: 'var(--oex-orange)',
						}}
					>
						<IconText icon={moreArrow} text="View more Categories" />
					</a>
				</Link>
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
						className="no-shadow"
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
			<ServicesCards className="smaller">
				{orderBenefits.map((benefit, index) => (
					<ServiceCard
						imagePadding
						className="white no-shadow"
						key={`e-comerce-${index}`}
						service={benefit}
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
					<ServiceCard key={'helps_' + index} service={help} />
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
				{testimonials.map((testimonial, index) => (
					<TestimonialCard testimonial={testimonial}></TestimonialCard>
				))}
			</PostCardsContainer>
		),
	},
];

const CompositePage: NextPage = () => {
	return (
		<Container bg="white" paddingMultiplier={0}>
			<Hero darkenBG bg={heroBG}>
				<HeroContent
					title="Your preferred <br/> partner of choice"
					claim="We are Nigeria's leading supplier of epoxy and polyester resins, fibre glass, carbon reinforcements, RTV silicone, polyurethane foams, and other composite materials. Our products are tailored to the needs of our customers in healthcare and manufacturing industries. We pride in satisfying our customers and helping them reach their business goals."
					cta={
						<CTALink href="#categories" className="no-animate">
							Shop now
						</CTALink>
					}
				/>
			</Hero>
			<Container>
				{sections.map((section, index) => (
					<SooSection key={`section_${index}`} {...section} />
				))}
			</Container>
		</Container>
	);
};

export default CompositePage;
