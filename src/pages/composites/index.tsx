import heroBG from '@assets/new/images/hero-bg.jpg';
import { CTALink } from '@components/CTA';
import CallButton from '@components/CallButton';
import { StyledHeading } from '@components/FeaturedEvents';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import InfoTestimonial from '@components/InfoTestimonial';
import StayTunedSection from '@components/sections/StayTunedSection';
import HelpSection from '@components/shared/HelpSection';
import InfoCardSection from '@components/shared/InfoCardSection';
import OrderBenefitsSection from '@components/shared/OrderBenefitsSection';
import ProductVerticalSection, {
	ProductVerticalSectionType,
} from '@components/shared/ProductVerticalSection';
import TitleInfoSection from '@components/shared/TitleInfoSection';
import { getCategories } from '@data/categories';
import { infoCardsData, titleInfoData } from '@data/compositeData';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

const Composite: NextPage<{
	productVerticalData: ProductVerticalSectionType;
}> = ({ productVerticalData }) => {
	return (
		<>
			<Hero darkenBG bg={heroBG}>
				<HeroContent
					title="Your preferred <br/> partner of choice"
					claim="We are Nigeria's leading supplier of epoxy and polyester resins, fibre glass, carbon reinforcements, RTV silicone, polyurethane foams, and other composite materials. Our products are tailored to the needs of our customers in healthcare and manufacturing industries. We pride in satisfying our customers and helping them reach their business goals."
					cta={
						<CTALink href="/contact" className="no-animate">
							Contact Us
						</CTALink>
					}
				/>
			</Hero>
			<StyledHeading padding align="left">
				Experience a new level of performance with our safe and reliable
				products
			</StyledHeading>
			<InfoCardSection data={infoCardsData} />
			<ProductVerticalSection data={productVerticalData} />
			<TitleInfoSection data={titleInfoData} />
			<OrderBenefitsSection />
			<PaddingContainer>
				<StayTunedSection />
			</PaddingContainer>
			<HelpSection />
			<InfoTestimonial />
			<CallButton />
		</>
	);
};

export default Composite;

const PaddingContainer = styled.div`
	padding: 0rem 2rem;
`;

export const getServerSideProps: GetServerSideProps = async () => {
	const productVerticalData: ProductVerticalSectionType = {
		name: 'Which of our product vertical is relevant for you?',
		description:
			'Take full advantage of our expert knowledge and growing product portfolio in these domains for your specific field of application:',
		cards:
			(await getCategories()).map(category => ({
				...category,
				url: `/composites/categories/${category.slug}`,
			})) || [],
		viewMore: {
			link: '/composites/categories',
			text: 'View more Categories',
		},
	};

	return {
		props: {
			productVerticalData,
		},
	};
};
