import React, { FC } from 'react';
import styled from 'styled-components';
import { Container } from '../pages';

type SOOSectionProp = {
	color?: string;
	container?: Boolean;
	style?: React.CSSProperties;
	header?: SectionHeaderProps;
};

const SooSection: FC<SOOSectionProp> = ({
	children,
	color,
	container = true,
	style,
	header,
}) => {
	return (
		<SOOSectionContainer
			style={!container ? style : { flexDirection: 'column' }}
			color={color}
		>
			{header && <SectionHeader {...header} />}
			{container ? (
				<Container style={container ? style : undefined}>{children}</Container>
			) : (
				<>{children}</>
			)}
		</SOOSectionContainer>
	);
};

export default SooSection;

const SOOSectionContainer = styled('section')<{ color?: String }>`
	background-color: ${(prop) => prop.color};
	margin: 5rem 0;
	@media (min-width: 600px) {
		display: flex;
	}
`;
type SectionHeaderProps = { first: string; second: string };

export const SectionHeader: FC<SectionHeaderProps> = ({ first, second }) => {
	return (
		<>
			<span
				style={{
					color: 'var(--oex-orange)',
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				{first}
			</span>
			<h2 style={{ margin: 0, textAlign: 'center', marginBottom: '1rem' }}>
				{second}{' '}
			</h2>
		</>
	);
};
