import { FC } from 'react';
import styled from 'styled-components';
import { Container } from '../../pages';

type SOOSectionProp = {
	title?: String;
	color?: string;
	container?: Boolean;
};

const SooSection: FC<SOOSectionProp> = ({
	children,
	title,
	color,
	container = true,
}) => {
	return (
		<SOOSectionContainer color={color}>
			{container ? (
				<Container>
					{title ? <h2>{title}</h2> : null}
					{children}
				</Container>
			) : (
				<>
					{title ? <h2>{title}</h2> : null}
					{children}
				</>
			)}
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
