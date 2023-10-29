import { Container } from '@components/styled';
import Link from 'next/link';
import styled from 'styled-components';

export default function Custom404() {
	return (
		<StyledContainer>
			<div>
				<h1>404</h1>
				<p>Oopsy... Page not found</p>
				<p>
					We suggest you go back to the <Link href="/">homepage</Link>
				</p>
			</div>
		</StyledContainer>
	);
}

const StyledContainer = styled(Container)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh;
	background-image: linear-gradient(
		89.8deg,
		var(--oex-danger) 4.7%,
		var(--oex-orange-dark) 120.3%
	);
	color: white;
	text-align: center;
	& > div {
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 10px;
		padding: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.18);
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}
	h1 {
		font-size: 9rem;
		font-weight: 400;
		line-height: 10rem;
		margin: 0;
	}
	p {
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 2rem;
		margin: 0;
	}
	a {
		font-weight: 600;
		text-decoration: underline;
	}
`;
