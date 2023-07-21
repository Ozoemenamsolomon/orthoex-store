import Expert from '@assets/new/icons/expert.svg';
import Graduation from '@assets/new/icons/graduation-hat.svg';
import Idea from '@assets/new/icons/idea.svg';
import Presentation from '@assets/new/icons/presentation.svg';
import LadyImage from '@assets/new/images/orangeshirt-lady.jpg';
import { Claims, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import FeaturedEvents from '@components/FeaturedEvents';
import ImageInfoHeader, {
	ImageInfoHeaderType,
} from '@components/ImageInfoHeader';
import ServiceStandard from '@components/ServiceStandard';
import { Container } from '@components/styled';
import {
	EventDataType,
	featuredEvents as featuredEventsData,
} from '@data/eventsData';
import { OrthoexTrainingDataFieldsType } from '@data/types/contentfulTypes';
import { createClient } from 'contentful';
import { NextPage } from 'next';

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

const Trainings: NextPage<{
	featuredEvents: EventDataType[];
	user: Claims;
	trainingData: OrthoexTrainingDataFieldsType[];
}> = ({ featuredEvents, user, trainingData }) => {
	return (
		<>
			<Container bg="white" paddingMultiplier={0}>
				<ImageInfoHeader data={data} />
				<ServiceStandard data={serviceStandardData} />
			</Container>
			<FeaturedEvents
				{...{ featuredEvents, userEmail: user.email, trainingData }}
			/>
		</>
	);
};

export default Trainings;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const spaceId = process.env.CONTENTFUL_TRAINING_SPACE || '';
		const accessToken = process.env.CONTENTFUL_TRAINING_ACCESS_TOKEN || '';
		const client = createClient({
			space: spaceId,
			accessToken: accessToken,
		});

		const trainingEvents = await client.getEntries({
			content_type: 'orthoexTrainingData',
		});

		const trainingData = trainingEvents.items.map(training => {
			const transformedTrainingData =
				training.fields as unknown as OrthoexTrainingDataFieldsType;
			return transformedTrainingData;
		});
		const session = await getSession(ctx.req, ctx.res);
		return {
			props: {
				user: session?.user,
				featuredEvents: featuredEventsData,
				trainingData,
			},
		};
	},
});
