import styled from 'styled-components';
import { Container } from '../../pages';

const Header: React.FC = () => {
	return (
		<SooHeader
			style={{
				position: 'absolute',
				width: '100%',
				zIndex: 5,
			}}
		>
			<Container
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Logo>Orthoex Logo</Logo>
				<NavBar>
					<CTA>Place an order!</CTA>
				</NavBar>
			</Container>
		</SooHeader>
	);
};

export default Header;

export const SooHeader = styled.header`
	/* background-color: red; */
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Logo = styled.div`
	padding: 1rem 1rem;
	font-weight: bold;
	/* color: white; */
`;
const NavBar = styled.nav`
	display: flex;
	align-items: center;
`;

export const CTA = styled.button`
	padding: 0.5rem 1rem;
	border-radius: 99999px;
	border: 2px solid white;
	background-color: orange;
	color: white;
	font-weight: bold;
	/* text-transform: uppercase; */
	&:hover {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.363);
	}
`;
