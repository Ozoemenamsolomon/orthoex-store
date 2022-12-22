import Link from 'next/link';
import styled from 'styled-components';

function Calculator() {
	return (
		<>
			<PageHeading>
				<BackButtonWrapper>
					<Link href="/composites">Back</Link>
				</BackButtonWrapper>
				<PageHeadingWrapper>
					<span>Calculator</span>
				</PageHeadingWrapper>
			</PageHeading>
			<PageWrapper>
				<PageContainer>Here</PageContainer>
			</PageWrapper>
		</>
	);
}

export default Calculator;

const PageWrapper = styled.div`
	background-color: var(--oex-lightest-grey);
	// background-color: red;
	margin-top: 5rem;
	padding-top: 7rem;
`;

const PageHeading = styled.div`
	display: flex;
	// align-items: center;
	// justify-content: center;
	position: fixed;
	top: 6rem;
	z-index: 2;
	background-color: white;
	width: 100%;
	min-height: 3rem;
	border-bottom: 1px solid var(--oex-lightest-grey);
`;

const BackButtonWrapper = styled.div`
	border-right: 1px solid var(--oex-dark-grey);
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 1rem;
`;

const PageHeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding-left: 4rem;
`;

const PageContainer = styled.div`
	background-color: white;
	min-height: 50vh;
	padding: 1rem;
	// margin-top: 11rem;

	@media (min-width: 768px) {
		// flex-direction: row;
	}

	@media (min-width: 2000px) {
		// padding: 3rem 25rem 5rem;
	}
`;
