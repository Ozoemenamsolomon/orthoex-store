import styled from 'styled-components';

const NewsLetterSection = () => {
	return <Wrapper></Wrapper>;
};

export default NewsLetterSection;

const Wrapper = styled.div`
	background-color: var(--oex-orange);
	display: flex;
	flex-direction: column;
	min-height: 300px;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding: 0rem 9rem;
	}
`;
