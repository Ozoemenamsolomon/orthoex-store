import React from 'react';
import { ServiceCardType } from '@components/ServiceCard';
import styled from 'styled-components';
import Image from 'next/image';

interface ServiceStandardType {
	heading: string;
	paragraph: string;
	servicesIcon: ServiceCardType[];
}

type ServiceStandardProps = {
	data: ServiceStandardType;
};

const ServiceStandard: React.FC<ServiceStandardProps> = ({ data }) => {
	const { heading, paragraph, servicesIcon } = data;
	return (
		<StyledServiceStandard>
			<ServiceWriteUp>
				<h3>{heading}</h3>
				<p>{paragraph}</p>
			</ServiceWriteUp>
			<StyledServiceIcon>
				<ImageDescriptionWrapper>
					{servicesIcon.map((service, index) => (
						<ImageDescription length={servicesIcon.length} key={index}>
							<Image
								src={service.image}
								alt={service.description}
								style={{ objectFit: 'contain' }}
								width="120"
								height="120"
							/>
							<p>{service.description}</p>
						</ImageDescription>
					))}
				</ImageDescriptionWrapper>
			</StyledServiceIcon>
		</StyledServiceStandard>
	);
};

export default ServiceStandard;

const StyledServiceStandard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	margin-top: 2rem;
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		flex-direction: row;
		padding: 2rem;
	}
`;

const ServiceWriteUp = styled.div`
	width: 100%;
	flex: 0 1 auto;

	& > h3 {
		font-size: 2rem;
		line-height: 1.2;
		font-weight: 700;
		margin-bottom: 2rem;
	}

	& > p {
		line-height: 1.5;
		color: var(--text-colour-grey);
	}

	@media (min-width: 1028px) {
		width: 40%;

		& > h3 {
			margin-bottom: 2rem;
			font-size: 3rem;
			line-height: 1.2;
			font-weight: 600;
		}
	}
`;

const StyledServiceIcon = styled.div`
	width: 100%;
	height: 100%;
	flex: 2 1 auto;

	@media (min-width: 1024px) {
		width: 60%;
	}
`;

const ImageDescription = styled.div<{ length: number }>`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;
	width: 50%;
	margin-bottom: 2rem;

	& > p {
		color: var(--text-colour-grey);
		width: 50%;
		text-align: center;
	}

	@media (min-width: 1028px) {
		width: ${({ length }) => (length > 5 ? '33%' : '50%')};
	}
`;

const ImageDescriptionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	flex-wrap: wrap;
`;
