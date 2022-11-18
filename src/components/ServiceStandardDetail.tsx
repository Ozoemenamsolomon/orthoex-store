import { ServiceCardType } from '@components/ServiceCard';
import styled from 'styled-components';
import Composite from '@assets/new/icons/composite.svg';
import Image from 'next/image';

// Get the  main svgs for this files

const services: ServiceCardType[] = [
	{ description: 'Prosthetics', image: Composite },
	{ description: 'Composites', image: Composite },
	{ description: 'Trainings', image: Composite },
	{ description: 'After Sales', image: Composite },
	{ description: 'Consultancy', image: Composite },
	{ description: 'Procurement', image: Composite },
];

function ServiceStandardDetail() {
	return (
		<ImageDescriptionWrapper>
			{services.map((service, index) => (
				<ImageDescription key={index}>
					<Image src={service.image} alt="service standard image" />
					<p>{service.description}</p>
				</ImageDescription>
			))}
		</ImageDescriptionWrapper>
	);
}

export default ServiceStandardDetail;

const ImageDescription = styled.div`
	display: flex;
	// flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
`;
const ImageDescriptionWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
