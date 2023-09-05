import CallIcon from '@assets/new/icons/CallIcon';
import CallAgent from '@assets/new/icons/contact/CallAgent';
import Email from '@assets/new/icons/contact/Email';
import FaqDouble from '@assets/new/icons/contact/FaqDouble';
import FaqSingle from '@assets/new/icons/contact/FaqSingle';
import Message from '@assets/new/icons/contact/Message';
import Partner from '@assets/new/icons/contact/Partner';
import WhatsappIcon from '@assets/new/icons/WhatsappIcon';
import LadyImage from '@assets/new/images/home/customer-service.jpg';
import CTA from '@components/CTA';
import ImageInfoHeader, {
	ImageInfoHeaderType,
} from '@components/ImageInfoHeader';
import InfoText from '@components/InfoText';
import ThankYou from '@components/sections/ThankYou';
import HeaderParagraph, {
	HeaderParagraphType,
} from '@components/shared/HeaderParagraph';
import SocialMediaButtons from '@components/shared/SocialMediaButtons';
import { Container } from '@components/styled';
import { FormControl, StyledFormButtonControl } from '@components/styled/Forms';
import SupportInfo, { SupportInfoType } from '@components/SupportInfo';
import { useForm, ValidationError } from '@formspree/react';
import styled from 'styled-components';

const data: ImageInfoHeaderType = {
	image: LadyImage,
	heading: "We'd love to hear from you!",
	paragraph:
		'Whether you are curious about our products or excited about a career with us, or even press - We are happy to answer all your questions.',
};

const headingData: HeaderParagraphType = {
	heading: 'For other inquiries',
	paragraph:
		"Let's get the conversation started. We'd get back to you as soon as we recieve your message",
};

const supportInfoData: SupportInfoType = {
	header: 'Our teams are here to help',
	cardDetail: [
		{
			CardIcon: CallAgent,
			title: 'Sales and Product support',
			paragraph:
				"Interested in any of our products? We'd love to hear from you! Contact our product experts",
			buttons: [
				{ title: 'Call', link: 'tel:+2347030324696', Icon: CallIcon },
				{ title: 'Chat', link: 'https://wa.me/+2347030324696', Icon: Message },
			],
		},
		{
			CardIcon: Partner,
			title: 'New partnerships',
			paragraph:
				'We welcome interested brands around the world for possible partnerships with us. ',
			buttons: [
				{ title: 'Email', link: 'mailto:store@orthoex.ng', Icon: Email },
				{
					title: 'Whatsapp',
					link: 'https://wa.me/+2347030324696',
					Icon: WhatsappIcon,
				},
			],
		},
		{
			CardIcon: FaqDouble,
			title: 'Product FAQs',
			paragraph:
				'Find a list of answers to the most popular questions that are asked',
			buttons: [{ title: 'View FAQ', link: '', Icon: FaqSingle }],
		},
	],
};

const Contact = () => {
	const [formState, handleSubmit] = useForm('xnqyagge');

	return (
		<StyledContactWrapper>
			<Container paddingMultiplier={0}>
				<ImageInfoHeader data={data} />
				<SupportInfo data={supportInfoData} />
				<HeaderParagraph data={headingData} />

				<StyledMapForm>
					<StyledMapSection>
						<iframe
							style={{ border: 'none' }}
							width="100%"
							height="300"
							src="https://maps.google.com/maps?q=Orthoex%20nigeria%20limited+(Orthoex%20Nigeria%20Limited)&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;width=100%25&amp;height=300&amp;hl=en&amp;output=embed"></iframe>
					</StyledMapSection>
					<StyledFormSection>
						{formState.succeeded ? (
							<ThankYou
								show={formState.succeeded}
								reason={'for contacting us!'}></ThankYou>
						) : (
							<form onSubmit={handleSubmit}>
								<FormControl>
									<label htmlFor="fullName">Full Name</label>
									<input
										type="text"
										id="fullname"
										name="fullname"
										required
										placeholder="John Doe"
									/>
									<ValidationError
										prefix="Full Name"
										field="fullname"
										errors={formState.errors}
									/>
								</FormControl>

								<FormControl>
									<label htmlFor="email">Email Address</label>
									<input
										type="email"
										id="email"
										required
										name="email"
										placeholder="john@email.com"
									/>
									<ValidationError
										prefix="Email"
										field="email"
										errors={formState.errors}
									/>
								</FormControl>
								<FormControl>
									<label htmlFor="phone">Phone Number</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										placeholder="+2347000000000"
									/>
									<ValidationError
										prefix="phone number"
										field="phone"
										errors={formState.errors}
									/>
								</FormControl>

								<FormControl>
									<label htmlFor="message">Message</label>
									<textarea
										name="message"
										id="message"
										placeholder="Enter your message here"
										cols={30}
										rows={10}
										required
									/>
									<ValidationError
										prefix="Message"
										field="message"
										errors={formState.errors}
									/>
								</FormControl>

								<StyledFormButtonControl>
									<CTA type="submit">Send message</CTA>
								</StyledFormButtonControl>
							</form>
						)}
					</StyledFormSection>
				</StyledMapForm>
			</Container>
			<InfoText
				title={"Let's stay connected"}
				description={
					"Are you following us on our social media channels? We're constantly sharing product news and event updates. Click the icon below to follow your favourite brand."
				}>
				<SocialMediaButtons height={20} width={15} color={'white'} />
			</InfoText>
		</StyledContactWrapper>
	);
};

export default Contact;

const StyledContactWrapper = styled.div`
	margin: 7rem 0rem 0rem;
`;

const StyledFormSection = styled.div`
	flex: 1;
	padding: 2rem 0.5rem;
	border: 1px solid var(--oex-light-grey);
	border-radius: 0.2rem;
`;

const StyledMapForm = styled.div`
	margin-bottom: 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5rem;
		flex-direction: row-reverse;
	}
`;

const StyledMapSection = styled.div`
	margin-bottom: 2rem;
	flex: 1;
`;
