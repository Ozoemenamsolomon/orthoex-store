import NeedHelpSection from "@components/sections/NeedHelpSection";
import StayTunedSection from "@components/sections/StayTunedSection";
import ServiceCard, { ServiceCardType } from "@components/ServiceCard";
import { Container, ServicesCards } from "@components/styled";
import composite from "@assets/new/icons/composite.svg";
import durable from "@assets/new/icons/durable.svg";
import quality from "@assets/new/icons/quality.svg";
import nigeria from "@assets/new/icons/nigeria.svg";
import SooSection from "@components/SooSection";
import HeroContent from "@components/HeroContent";
import { HeroComp as Hero } from "@components/Hero";
import CTA from "@components/CTA";
import EventCard from "@components/EventCard";

const qualities: ServiceCardType[] = [
	{
		description: "Small classes",
		image: composite,
	},
	{
		description: "Hands-on learning",
		image: quality,
	},
	{
		description: "Technical advice",
		image: durable,
	},
	{
		description: "Learn from real professionals",
		image: nigeria,
	},
];

const events = [
	{
		startDateTimeString: "2022-03-03T13:10",
		endDateTimeString: "2022-03-07T13:10",
		location: "Ikeja,Lagos",
		courseTitle: "Resin art workshop",
		instructor: "Ciroma Chukwuma",
		refreshment: true,
		starterPack: true,
		spotsLeft: 3,
		registeredParticipant: 12,
		price: 5_000_000,
		eventDetails: `
<h3>About the Workshop</h3>
					<p>
						In this workshop, the anatomical basics of modeling are taught on
						the basis of the eye, nose and ear. The right choice of modelling
						clay will be another component. Important tools and corresponding
						techniques are discussed.At the end of the seminar, a certificate
						of participation will be handed over
					</p>
					<h3>About the Workshop</h3>
					<ul>
						<li>Attended the school of fine arts and design in berlin</li>
						<li>Founded his own miniature label "savage feget minis"</li>
						<li>
							In 2012 - has since worked for leading companies in the gaming
							industry
						</li>
					</ul>`,
	},
	{
		startDateTimeString: "2022-03-03T13:10",
		endDateTimeString: "2022-03-07T13:10",
		location: "Ikeja,Lagos",
		courseTitle: "Resin art workshop",
		instructor: "Ciroma Chukwuma",
		refreshment: true,
		starterPack: true,
		spotsLeft: 3,
		registeredParticipant: 12,
		price: 20_000,
		eventDetails: `
<h3>About the Workshop</h3>
					<p>
						In this workshop, the anatomical basics of modeling are taught on
						the basis of the eye, nose and ear. The right choice of modelling
						clay will be another component. Important tools and corresponding
						techniques are discussed.At the end of the seminar, a certificate
						of participation will be handed over
					</p>
					<h3>About the Workshop</h3>
					<ul>
						<li>Attended the school of fine arts and design in berlin</li>
						<li>Founded his own miniature label "savage feget minis"</li>
						<li>
							In 2012 - has since worked for leading companies in the gaming
							industry
						</li>
					</ul>`,
	},
	{
		startDateTimeString: "2022-03-03T13:10",
		endDateTimeString: "2022-03-07T13:10",
		location: "Ikeja,Lagos",
		courseTitle: "Resin art workshop",
		instructor: "Ciroma Chukwuma",
		refreshment: true,
		starterPack: true,
		spotsLeft: 3,
		registeredParticipant: 12,
		price: 10_000,
		eventDetails: `
<h3>About the Workshop</h3>
					<p>
						In this workshop, the anatomical basics of modeling are taught on
						the basis of the eye, nose and ear. The right choice of modelling
						clay will be another component. Important tools and corresponding
						techniques are discussed.At the end of the seminar, a certificate
						of participation will be handed over
					</p>
					<h3>About the Workshop</h3>
					<ul>
						<li>Attended the school of fine arts and design in berlin</li>
						<li>Founded his own miniature label "savage feget minis"</li>
						<li>
							In 2012 - has since worked for leading companies in the gaming
							industry
						</li>
					</ul>`,
	},
];

const Trainings = () => {
	return (
		<>
			<Hero>
				<HeroContent
					claim={
						"Join OEX workshop and learn how to work with our materials. We offer workshops on silicone mould making, Epoxy River Tables, Lifecasting, Glass Fibre Reinforced Concrete, jewellery making, modelling, sculptures, Resin Art, e.t.c. Immerse yourself in a world of unlimited possibilities!"
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
						{qualities.map((quality, index) => (
							<ServiceCard key={index} imagePadding service={quality} />
						))}
					</ServicesCards>
				</SooSection>
				<h1>Open Events</h1>
				{events.map((trainingEvent, eventIndex) => (
					<EventCard
						key={eventIndex}
						event={trainingEvent}
						disabled={eventIndex % 2 !== 0 ? true : undefined}
					/>
				))}
				<StayTunedSection />
				<NeedHelpSection />
			</Container>
		</>
	);
};

export default Trainings;
