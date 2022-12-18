import styled from 'styled-components';

export const StyledFormWrapper = styled.div`
	padding: 2rem 0.5rem;
	border: 1px solid var(--oex-light-grey);
	border-radius: 0.2rem;
`;

export const StyledFormControl = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;

	& > label {
		font-weight: 600;
		color: var(--text-colour-dark);
		font-size: 0.9rem;
	}

	& > input,
	textarea {
		border: 1px solid var(--oex-light-grey);
		outline: none;
		padding: 0.8rem;
		border-radius: 0.2rem;
		font: inherit;
	}

	& > input::placeholder,
	textarea::placeholder {
		color: var(--text-colour-light-grey);
	}
`;

export const StyledFormButtonControl = styled.div`
	text-align: center;

	& > button {
		width: 100%;
		font-size: 1.3rem;
	}
`;
