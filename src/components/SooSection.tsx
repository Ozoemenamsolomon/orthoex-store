import { FC } from 'react';
import styled from 'styled-components';
import { Container } from '../../pages';

type SOOSectionProp = {
	title?: String;
	color?: string;
};

const SooSection: FC<SOOSectionProp> = ({ children, title, color }) => {
	return (
		<SOOSectionContainer color={color}>
			<Container>
				{title ? <h2>{title}</h2> : null}
				{children}
			</Container>
		</SOOSectionContainer>
	);
};

export default SooSection;

const SOOSectionContainer = styled('section')<{ color?: String }>`
	background-color: ${(prop) => prop.color};
	padding: 1rem 0;
	@media (min-width: 600px) {
		display: flex;
	}
`;
