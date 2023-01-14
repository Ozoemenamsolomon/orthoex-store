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
			<Container
				paddingMultiplierSmall={0}
				style={!twoColumns ? style : { ...style, ...twoColumnsStyle }}>
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
	${({ bgColor }) => bgColor && `margin-inline: -2rem; padding-inline: 2rem;`}
	margin-top: 1rem;
	padding-block: 3rem;
	flex-direction: column;
	/* TODO look into this */
	scroll-padding-top: 6rem;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		margin-top: 3rem;
		display: flex;
	}
`;
type SectionHeaderProps = {
	title: string;
	subtitle?: string;
	align?: 'left' | 'right';
};

const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle, align }) => {
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

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		font-size: ${({ align }) => (align === 'left' ? '2rem' : '3.2rem')};
		max-width: 70%;
	}
`;

const SectionSubtitle = styled.span`
	text-align: center;
	display: block;
	font-size: 1.2rem;
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		max-width: 50%;
	}
`;
