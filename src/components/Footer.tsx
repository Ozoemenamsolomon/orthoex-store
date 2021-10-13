import styled from 'styled-components';
import { Container } from '../../pages';
import { SooHeader } from './Header';

const Footer = () => {
	return (
		<SooFooter>
			<Container style={{ display: 'flex', justifyContent: 'center' }}>
				<p>Copyright &copy; 2021 OrthoEx Nigeria Limited</p>
			</Container>
		</SooFooter>
	);
};

export default Footer;

const SooFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
`;
