import type { NextPage } from 'next';
import React from 'react';
import HeaderBG from '@assets/images/header-background.png';
import { CTA } from '@components/Header';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import {
	Container, 
} from '@components/styled';
import ServiceStandard from '@components/ServiceStandard';
import InfoSection from '@components/InfoSection';
import InfoText from '@components/InfoText';
import InfoTestmonial from '@components/InfoTestimonial';
import ProductVertical from '@components/ProductVertical';



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

				<ServiceStandard/>
				<InfoSection/>
				<ProductVertical/>
				<InfoText title={"At OrthoEx, we enable businesses like yours to succeed"} description={"We are facilitating Prosthetics, Orthopaedic devices and composite materials distribution in West Africa."} />
				<InfoTestmonial />

		</Container>
	);
};

export default Home;

