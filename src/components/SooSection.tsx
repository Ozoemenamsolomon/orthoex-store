import React, { FC } from 'react';
import styled from 'styled-components';
import { Container } from './styled';

export type SOOSectionProp = {
	color?: string;
	style?: React.CSSProperties;
	header?: SectionHeaderProps;
	twoColumns?: boolean;
};

const twoColumnsStyle = {
	gridTemplateRows: 'auto',
	display: 'grid',
	gap: '2rem',
	gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
	alignItems: 'center',
};

const SooSection: FC<SOOSectionProp> = ({
	children,
	color,
	style,
	header,
	twoColumns,
}) => {
	return (
		<SOOSectionContainer color={color}>
			{header && <SectionHeader {...header} />}
			<Container style={!twoColumns ? style : { ...style, ...twoColumnsStyle }}>
				{children}
			</Container>
		</SOOSectionContainer>
	);
};

export default SooSection;

const SOOSectionContainer = styled('section')<{
	color?: String;
}>`
	background-color: ${(prop) => prop.color};
	margin: 5rem 0;
	flex-direction: column;
	@media (min-width: 600px) {
		display: flex;
	}
`;
type SectionHeaderProps = { title: string; subtitle?: string };

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle }) => {
	return (
		<>
			<SectionTitle>{title}</SectionTitle>
			{subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
		</>
	);
};

const SectionTitle = styled.h2`
	margin: 0px 0px 1rem;
	text-align: center;
	align-self: center;
	@media (min-width: 600px) {
		max-width: 70%;
	}
`;

const SectionSubtitle = styled.span`
	align-self: center;
	text-align: center;
	margin-bottom: 3rem;
	display: block;
	@media (min-width: 600px) {
		max-width: 50%;
	}
`;
