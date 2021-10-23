import styled from 'styled-components';
import { CTA } from './Header';

const ContactForm = () => {
	return (
		<div>
			<h3>Contact Form</h3>
			<form>
				<div>
					<InputLabelDiv>
						<label htmlFor="name">Name</label>
						<input type="text" id="name" />
					</InputLabelDiv>
					<InputLabelDiv>
						<label htmlFor="email">E-mail</label>{' '}
						<input name="email" type="text" />
					</InputLabelDiv>
					<InputLabelDiv>
						<label htmlFor="message">Message</label>
						<textarea
							name="message"
							id="message"
							cols={30}
							rows={10}
						></textarea>
					</InputLabelDiv>
					<CTA type="submit">Submit</CTA>
				</div>
			</form>{' '}
		</div>
	);
};

export default ContactForm;

const InputLabelDiv = styled.div`
	display: flex;
	flex-direction: column;
`;
