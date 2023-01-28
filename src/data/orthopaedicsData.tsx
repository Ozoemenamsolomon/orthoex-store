import styled from 'styled-components';
import nigeria from '@assets/new/icons/nigeria.svg';
import expertSupport from '@assets/new/icons/orthopaedics/expert-support.svg';
import FabricationHub from '@assets/new/icons/orthopaedics/fabrication-hub.svg';
import HealthProfessionals from '@assets/new/icons/orthopaedics/health-professionals.svg';
import LinersSuspensionPickers from '@assets/new/icons/orthopaedics/liners-suspension-picker.svg';
import Patients from '@assets/new/icons/orthopaedics/patients.svg';
import swift from '@assets/new/icons/orthopaedics/swift.svg';
import quality from '@assets/new/icons/quality.svg';
import CompressionGarment from '@assets/new/images/productVerticalSection/orthopaedics/compression-garment.jpg';
import DiabeticFootwear from '@assets/new/images/productVerticalSection/orthopaedics/diabetic-footwear.jpg';
import FabricationAndSupply from '@assets/new/images/productVerticalSection/orthopaedics/fabrication-and-supply.jpg';
import LinesAndSleeves from '@assets/new/images/productVerticalSection/orthopaedics/lines-and-sleeves.jpg';
import OrthoicEquipments from '@assets/new/images/productVerticalSection/orthopaedics/orthoic-equipments.jpg';
import OrthopaedicBraces from '@assets/new/images/productVerticalSection/orthopaedics/orthopaedic-braces.jpg';
import Paediatrics from '@assets/new/images/productVerticalSection/orthopaedics/paediatrics.jpg';
import PatientAids from '@assets/new/images/productVerticalSection/orthopaedics/patients-aids.jpg';
import Prosthetic from '@assets/new/images/productVerticalSection/orthopaedics/Prosthetic.jpg';
import ToolsAndEquipments from '@assets/new/images/productVerticalSection/orthopaedics/tools-and-equipment.jpg';
import { CTALink } from '@components/CTA';
import { ServiceCardType } from '@components/ServiceCard';
import { ProductVerticalSectionType } from '@components/shared/ProductVerticalSection';
import { TitleCardDataType } from '@components/shared/TitleInfoSection';

export const StyledCTALink = styled(CTALink)`
	background-color: var(--oex-off-white);

	@media ${prop => prop.theme.breakpoints.above.sm} {
		padding: 1rem;
		font-size: 1rem;
	}
`;

export const infoCardsData: ServiceCardType[] = [
	{
		title: 'Patients',
		description:
			'You are not alone; we are here to help. OrthoEx supports amputees, people needing orthosis, and their families with the resources they need to live limitless lives.',
		image: Patients,
		cta: (
			<StyledCTALink href="" white>
				Patient resources
			</StyledCTALink>
		),
	},
	{
		title: 'Liners and Suspension picker',
		description:
			'Use our Liners and suspension size guide to assist you with deciding the right product fit for your patients.',
		image: LinersSuspensionPickers,
		cta: (
			<StyledCTALink href="" white>
				Select a product
			</StyledCTALink>
		),
	},
	{
		title: 'Fabrication Hub',
		description:
			'We reduce your overhead cost and help you focus on what matters most- your patients.',
		image: FabricationHub,
		cta: (
			<StyledCTALink href="" white>
				Read more
			</StyledCTALink>
		),
	},
	{
		title: 'Healthcare professionals',
		description:
			'With our passion for a quality life and excellence in clinical practice, we create value for our customers and challenge the limits of human potential.',
		image: HealthProfessionals,
		cta: (
			<StyledCTALink href="" white>
				Read more
			</StyledCTALink>
		),
	},
];

export const productVerticalData: ProductVerticalSectionType = {
	title: 'Which of our product vertical is relevant for you?',
	description:
		'Take full advantage of our expert knowledge and growing product portfolio in these domains for your specific field of application:',
	cards: [
		{
			name: 'Prosthetic Components',
			image: Prosthetic,
			slug: 'prosthetic-components',
		},
		{
			name: 'Liners and Sleeves',
			image: LinesAndSleeves,
			slug: 'liners-and-sleeves',
		},
		{
			name: 'Orthotic components',
			image: OrthoicEquipments,
			slug: 'orthotic-components',
		},
		{
			name: 'Fabrication Materials and Supply',
			image: FabricationAndSupply,
			slug: 'fabrication-materials-and-supply',
		},
		{
			name: 'Orthopaedic Braces',
			image: OrthopaedicBraces,
			slug: 'orthopaedic-braces',
		},
		{
			name: 'Paediatrics',
			image: Paediatrics,
			slug: 'paediatrics',
		},
		{
			name: 'Stump Care & Patients Aids',
			image: PatientAids,
			slug: 'stump-care-and-patients-aids',
		},
		{
			name: 'Diabetic Footwear & Care Products',
			image: DiabeticFootwear,
			slug: 'diabetic-footwear-and-care-products',
		},
		{
			name: 'Compression Garment',
			image: CompressionGarment,
			slug: 'compression-garment',
		},
		{
			name: 'Tools & Equipment',
			image: ToolsAndEquipments,
			slug: 'tools-and-equipment',
		},
	],
	viewMore: {
		link: '/composites/category',
		text: 'View more Categories',
	},
};

export const titleInfoData: TitleCardDataType = {
	title:
		"We go the extra mile to help you realize your patient's tailored needs and functional goals.",
	cards: [
		{
			description: 'We are swift and responsive by design',
			image: swift,
		},
		{
			description: 'All products are delivered with a standard warranty',
			image: quality,
		},
		{
			description:
				'Continuous expert support and resources from licenced P&O professionals',
			image: expertSupport,
		},
		{
			description:
				"We are Nigeria's largest orthotics and prosthetics supplier",
			image: nigeria,
		},
	],
};
