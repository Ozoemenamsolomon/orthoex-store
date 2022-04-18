import NeedHelpSection from '../components/sections/NeedHelpSection';
import StayTunedSection from '../components/sections/StayTunedSection';
import ServiceCard, { ServiceCardType } from '../components/ServiceCard';
import { Container, ServicesCards } from '../components/styled';
import composite from '../assets/images/composite-material-icon_ImgID1.png';
import durable from '../assets/images/durable-icon_ImgID1.png';
import quality from '../assets/images/high-quality-icon_ImgID1.png';
import nigeria from '../assets/images/map-icon_ImgID1.png';
import SooSection from '../components/SooSection';
import HeroContent from '../components/HeroContent';
import { HeroComp as Hero } from '../components/Hero';
import { CTA } from '../components/Header';

const qualities: ServiceCardType[] = [
	{
		description: 'Small classes',
		image: composite,
	},
	{
		description: 'Hands-on learning',
		image: quality,
	},
	{
		description: 'Technical advice',
		image: durable,
	},
	{
		description: 'Learn from real professionals',
		image: nigeria,
	},
];

const Trainings = () => {
	return (
		<>
			<Hero>
				<HeroContent
					claim={
						'Join OEX workshop and learn how to work with our materials. We offer workshops on silicone mould making, Epoxy River Tables, Lifecasting, Glass Fibre Reinforced Concrete, jewellery making, modelling, sculptures, Resin Art, e.t.c. Immerse yourself in a world of unlimited possibilities!'
					}
					cta={<CTA>Register Now</CTA>}
				/>
			</Hero>
			<Container>
				<SooSection twoColumns>
					<div>
						<h2>Hands-On Learning with the same materials the Pros Use</h2>
						<p>
							We organise workshops and seminars on impression and modelling
							techniques for beginners and professional users of our range of
							products. Our participants receive helpful tips and tricks,
							materials, and relevant information from real professionals.
						</p>
					</div>
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
				<h1>Open Events</h1>
				<StayTunedSection />
				<NeedHelpSection />
			</Container>
		</>
	);
};

export default Trainings;
