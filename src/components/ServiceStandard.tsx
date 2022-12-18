import React from 'react';
import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import styled from 'styled-components';
import { ServicesCards } from './styled';

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
				<ServicesCards minWidthLargeScreen="220px">
					{servicesIcon.map((service, index) => (
						<ServiceCard
							greyFont
							className="no-shadow"
							key={`image-desc-${index}`}
							service={service}
						/>
					))}
				</ServicesCards>
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
	// flex: 2 1 auto;

	@media (min-width: 1024px) {
		width: 60%;
	}
`;
