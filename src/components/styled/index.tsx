import styled from 'styled-components';

/** class of "bigger" makes it's children have a min-width of `270px`*/
export const ServicesCards = styled.div<{
	minWidth?: string;
}>`
	--min-width: ${({ minWidth = '170px' }) => minWidth};
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
	gap: 1rem;

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
	@media ${({ theme }) => theme.breakpoints.above.sm} {
		gap: 5rem;
		--min-width: 130px;
		& > div.wider {
			grid-column: span 2;
		}
	}
`;

export const PostCardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 4rem;
`;

export const Container = styled.div<{
	verticalPaddingInREM?: number;
	paddingMultiplier?: number;
	paddingMultiplierSmall?: number;
	bg?: string;
}>`
	background-color: ${({ bg }) => bg || 'unset'};
	max-width: 1500px;
	width: 100%;
	margin: auto;
	padding-top: 1rem;
	padding-inline: ${({ paddingMultiplierSmall }) =>
		(paddingMultiplierSmall ?? 1) * 1}rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		${({ verticalPaddingInREM: verticalPadding }) =>
			verticalPadding ? `padding-block: ${verticalPadding}rem;` : ''}
		padding-inline: ${({ paddingMultiplier }) =>
			(paddingMultiplier ?? 1) * 2}rem;
	}
`;

export const ProductCards = styled.div`
	display: flex;
	overflow-x: scroll;
	gap: 2rem;
	justify-content: space-between;
	padding: 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem 0rem;
		overflow-x: unset;
	}
`;
