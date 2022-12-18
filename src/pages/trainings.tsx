import React from 'react';
import styled from 'styled-components';
import LadyImage from '@assets/new/images/orangeshirt-lady.jpg';
import ImageInfoHeader, {
	ImageInfoHeaderType,
} from '@components/ImageInfoHeader';
import { Container } from '@components/styled';
import ServiceStandard from '@components/ServiceStandard';
import FeaturedEvents from '@components/FeaturedEvents';
import Expert from '@assets/new/icons/expert.svg';
import Graduation from '@assets/new/icons/graduation-hat.svg';
import Idea from '@assets/new/icons/idea.svg';
import Presentation from '@assets/new/icons/presentation.svg';

const data: ImageInfoHeaderType = {
	image: LadyImage,
	heading: 'Our workshops are tailored for you!',
	paragraph:
		'Available workshops include silicone mould making, Epoxy River Tables, Lifecasting, Glass Fibre Reinforced Concrete, jewellery making,  modelling, sculptures, Resin Art, e.t.c. Immerse yourself in a world of unlimited possibilities!',
	cta: { link: '/', text: 'View Events' },
};

const serviceStandardData = {
	heading: 'Hands-On Learning with the same materials the Pros Use',
	paragraph:
		'We organise workshops and seminars on impression and modelling techniques for beginners and professional users of our range of products. Our participants receive helpful tips and tricks, materials, and relevant information from real professionals.',
	servicesIcon: [
		{ description: 'Small clases', image: Presentation },
		{ description: 'Hands-on Learning', image: Graduation },
		{ description: 'Learn from real professionals', image: Expert },
		{ description: 'Technical advice', image: Idea },
	],
};

const trainings = () => {
	return (
		<>
			<StyledTraining>
				<Container bg="white" paddingMultiplier={0}>
					<ImageInfoHeader data={data} />
					<ServiceStandard data={serviceStandardData} />
				</Container>
				<FeaturedEvents />
			</StyledTraining>
		</>
	);
};

export default trainings;

const StyledTraining = styled.div`
	margin-top: 7rem;
`;
