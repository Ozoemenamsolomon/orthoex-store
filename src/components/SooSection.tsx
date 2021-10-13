import { FC } from 'react';
import styled from 'styled-components';
import { Container } from '../../pages';

type SOOSectionProp = {
	title: String;
};

const SooSection: FC<SOOSectionProp> = ({ children, title }) => {
	return (
		<SOOSectionContainer>
			<Container>
				<h2>{title}</h2>
				{children}
			</Container>
		</SOOSectionContainer>
	);
};

export default SooSection;

const SOOSectionContainer = styled.section`
	padding: 1rem 0;
	@media (min-width: 600px) {
		display: flex;
	}
`;
