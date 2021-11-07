import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { CTA } from './Header';

type FormValue = {
	name: string;
	email: string;
	phone: string;
	message: string;
};

const ContactForm = () => {
	const [FormValue, setFormValue] = useState<FormValue>({
		name: '',
		email: '',
		phone: '',
		message: '',
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const value = e.currentTarget.value || '';
		const name = e.target.name;
		setFormValue({ ...FormValue, [name]: value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const data = FormValue;

		console.log(FormValue);
	};

	return (
		<div>
			<FormTitle>Let's keep in touch!</FormTitle>
			<form action="https://formspree.io/f/xleayzgl" method="POST">
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<InputLabelDiv>
						{/* <label htmlFor="name">Name</label> */}
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							id="name"
							value={FormValue.name}
						/>
					</InputLabelDiv>
					<InputLabelDiv>
						{/* <label htmlFor="email">E-mail</label>{' '} */}
						<input
							name="email"
							placeholder="E-mail"
							onChange={handleChange}
							type="text"
							value={FormValue.email}
						/>
					</InputLabelDiv>
					<InputLabelDiv>
						{/* <label htmlFor="phone">Phone No.</label>{' '} */}
						<input
							name="phone"
							placeholder="Phone No."
							onChange={handleChange}
							type="text"
							value={FormValue.phone}
						/>
					</InputLabelDiv>
					<InputLabelDiv>
						{/* <label htmlFor="message" placeholder="Message">
							Message
						</label> */}
						<textarea
							name="message"
							id="message"
							onChange={handleChange}
							cols={30}
							rows={7}
							value={FormValue.message}
						></textarea>
					</InputLabelDiv>
					<CTA style={{ alignSelf: 'flex-end' }} type="submit">
						Submit
					</CTA>
				</div>
			</form>{' '}
		</div>
	);
};

export default ContactForm;

const FormTitle = styled.h3`
	color: var(--oex-orange);
	text-align: center;
`;

const InputLabelDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.51rem;
	& > label {
		margin-bottom: 0.2rem;
	}
	& > input,
	& > textarea {
		border-radius: 1rem;
		border: none;
		padding: 0.6rem 0.5rem;
		resize: vertical;
	}
`;
