import styled from 'styled-components';

const Header: React.FC = () => {
	return (
		<SooHeader>
			<Logo>Orthoex Logo</Logo>
		</SooHeader>
	);
};

export default Header;

export const SooHeader = styled.header`
	background-color: red;
	display: flex;
`;
const Logo = styled.div`
	padding: 1rem 1rem;
	font-weight: bold;
	color: white;
`;
