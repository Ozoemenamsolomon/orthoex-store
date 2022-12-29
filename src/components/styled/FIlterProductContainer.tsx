import styled from 'styled-components';

const FilterProductContainer = styled.div`
	position: relative;
	align-items: flex-start;
	gap: 2rem;
	h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		display: flex;
	}
`;

export default FilterProductContainer;
