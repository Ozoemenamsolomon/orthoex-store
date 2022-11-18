import styled from 'styled-components';

const FilterProductContainer = styled.div`
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	> *:nth-child(1) {
		flex: 1;
	}
	> *:nth-child(2) {
		flex: 2.5;
	}

	h2 {
		margin: 0;
		font-size: 1.5rem;
	}
`;

export default FilterProductContainer;
