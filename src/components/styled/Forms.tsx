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
export const FormRadio = styled.input`
	-webkit-appearance: none;
	appearance: none;
	color: var(--oex-orange);
	width: 1.15em;
	height: 1.15em;
	border-radius: 50%;
	background-color: var(--oex-orange);
	border: 3px solid #fff;
	margin: 0;
	// box-shadow: 0 0 0 1px var(--oex-orange);

	&::before {
		content: '';
		width: 2em;
		height: 2em;
		border-radius: 50%;
		transform: scale(1000);
		transition: 120ms transform ease-in-out;
		box-shadow: 0 0 0 1px var(--oex-orange);
	}

	&::checked::before {
		transform: scale(1);
	}
`;

export const FormRadioLabel = styled.label`
	color: var(--text-colour-grey);
	font-size: 1rem;
	display: grid;
	grid-template-columns: 1em auto;
	gap: 0.5em;
	cursor: pointer;

	input[type='radio'] {
		-webkit-appearance: none;
		appearance: none;
		font-size: 0.9rem;
		background-color: #fff;
		margin: 0;
		color: var(--oex-orange);
		width: 1.15em;
		height: 1.15em;
		border: 0.15em solid var(--oex-orange);
		border-radius: 50%;
		// transform: translateY(-0.075em);
		// align-items: center;
		display: grid;
		place-content: center;
	}

	input[type='radio']::before {
		content: '';
		width: 0.65em;
		height: 0.65em;
		border-radius: 50%;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em var(--oex-orange);
		background-color: CanvasText;
	}

	input[type='radio']:checked::before {
		transform: scale(1);
	}
`;

export const FormRadioWrapper = styled.div`
	display: flex;
	flex-direction: column;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		gap: 2rem;
	}
`;

export const FormRadioGroup = styled.div`
	margin-bottom: 1rem;
`;

export const FormInput = styled.input`
	border: 1px solid var(--text-colour-light-grey);
	outline: none;
	padding: 0.8rem;
	border-radius: 0.2rem;
	font: inherit;

	& > ::placeholder {
		color: var(--oex-bg-grey);
	}
`;

export const FormInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	margin-bottom: 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		justify-content: space-between;

		& > input {
			flex: 1;
			width: 33%;
		}
	}
`;

export const FormSelect = styled.select`
	// appearance: none;
	width: 100%;
	border: 1px solid var(--text-colour-light-grey);
	padding: 0.8rem;
	outline: none;
	margin-bottom: 2rem;
	background-color: transparent;
	font-family: inherit;
	font-size: inherit;
	cursor: inherit;
	line-height: inherit;

	& > ::placeholder {
		color: var(--oex-bg-grey);
	}

	&::-ms-expand {
		display: none;
	}

	& > option {
		background: white;
		color: red;
	}
`;
