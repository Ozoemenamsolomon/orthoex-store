import HeaderBG from '@assets/images/header-background.png';

import { CTALink } from '@components/CTA';
import { StyledHeading } from '@components/FeaturedEvents';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import InfoTestmonial from '@components/InfoTestimonial';
import StayTunedSection from '@components/sections/StayTunedSection';

import HelpSection from '@components/shared/HelpSection';
import InfoCardSection from '@components/shared/InfoCardSection';
import OrderBenefitsSection from '@components/shared/OrderBenefitsSection';
import ProductVerticalSection from '@components/shared/ProductVerticalSection';
import TitleInfoSection from '@components/shared/TitleInfoSection';
import {
	infoCardsData,
	productVerticalData,
	titleInfoData,
} from '@data/orthopaedicsData';
import styled from 'styled-components';

function Orthopaedics() {
	return (
		<>
			<Hero darkenBG bg={HeaderBG}>
				<HeroContent
					title={'We equip Clinicians for success'}
					claim={
						'We support and equip clinicians to be successful in their roles through access to the right prosthetic and orthotic components, tools and resources needed for their best work- enabling them to deliver the highest quality of care to their patients.'
					}
					cta={<CTALink href="/contact">Contact Us</CTALink>}
				/>
			</Hero>
			<StyledHeading padding align="left">
				Diverse solutions for your patient&apos;s unique needs
			</StyledHeading>
			<InfoCardSection data={infoCardsData} />
			<ProductVerticalSection data={productVerticalData} />
			<TitleInfoSection data={titleInfoData} />
			<OrderBenefitsSection />
			<PaddingContainer>
				<StayTunedSection />
			</PaddingContainer>
			<HelpSection />
			<InfoTestmonial />
		</>
	);
}

export default Orthopaedics;

const PaddingContainer = styled.div`
	padding: 0rem 2rem;
`;
