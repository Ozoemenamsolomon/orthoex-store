import styled from 'styled-components';
import { Container } from '../../pages';
import { SooHeader } from './Header';

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
						F
					</a>
					<a
						target="_blank"
						rel="noopener"
						href="https://instagram.com/oexcomposite"
					>
						In
					</a>
					<a
						target="_blank"
						rel="noopener"
						href="https://twitter.com/OrthoExNg"
					>
						Tw
					</a>
					<a
						target="_blank"
						rel="noopener"
						href="https://www.linkedin.com/company/orthoexnigeria"
					>
						LI
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
	background-color: var(--oex-gray);
`;
