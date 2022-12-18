import ImageInfoHeader, {
	ImageInfoHeaderType,
} from '@components/ImageInfoHeader';
import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import LadyImage from '@assets/new/images/home/customer-service.jpg';
import CallAgent from '@assets/new/icons/contact/CallAgent';
import FaqDouble from '@assets/new/icons/contact/FaqDouble';
import FaqSingle from '@assets/new/icons/contact/FaqSingle';
import Message from '@assets/new/icons/contact/Message';
import Email from '@assets/new/icons/contact/Email';
import Partner from '@assets/new/icons/contact/Partner';
// import MapImage from '@assets/new/images/contact/map-image.jpg';
import InfoText from '@components/InfoText';
import { Container } from '@components/styled';
import HeaderParagraph, {
	HeaderParagraphType,
} from '@components/shared/HeaderParagraph';
import {
	StyledFormButtonControl,
	StyledFormControl,
	StyledFormWrapper,
} from '@components/styled/Forms';
import CTA from '@components/CTA';
import Address from '@components/shared/Address';
import SocialMediaButtons from '@components/shared/SocialMediaButtons';
import SupportInfo, { SupportInfoType } from '@components/SupportInfo';
import CallIcon from '@assets/new/icons/CallIcon';
import WhatsappIcon from '@assets/new/icons/WhatsappIcon';

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
				'Interested in any of our products? We’d love to hear from you! Contact our product experts',
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
	const [formData, setformData] = useState({
		fullname: '',
		email: '',
		phone: '',
		message: '',
	});

	const { fullname, email, message, phone } = formData;

	type InputChangeType =
		| React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLTextAreaElement>;
	const onInputChange = (e: InputChangeType) => {
		setformData(prev => ({ ...prev, [e.target.id]: e.target.value }));
	};

	return (
		<StyledContactWrapper>
			<Container paddingMultiplier={0}>
				<ImageInfoHeader data={data} />
				<SupportInfo data={supportInfoData} />
				<HeaderParagraph data={headingData} />

				<StyledMapForm>
					<StyledMapSection>
						<StyledMapHolder>
							<Image
								src={LadyImage}
								style={{
									objectFit: 'cover',
								}}
								fill
								alt="map image"
							/>
							<CTA>View on map</CTA>
						</StyledMapHolder>
						<Address />
					</StyledMapSection>

					<StyledFormSection>
						<StyledFormWrapper>
							<form action="">
								<StyledFormControl>
									<label htmlFor="fullName">Full Name</label>
									<input
										type="text"
										id="fullname"
										name="fullname"
										onChange={onInputChange}
										placeholder="Enter your full name here"
										value={fullname}
									/>
								</StyledFormControl>

								<StyledFormControl>
									<label htmlFor="email">Email Address</label>
									<input
										type="text"
										id="email"
										name="email"
										onChange={onInputChange}
										placeholder="Enter your email address here"
										value={email}
									/>
								</StyledFormControl>
								<StyledFormControl>
									<label htmlFor="phone">Phone Number</label>
									<input
										type="text"
										id="phone"
										name="phone"
										onChange={onInputChange}
										placeholder="Enter your phone number here"
										value={phone}
									/>
								</StyledFormControl>

								<StyledFormControl>
									<label htmlFor="message">Message</label>
									<textarea
										name="message"
										id="message"
										placeholder="Enter your message here"
										onChange={onInputChange}
										value={message}
										cols={30}
										rows={10}
									/>
								</StyledFormControl>

								<StyledFormButtonControl>
									<CTA>Send message</CTA>
								</StyledFormButtonControl>
							</form>
						</StyledFormWrapper>
					</StyledFormSection>
				</StyledMapForm>
			</Container>
			<InfoText
				title={"Let's stay connected"}
				description={
					'Are you following us on our social media channels? We’re constantly sharing product news and event updates. Click the icon below to follow your favourite brand.'
				}>
				<SocialMediaButtons
					height={20}
					width={15}
					color={'var(--oex-orange)'}
				/>
			</InfoText>
		</StyledContactWrapper>
	);
};

export default Contact;

const StyledContactWrapper = styled.div`
	margin: 7rem 0rem 0rem;
`;

const StyledMapForm = styled.div`
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5rem;
		flex-direction: row-reverse;
	}
`;

const StyledFormSection = styled.div`
	@media (min-width: 768px) {
		width: 50%;
	}
`;

const StyledMapSection = styled.div`
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		width: 50%;
	}
`;

const StyledMapHolder = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;

	& > button {
		font-size: 0.7rem;
		width: 80%;
		padding: 0.7rem 1rem;
		position: absolute;
		top: 45%;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	@media (min-width: 768px) {
		& > button {
			width: 50%;
			margin: 0 auto;
		}
	}
`;
