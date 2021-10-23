import styled from 'styled-components';
import { Container } from '../../pages';
import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from '@styled-icons/bootstrap';
const Footer = () => {
	return (
		<SooFooter>
			<Container
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				<p>Copyright &copy; 2021 OrthoEx Nigeria Limited</p>
				<div
					style={{
						display: 'flex',
						gap: '.5rem',
						alignItems: 'center',
					}}
				>
					<a
						target="_blank"
						rel="noopener"
						href="https://www.facebook.com/oexcomposite/"
					>
						<Facebook size={24} />
					</a>
					<a
						target="_blank"
						rel="noopener"
						href="https://instagram.com/oexcomposite"
					>
						<Instagram size={24} />
					</a>
					<a
						target="_blank"
						rel="noopener"
						href="https://twitter.com/OrthoExNg"
					>
						<Twitter size={24} />
					</a>
					<a
						target="_blank"
						rel="noopener"
						href="https://www.linkedin.com/company/orthoexnigeria"
					>
						<Linkedin size={24} />
					</a>
				</div>
			</Container>
		</SooFooter>
	);
};

export default Footer;

const SooFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: black;
	color: white;
`;
