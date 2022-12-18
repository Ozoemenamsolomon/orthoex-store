import React, { FC } from 'react';
import styled from 'styled-components';
import { Container } from './styled';

export type SOOSectionProp = {
	BGColor?: string;
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
	BGColor,
	style,
	header,
	twoColumns,
	id,
}) => {
	return (
		<SOOSectionContainer id={id} bgColor={BGColor}>
			{header && <SectionHeader {...header} />}
			<Container style={!twoColumns ? style : { ...style, ...twoColumnsStyle }}>
				{children}
			</Container>
		</SOOSectionContainer>
	);
};

export default SooSection;

const SOOSectionContainer = styled('section')<{
	bgColor?: string;
}>`
	background-color: ${prop => prop.bgColor};
	margin-top: 3rem;
	padding-block: 3rem;
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
			<SectionTitle align={align}>{title}</SectionTitle>
			{subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
		</SectionHeaderContainer>
	);
};

const SectionHeaderContainer = styled(Container)<{
	align?: SectionHeaderProps['align'];
}>`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: ${({ align }) => (align === 'left' ? 'flex-start' : 'center')};
	margin-bottom: 3rem;
`;

const SectionTitle = styled.h2<{
	align?: SectionHeaderProps['align'];
}>`
	margin: 0px 0px 1rem;
	text-align: center;
	font-size: 2rem;

	@media (min-width: 600px) {
		font-size: ${({ align }) => (align === 'left' ? '2rem' : '3.2rem')};
		max-width: 70%;
	}
`;

const SectionSubtitle = styled.span`
	text-align: center;
	display: block;
	font-size: 1.2rem;
	@media (min-width: 600px) {
		max-width: 50%;
	}
`;
