import CustomerFirst from '@assets/new/icons/about/customer-first.svg';
import Excellence from '@assets/new/icons/about/excellence-and-dependable.svg';
import HumanPotential from '@assets/new/icons/about/human-potentials.svg';
import Innovative from '@assets/new/icons/about/innovative.svg';
import OurMission from '@assets/new/icons/about/our-mission.svg';
import OurVision from '@assets/new/icons/about/our-vision.svg';
import PositivePassionate from '@assets/new/icons/about/positive-and-pastionate.svg';
import SwiftResponsive from '@assets/new/icons/about/swift-and-responsive.svg';
import Composites from '@assets/new/icons/home/composites.svg';
import Prosthetics2 from '@assets/new/icons/home/prosthetics.svg';
import { AboutCardSectionType } from '@components/About/AboutCardSection';

export interface AboutDataType {
	title: string;
	sections: AboutCardSectionType[];
}

export const aboutData: AboutDataType[] = [
	{
		title: 'Company overview',
		sections: [
			{
				heading: 'Company Overview',
				description:
					"OrthoEx is a leading prosthetic, orthotic components, and composite materials supplier. Since 2014, we have served thousands of professionals in both the private and public sectors. Our products are designed for our customers' needs across multiple markets in the healthcare and manufacturing industries. In addition, we work closely with prosthetists who provide free artificial limbs to amputees in Nigeria.\n\nAs the market leader, we collaborate with top brands across the globe and offer technical training and consultancy to professionals and organizations on our range of products and technologies.\n\nWe pride ourselves on satisfying our customers and helping them reach their business goals. OrthoEx is on a mission to empower human potential! \n\nThere are many reasons our partners love to work with us. Join us and take advantage of the growing benefits as we continue to grow our competence, quality, and customer experience.",
			},
		],
	},
	{
		title: 'Culture and values',
		sections: [
			{
				heading: 'Mission & Vision',
				cards: [
					{
						description: 'To empower human potential.',
						image: OurMission,
						title: 'Our Mission',
					},
					{
						image: OurVision,
						title: 'Our Vision',
						description: 'To be the preferred partner of choice for quality',
					},
				],
			},
			{
				heading: 'Values',
				cards: [
					{
						image: CustomerFirst,
						title: 'Customer-first',
						description:
							'Our customers are the centre of our corporate decisions. ',
					},
					{
						image: HumanPotential,
						title: 'Empower human potentials',
						description:
							'We challenge and inspire our customers and employees to make an impact through their work',
					},
					{
						image: Excellence,
						title: 'Excellence and dependable',
						description:
							"We surpass our customers' expectations in a caring and professional manner.",
					},
					{
						image: PositivePassionate,
						title: 'Positive & passionate',
						description:
							'We are a cheerful people, passionate about our brand and mission. We believe in possibilities!',
					},
					{
						image: SwiftResponsive,
						title: 'Swift and Responsive',
						description:
							'We are swift and responsive by design. We prioritize a personalized customer experience.',
					},
					{
						image: Innovative,
						title: 'Innovative',
						description:
							'We encourage collaborations and constantly seek new innovative solutions to our challenges.',
					},
				],
			},
		],
	},
	{
		title: 'Our businesses',
		sections: [
			{
				heading: 'Our businesses',
				cards: [
					{
						image: Prosthetics2,
						title: 'Orthopaedics',
						description:
							'We continually enable our clients to achieve efficiency and increased effectiveness of biomedical devices designed for their patients.',
					},
					{
						image: Composites,
						title: 'Composites',
						description:
							'We collaborate with our clients to help them adapt to changing market conditions and stay ahead of the competition.',
					},
				],
			},
		],
	},
];
