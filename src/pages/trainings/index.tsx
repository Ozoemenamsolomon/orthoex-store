import Expert from '@assets/new/icons/expert.svg';
import Graduation from '@assets/new/icons/graduation-hat.svg';
import Idea from '@assets/new/icons/idea.svg';
import Presentation from '@assets/new/icons/presentation.svg';
import LadyImage from '@assets/new/images/man-woman-talk.jpg';
import { Claims } from '@auth0/nextjs-auth0';
import FeaturedEvents from '@components/FeaturedEvents';
import ImageInfoHeader, {
	ImageInfoHeaderType,
} from '@components/ImageInfoHeader';
import ServiceStandard from '@components/ServiceStandard';
import { Container } from '@components/styled';
import { TrainingSupbaseDataType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { supabaseTrainingClient } from '@utils/supabase';
import { GetServerSideProps, NextPage } from 'next';

const data: ImageInfoHeaderType = {
	image: LadyImage,
	heading: 'Our workshops are tailored for you!',
	paragraph:
		'Available workshops include Silicone Mould Making, Epoxy River Tables, Lifecasting, Glass Fibre Reinforced Concrete, Jewellery Making, Modelling, Sculptures, Resin Art, e.t.c. Immerse yourself in a world of unlimited possibilities!',
	cta: { link: '#featured-events', text: 'View Events' },
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
	user: Claims;
	trainingData: TrainingSupbaseDataType[];
}> = ({ user, trainingData }) => {
	return (
		<>
			<Container bg="white" paddingMultiplier={0}>
				<ImageInfoHeader data={data} />
				<ServiceStandard data={serviceStandardData} />
			</Container>
			<FeaturedEvents {...{ userEmail: user?.email, trainingData }} />
		</>
	);
};

export default Trainings;

export const getServerSideProps: GetServerSideProps = async ctx => {
<<<<<<< HEAD
=======

>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
	const response = await supabaseTrainingClient
		.from('training')
		.select('*')
		.order('startDateTime', { ascending: false });
	const trainingData = response.data as unknown as TrainingSupbaseDataType[];
<<<<<<< HEAD

=======
	
>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
	return {
		props: {
			trainingData: trainingData || [],
		},
	};
};
