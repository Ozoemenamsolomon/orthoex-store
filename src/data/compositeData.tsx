import { ServiceCardType } from '@components/ServiceCard';
import composite from '@assets/new/icons/composite.svg';
import durable from '@assets/new/icons/durable.svg';
import nigeria from '@assets/new/icons/nigeria.svg';
import highPerformanceIcon from '@assets/new/icons/high-performance.svg';
import handShake from '@assets/new/icons/handshake.svg';
import calculator from '@assets/new/icons/calculate.svg';
import quality from '@assets/new/icons/quality.svg';
import { ProductVerticalSectionType } from '@components/shared/ProductVerticalSection';
import { TitleCardDataType } from '@components/shared/TitleInfoSection';
import { categories } from './categories';
import { StyledCTALink } from './orthopaedicsData';

export const infoCardsData: ServiceCardType[] = [
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
export const productVerticalData: ProductVerticalSectionType = {
	title: 'Which of our product vertical is relevant for you?',
	description:
		'Take full advantage of our expert knowledge and growing product portfolio in these domains for your specific field of application:',
	cards: categories,
	viewMore: {
		link: '/composites/categories',
		text: 'View more Categories',
	},
};

export const titleInfoData: TitleCardDataType = {
	title: 'We empower your creativity with quality products and expert advise',
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
