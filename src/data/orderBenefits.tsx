import creditCard from '@assets/new/icons/credit-card.svg';
import deliveryVan from '@assets/new/icons/delivery-van.svg';
import headphone from '@assets/new/icons/headphone.svg';
import { ServiceCardType } from '@components/ServiceCard';



const orderBenefits: ServiceCardType[] = [
	{
		title: 'Order by 12PM',
		description: 'Shipped same day',
		image: deliveryVan,
	},
	{
		title: 'Safe payment',
		description: 'Trusted SSL protection',
		image: creditCard,
	},
	{
		title: 'Technical Advice',
		description: 'We offer helpful tips & tricks to aid your craft',
		image: headphone,
	},
];

export default orderBenefits;
