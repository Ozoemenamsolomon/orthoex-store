import styled from 'styled-components';
import { Container } from '../../pages';
import { SooHeader } from './Header';

const Footer = () => {
	return (
		<SooHeader>
			<Container style={{ display: 'flex', justifyContent: 'center' }}>
				<p>Copyright &copy; 2021 OrthoEx Nigeria Limited</p>
			</Container>
		</SooHeader>
	);
};

export default Footer;

const SooFooter = styled.div``;
