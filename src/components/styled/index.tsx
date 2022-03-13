import styled from 'styled-components';

/** class of "bigger" makes it's children have a min-width of `270px`*/
export const ServicesCards = styled.div<{ minWidth?: string }>`
	--min-width: ${({ minWidth = '120px' }) => minWidth};
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
	gap: 1rem;

	&.bigger {
		--min-width: 270px;
		gap: 1.5rem;
		.image-container {
			aspect-ratio: 2.5;
		}
		> div {
			box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
		}
	}

	& > div:first-child {
		padding: 0.8rem;
	}
	@media (min-width: 600px) {
		& > div.wider {
			grid-column: span 2;
		}
	}
`;

export const PostCardsContainer = styled.div`
	@media (min-width: 600px) {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
`;
