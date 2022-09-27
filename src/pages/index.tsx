import type { NextPage } from 'next';
import React from 'react';
import HeaderBG from '@assets/images/header-background.png';
import { CTA } from '@components/Header';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import SooSection from '@components/SooSection';
import {
	Container,
	PostCardsContainer
} from '@components/styled';
import TestimonialSection from '@components/TestimonialSection';
import ServiceStandard from '@components/ServiceStandard';
import InfoSection from '@components/InfoSection';


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
		<Container bg="white" paddingMultiplier={0}>
			<Hero bg={HeaderBG}>
				<HeroContent
					title={'Your preferred<br />partner of choice'}
					claim={
						'We are facilitating Prosthetics, Orthopaedic devices and composite materials distribution in West Africa. <br /> <br /> Speak with an account manager in your region'
					}
					cta={<CTA onClick={findRep}>Find a representative</CTA>}
				/>
			</Hero>
			<Container paddingMultiplier={0}>
				<ServiceStandard/>
				<InfoSection/>

				<TestimonialSection
					testimony={
						'Lorem ipsum dolor sit amet. Duis vero labore augue dolor. Diam lorem takimata. Voluptua dolor at. Sed consetetur vel dolores. Delenit diam erat ut. Feugiat sea commodo. Vero dolor et takimata ipsum consequat. Justo elitr et sadipscing. Nonumy iriure dolor'
					}
					by={'Maxwell Okoro'}
					title={'Prosthetist / orthothist'}
				/>

				<SooSection header={{ title: 'LINKEDIN', subtitle: 'Latest Posts' }}>
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
								<div key={`post-${excerpt}-${index}`} style={{ flex: '1' }}>
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
		</Container>
	);
};

export default Home;
