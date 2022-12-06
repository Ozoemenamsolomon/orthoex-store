import React from 'react';
import styled from 'styled-components';

interface Props {
	title: string;
	description: string;
}

const InfoText: React.FC<Props> = ({ title, description, children }) => {
	return (
		<StyledInfoText>
			<h2>{title}</h2>
			<p>{description}</p>

			<StyledInfoChildren>{children}</StyledInfoChildren>
		</StyledInfoText>
	);
};

export default InfoText;

const StyledInfoText = styled.div`
	background-color: var(--oex-orange);
	color: white;
	padding: 2rem;
	text-align: left;

	& > h2 {
		font-weight: 500;
		text-align: center;
		font-size: 1.75rem;
		margin-bottom: 1rem;
	}

	& > p {
		font-weight: 300;
		font-size: 0.8rem;
		text-align: center;
	}

	@media (min-width: 768px) {
		text-align: center;
		padding: 3rem 9rem;

		& > h2 {
			font-weight: 550;
			text-align: center;
			font-size: 2.5rem;
			margin: 0rem 0rem 1rem;
		}
	}
`;

const StyledInfoChildren = styled.div`
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1rem 0rem;
`;
