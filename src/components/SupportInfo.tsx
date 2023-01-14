import React from 'react';
import styled from 'styled-components';
import { StyledHeading } from './FeaturedEvents';
import SupportInfoCard from './SupportInfoCard';

type svgIcon = ({ color }: { color?: string | undefined }) => JSX.Element;

interface ButtonType {
	title: string;
	link: string;
	Icon: svgIcon;
}

export interface SupportCardDetailType {
	CardIcon: svgIcon;
	title: string;
	paragraph: string;
	buttons: ButtonType[];
}

export interface SupportInfoType {
	header: string;
	cardDetail: SupportCardDetailType[];
}

type SupportInfoProps = {
	data: SupportInfoType;
};

const SupportInfo: React.FC<SupportInfoProps> = ({ data }) => {
	return (
		<StyledSupportWrapper>
			<StyledHeading>{data.header}</StyledHeading>
			<StyledSupportInfo>
				{data.cardDetail.map((card, index) => (
					<SupportInfoCard key={`card-${index}`} data={card} />
				))}
			</StyledSupportInfo>
		</StyledSupportWrapper>
	);
};

export default SupportInfo;

const StyledSupportWrapper = styled.div`
	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem;
	}
`;

const StyledSupportInfo = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin-bottom: 5rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		flex: 1;
		gap: 2rem;
	}
`;
