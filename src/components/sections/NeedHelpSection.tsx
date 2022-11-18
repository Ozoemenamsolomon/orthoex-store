import chatIcon from "@assets/new/icons/chat.svg";
import faq from "@assets/new/icons/faq.svg";
import phoneIcon from "@assets/new/icons/telephone.svg";
import CTA, { CTALink } from "@components/CTA";
import ServiceCard, { ServiceCardType } from "@components/ServiceCard";
import SooSection from "@components/SooSection";
import { ServicesCards } from "@components/styled";

export const helps: ServiceCardType[] = [
	{
		HTMLDescription: true,
		description:
			"Talk to a customer care representative <br/> Mon - Fri: 9:00am - 5:00 pm",
		image: phoneIcon,
		cta: (
			<CTALink href="tel:+2347030324696" white>
				Dial Number
			</CTALink>
		),
	},
	{
		description: "Chat with a product expert",
		image: chatIcon,
		cta: (
			<CTALink
				target="_blank"
				rel="noopener noreferrer"
				href="https://wa.me/2347030324696"
				white
			>
				Live chat
			</CTALink>
		),
	},
	{
		description:
			"Find a list of answers to the most popular questions that are asked",
		image: faq,
		cta: <CTA white>View FAQ</CTA>,
	},
];

const NeedHelpSection = () => {
	return (
		<SooSection>
			<div style={{ textAlign: "center", marginBottom: "2rem" }}>
				<h2>Do you Need help?</h2>
				<p>We have several resources available to help you with our products</p>
			</div>

			<ServicesCards>
				{helps.map((help, index) => (
					<ServiceCard key={index} service={help} />
				))}
			</ServicesCards>
		</SooSection>
	);
};

export default NeedHelpSection;
