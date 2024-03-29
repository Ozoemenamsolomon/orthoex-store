import Briefcase from '@assets/new/icons/home/briefcase.svg';
import Enzymes from '@assets/new/icons/home/enzyme.svg';
import Operator from '@assets/new/icons/home/operator.svg';
import Prosthetics from '@assets/new/icons/home/prosthetics.svg';
import ShoppingCart from '@assets/new/icons/home/shopping-cart.svg';
import Training from '@assets/new/icons/home/training.svg';
import HeaderBG from '@assets/new/images/header-background.png';
import { CTALink } from '@components/CTA';
import CallButton from '@components/CallButton';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import InfoSection from '@components/InfoSection';
import InfoTestmonial from '@components/InfoTestimonial';
import InfoText from '@components/InfoText';
import ProductVertical from '@components/ProductVertical';
import ServiceStandard from '@components/ServiceStandard';
import { Container } from '@components/styled';
import type { NextPage } from 'next';

const serviceStandardData = {
	heading: 'Our commitment to quality ensures your peace of mind',
	paragraph:
		'At OrthoEx Nigeria Limited, we aim at the highest standard of quality in everything we do. This also includes providing quality products and technologies that are tailored to the requirements of our customers in the health care and manufacturing industries, enabling us to satisfy their needs and helping them reach their business goals.',
	servicesIcon: [
		{ description: 'Prosthetics', image: Prosthetics },
		{ description: 'Composites', image: Enzymes },
		{ description: 'Training', image: Training },
		{ description: 'After Sales', image: Operator },
		{ description: 'Consultancy', image: Briefcase },
		{ description: 'Procurement', image: ShoppingCart },
	],
};

const Home: NextPage = () => {
	return (
		<>
			<Hero darkenBG bg={HeaderBG}>
				<HeroContent
					title={'Your preferred<br />partner of choice'}
					claim={
						'We are facilitating prosthetics, orthopaedic devices and composite materials distribution in West Africa. <br /> <br /> Speak with an account manager in your region'
					}
					cta={<CTALink href="/contact">Find Us</CTALink>}
				/>
			</Hero>
			<Container bg="white" paddingMultiplier={0}>
				<ServiceStandard data={serviceStandardData} />
				<InfoSection />
				<ProductVertical />
			</Container>
			<InfoText
				title={'At OrthoEx, we enable businesses like yours to succeed'}
				description={
					'We collaborate with our clients every day, delivering solutions and technologies to help them adapt to changing market conditions and stay ahead of the competition.'
				}
			/>

			<InfoTestmonial />
			<CallButton />
		</>
	);
};

export default Home;
