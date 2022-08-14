import React, { FC } from 'react';
import styled from 'styled-components';
import { Container } from './styled';

export type SOOSectionProp = {
	color?: string;
	style?: React.CSSProperties;
	header?: SectionHeaderProps;
	id?: string;
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
	id,
}) => {
	return (
		<SOOSectionContainer id={id} color={color}>
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
	/* TODO look into this */
	scroll-padding-top: 6rem;
	@media (min-width: 600px) {
		display: flex;
	}
`;
type SectionHeaderProps = {
	title: string;
	subtitle?: string;
	align?: 'left' | 'right';
};

export const SectionHeader: FC<SectionHeaderProps> = ({
	title,
	subtitle,
	align,
}) => {
	return (
		<SectionHeaderContainer align={align}>
			<SectionTitle>{title}</SectionTitle>
			{subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
		</SectionHeaderContainer>
	);
};

const SectionHeaderContainer = styled.div<{ align?: 'left' | 'right' }>`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: ${(prop) => (prop.align === 'left' ? 'flex-start' : 'flex-end')};
	margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
	margin: 0px 0px 1rem;
	text-align: center;
	align-self: center;
	font-size: 3.2rem;
	@media (min-width: 600px) {
		max-width: 70%;
	}
`;

const SectionSubtitle = styled.span`
	align-self: center;
	text-align: center;
	display: block;
	font-size: 1.2rem;
	@media (min-width: 600px) {
		max-width: 50%;
	}
`;
