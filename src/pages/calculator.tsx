import Link from 'next/link';
import styled from 'styled-components';

function Calculator() {
	return (
		<PageWrapper>
			<PageHeading>
				<BackButtonWrapper>
					<Link href="/composites">Back</Link>
				</BackButtonWrapper>
				<PageHeadingWrapper>
					<span>Calculator</span>
				</PageHeadingWrapper>
			</PageHeading>
			<PageContainer>Here</PageContainer>
		</PageWrapper>
	);
}

export default Calculator;

const PageWrapper = styled.div`
	background-color: var(--oex-lightest-grey);
	margin-top: 5rem;

	// margin: 5rem auto 0rem;
`;

const BackButtonWrapper = styled.div`
	border-right: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const PageHeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding-left: 4rem;
`;

const PageHeading = styled.div`
	display: flex;
	align-items: center;
	// justify-content: center;
	position: fixed;
	top: 6rem;
	z-index: 2;
	background-color: white;
	width: 100%;
	min-height: 3rem;

	& > .backLink {
		border-right: 1px solid black;
	}
`;

const PageContainer = styled.div`
	// display: flex;
	// flex-direction: column;
	min-height: 50vh;
	padding: 1rem;
	margin-top: 9rem;

	@media (min-width: 768px) {
		// flex-direction: row;
		padding: 3rem 10rem 5rem;
	}

	@media (min-width: 2000px) {
		padding: 3rem 25rem 5rem;
	}
`;
