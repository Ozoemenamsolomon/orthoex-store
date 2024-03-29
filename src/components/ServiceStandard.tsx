import ServiceCard, { ServiceCardType } from '@components/ServiceCard';
import React from 'react';
import styled from 'styled-components';
import { Container } from './styled';

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
		<Container paddingMultiplierSmall={0}>
			<StyledServiceStandard>
				<ServiceWriteUp>
					<h3>{heading}</h3>
					<p>{paragraph}</p>
				</ServiceWriteUp>
				<StyledServiceIcon>
					<StyledServiceCards>
						{servicesIcon.map((service, index) => (
							<ServiceCard
								greyFont
								className="no-shadow no-padding shrink-start"
								key={`image-desc-${index}`}
								service={service}
							/>
						))}
					</StyledServiceCards>
				</StyledServiceIcon>
			</StyledServiceStandard>
		</Container>
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

	@media ${({ theme }) => theme.breakpoints.above.lg} {
		flex-direction: row;
		padding: 2rem;
		gap: 5rem;
	}
`;

const ServiceWriteUp = styled.div`
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

	@media ${({ theme }) => theme.breakpoints.above.lg} {
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

	@media ${({ theme }) => theme.breakpoints.above.lg} {
		width: 60%;
	}
`;

const StyledServiceCards = styled.div`
	display: grid;
	gap: 2rem 1rem;
	grid-template-columns: repeat(2, 1fr);
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: unset;
		grid-auto-flow: column;
	}
`;
