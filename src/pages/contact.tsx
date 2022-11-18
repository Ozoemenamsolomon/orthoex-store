import React from "react";
import styled from "styled-components";
import EmailIcon from "@assets/icons/contact/email-icon_ImgID1.png";
import FacebookIcon from "@assets/icons/contact/facebook-icon_ImgID1.png";
import InstagramIcon from "@assets/icons/contact/instagram-icon_ImgID1.png";
import LinkedInIcon from "@assets/icons/contact/linkedin-icon_ImgID1.png";
import LocationIcon from "@assets/icons/contact/Location-icon_ImgID1.png";
import PhoneIcon from "@assets/icons/contact/phone-icon_ImgID1.png";
import TwitterIcon from "@assets/icons/contact/twitter-icon_ImgID1.png";
import WhatsappIcon from "@assets/icons/contact/whatsapp-icon_ImgID1.png";
import ContactBG from "@assets/images/contact-background.jpg";
import CTA from "@components/CTA";
import { HeroComp as Hero } from "@components/Hero";
import HeroContent from "@components/HeroContent";
import ServiceCard, { ServiceCardType } from "@components/ServiceCard";
import SooSection from "@components/SooSection";
import { Container, ServicesCards } from "@components/styled";

const contacts: ServiceCardType[] = [
	{
		description: "10, Ipakodo, Wharf-road, Off Ebute Ikorodu Lagos Nigeria",
		image: LocationIcon,
		title: "OUR HEAD OFFICE",
		cta: <CTA>ROUTE</CTA>,
	},
	{
		description: "+2347030324696",
		image: PhoneIcon,
		title: "PHONE NUMBER",
		cta: <CTA>DIAL NO.</CTA>,
	},
	{
		description: "+2347030324696",
		image: WhatsappIcon,
		title: "WHATSAPP",
		cta: <CTA>LIVE CHAT</CTA>,
	},
	{
		description: "info@orthoex.ng",
		image: EmailIcon,
		title: "EMAIL",
		cta: <CTA>SEND</CTA>,
	},
];

const connects: ServiceCardType[] = [
	{
		description: "@orthoex",
		image: FacebookIcon,
		cta: <CTA>CONNECT</CTA>,
	},
	{
		description: "@orthoex_nigeria",
		image: InstagramIcon,
		cta: <CTA>CONNECT</CTA>,
	},
	{
		description: "@orthoex nigeria",
		image: LinkedInIcon,
		cta: <CTA>CONNECT</CTA>,
	},
	{
		description: "@OrthoExNg",
		image: TwitterIcon,
		cta: <CTA>CONNECT</CTA>,
	},
];

const Contact = () => {
	return (
		<>
			<Hero bg={ContactBG}>
				<HeroContent
					title={"We'd love to hear from you!"}
					claim={
						"Whether you are curious about our products or excited about a career with us, or even press - We are happy to answer all your questions."
					}
				/>
			</Hero>
			<Container>
				<SooSection>
					<h2
						style={{
							textAlign: "center",
						}}
					>
						You can contact us through any of this means
					</h2>
					<ServicesCards>
						{contacts.map((quality, index) => (
							<ServiceCard key={index} imagePadding service={quality} />
						))}
					</ServicesCards>
				</SooSection>
				<SooSection
					style={{
						display: "grid",
						gap: "2rem",
						gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
						alignItems: "center",
					}}
				>
					<div>
						<h2
							style={{
								textAlign: "center",
							}}
						>
							Have some questions?
						</h2>
						<ContactForm>
							<input type="tel" placeholder="Your Whatsapp Number" />
							<input type="email" placeholder="Your email" />
							<textarea name="" id="" placeholder="Your question" rows={10} />
							<CTA type="submit">Subscribe</CTA>
						</ContactForm>
					</div>
					<div>
						<h2>Find us</h2>
						<p>MON-FRI: 9:00AM-5:00PM</p>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2395778088708!2d3.4731817140660928!3d6.617130095214905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bec34b48667c3%3A0x9186383a9ee62db4!2sOrthoEx%20Nigeria%20Limited!5e0!3m2!1sen!2sde!4v1649617894026!5m2!1sen!2sde"
							width="100%"
							style={{ border: 0, aspectRatio: "6/5" }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</SooSection>
				<SooSection style={{ maxWidth: "700px", textAlign: "center" }}>
					<h2>Stay Connected</h2>
					Are you following us on our social media channels? We're constantly
					sharing product news and event updates. Click the icon below to follow
					your favorite brand.
				</SooSection>
				<SooSection>
					<ServicesCards>
						{connects.map((quality, index) => (
							<ServiceCard key={index} imagePadding service={quality} />
						))}
					</ServicesCards>
				</SooSection>
			</Container>
		</>
	);
};

export default Contact;

const ContactForm = styled.form`
	display: flex;
	gap: 1rem;
	flex: 1;
	flex-direction: column;
	max-width: 350px;
	margin: auto;

	input,
	textarea {
		padding: 0.51rem;
		resize: vertical;
	}
`;
