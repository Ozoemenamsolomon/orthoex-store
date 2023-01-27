import composite from '@assets/new/icons/composite.svg';
import durable from '@assets/new/icons/durable.svg';
import nigeria from '@assets/new/icons/nigeria.svg';
import highPerformanceIcon from '@assets/new/icons/high-performance.svg';
import handShake from '@assets/new/icons/handshake.svg';
import calculator from '@assets/new/icons/calculate.svg';
import quality from '@assets/new/icons/quality.svg';
import heroBG from '@assets/new/images/hero-bg.jpg';
import { CTALink } from '@components/CTA';
import { StyledHeading } from '@components/FeaturedEvents';
import { HeroComp as Hero } from '@components/Hero';
import HeroContent from '@components/HeroContent';
import InfoTestmonial from '@components/InfoTestimonial';
import StayTunedSection from '@components/sections/StayTunedSection';
import { ServiceCardType } from '@components/ServiceCard';
import HelpSection from '@components/shared/HelpSection';
import InfoCardSection from '@components/shared/InfoCardSection';
import OrderBenefitsSection from '@components/shared/OrderBenefitsSection';
import ProductVerticalSection, {
	ProductVerticalSectionType
} from '@components/shared/ProductVerticalSection';
import TitleInfoSection, {
	TitleCardDataType
} from '@components/shared/TitleInfoSection';
import { categories } from '@data/categories';
import styled from 'styled-components';

const StyledCTALink = styled(CTALink)`
	background-color: var(--oex-off-white);

	@media ${prop => prop.theme.breakpoints.above.sm} {
		padding: 1rem;
		font-size: 1rem;
	}
`;

const infoCardsData: ServiceCardType[] =[
	{
		description:
			'We are committed to delivering superior composite materials that you can trust for your craft. Take advantage of our high quality products',
		image: highPerformanceIcon,
		cta: (
			<StyledCTALink href="#categories" white>
				View products
			</StyledCTALink>
		),
		title: undefined,
	},
	{
		description:
			'With our safe and reliable composite solutions, you can make a wide range of stronger, lighter and tougher products',
		image: handShake,
		cta: (
			<StyledCTALink href="/composites/categories" white>
				Shop now
			</StyledCTALink>
		),
		title: undefined,
	},
	{
		description:
			'Use our resin calculator to estimate the amount of epoxy resin you will need for your projects.',
		image: calculator,
		cta: (
			<StyledCTALink href="/composites/calculator" white>
				Calculate your resin
			</StyledCTALink>
		),
		title: undefined,
	},
];

//TODO: Rename the below title to name, add slug, the link is the slug.
const productVerticalData: ProductVerticalSectionType = {
	title: 'Which of our product vertical is relevant for you?',
	description:
		'Take full advantage of our expert knowledge and growing product portfolio in these domains for your specific field of application:',
	cards: categories
};

const titleInfoData: TitleCardDataType = {
	title:
		'We empower your creativity with quality products and expert advise',
	cards: [
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
	],
};

function Orthopaedics() {
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
			<StyledHeading padding align='left'>
			Experience a new level of performance with our safe and reliable products
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
