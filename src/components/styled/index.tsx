import styled from 'styled-components';

/** class of "bigger" makes it's children have a min-width of `270px`*/
export const ServicesCards = styled.div<{ minWidth?: string }>`
	--min-width: ${({ minWidth = '120px' }) => minWidth};
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
	gap: 5rem;

	&.bigger {
		--min-width: 270px;
		gap: 1.5rem;
		.image-container {
			aspect-ratio: 2.5;
		}
		> div:not(.wider) {
			box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
		}
	}
	&.smaller {
		max-width: 65rem;
		margin: auto;
	}

	& > div.wider:first-child {
		padding: 0.8rem;
	}
	@media (min-width: 600px) {
		& > div.wider {
			grid-column: span 2;
		}
	}
`;

export const PostCardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
	gap: 4rem;
	// moved the above out of 600px media query

`;

export const Container = styled.div<{
	verticalPaddingInREM?: number;
	paddingMultiplier?: number;
	bg?: string;
}>`
	background-color: ${({ bg }) => {
		return bg || 'unset';
	}};
	max-width: 1500px;
	width: 100%;

	${({ verticalPaddingInREM: verticalPadding }) =>
		verticalPadding ? `padding-block: ${verticalPadding}rem;` : ''}
	${({ paddingMultiplier }) => {
		return `padding-inline: ${
			paddingMultiplier !== undefined ? paddingMultiplier * 2 : 2
		}rem;`;
	}}
	margin: auto;
	@media (max-width: 600px) {
		padding-inline: 1rem;
	}
`;
