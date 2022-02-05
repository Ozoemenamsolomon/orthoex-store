import { Container } from '../pages';
import ContactForm from './ContactForm';

const Contact = () => {
	return (
		<Container
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
				alignItems: 'center',
			}}
		>
			<div>
				<h3>OrthoEx Nigeria Limited</h3>
				<p>
					10 Ipakodo Wharf Road, <br />
					Ebute, Ikorodu,
					<br />
					Lagos State, Nigeria.
				</p>
				<p>Email: store@orthoex.ng</p>
				<ul>
					<li>+234-703-032-4696</li>
					<li>+234-811-223-0122</li>
				</ul>
			</div>
			<ContactForm></ContactForm>
		</Container>
	);
};

export default Contact;
