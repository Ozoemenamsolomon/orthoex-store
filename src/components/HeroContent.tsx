import { FC } from 'react';
import styled from 'styled-components';
import { CTA } from './Header';
import ContactForm from './ContactForm';

const HeroContentComp: FC = () => {
	const callUs = () => {
		window.open('tel://+2347030324696', '_self');
	};
	return (
		<HeroContent>
			<HeroTitle>
				We are your preferred <br /> partner of choice for quality!
			</HeroTitle>
			<CTA onClick={callUs}>Contact Us</CTA>
			<FormContainer>
				<ContactForm />
			</FormContainer>
		</HeroContent>
	);
};

export default HeroContentComp;

const HeroContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	position: relative;
	width: 100%;
	gap: 2rem;
`;

const HeroTitle = styled.h1``;

const HeroClaim = styled.p`
	@media (max-width: 600px) {
		text-align: justify;
	}
`;
const FormContainer = styled.div`
	/* width: min(100%, 300px); */
	width: 100%;
	align-self: center;
	padding: 1rem;
	background-color: white;
	box-shadow: var(--soo-shadow);
	color: var(--text-colour);

	border-radius: 15px;
	@media (min-width: 600px) {
		/* position: absolute; */
		/* right: 5rem;
		bottom: -10rem; */
	}
	@media (max-width: 900px) {
		bottom: -15rem;
	}
`;
