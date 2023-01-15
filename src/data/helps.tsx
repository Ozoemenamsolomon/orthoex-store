import chatIcon from '@assets/new/icons/chat.svg';
import faq from '@assets/new/icons/faq.svg';
import phoneIcon from '@assets/new/icons/telephone.svg';
import CTA, { CTALink } from '@components/CTA';
import { ServiceCardType } from '@components/ServiceCard';

export const helps: ServiceCardType[] = [
	{
		description:
			'Find a list of answers to the most popular questions that are asked',
		image: faq,
		cta: <CTA white>View FAQ</CTA>,
	},
	{
		HTMLDescription: true,
		description:
			'Talk to a customer care representative <br/> Mon - Fri: 9:00am - 5:00 pm',
		image: phoneIcon,
		cta: (
			<CTALink href="tel:+2347030324696" white>
				Dial Number
			</CTALink>
		),
	},
	{
		description: 'Chat with a product expert',
		image: chatIcon,
		cta: (
			<CTALink
				target="_blank"
				rel="noopener noreferrer"
				href="https://wa.me/2347030324696"
				white>
				Live chat
			</CTALink>
		),
	},
];
