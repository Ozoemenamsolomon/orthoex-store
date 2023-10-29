import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
	Whatsapp,
} from '@styled-icons/bootstrap';
import React from 'react';
import styled from 'styled-components';
import { CTALink } from '../CTA';

type SocialMediaButtonsType = {
	width?: number;
	height?: number;
	color?: string;
	instagramLink?: string;
	twitterLink?: string;
	facebookLink?: string;
	whatsappLink?: string;
	linkedInLink?: string;
};

const socialLinks = {
	facebook: 'https://www.facebook.com/orthoexng',
	instagram: 'https://www.instagram.com/orthoex_nigeria/',
	twitter: 'https://twitter.com/OrthoExNg',
	whatsapp: 'https://wa.me/+2347030324696',
	linkedin: 'https://www.linkedin.com/company/orthoexnigeria/',
};

const SocialMediaButtons: React.FC<SocialMediaButtonsType> = ({
	width,
	height,
	color,
	linkedInLink,
	instagramLink,
	whatsappLink,
	twitterLink,
	facebookLink,
}) => {
	return (
		<SocialsContainer color={color}>
			<CTALink
				className="no-animate"
				isSocial={true}
				target="_blank"
				rel="noopener noreferrer"
				href={facebookLink ? facebookLink : socialLinks.facebook}>
				<Facebook width={width ? width : 18} height={height ? height : 18} />
			</CTALink>
			<CTALink
				className="no-animate"
				isSocial={true}
				target="_blank"
				rel="noopener noreferrer"
				href={instagramLink ? instagramLink : socialLinks.instagram}>
				<Instagram width={width ? width : 18} height={height ? height : 20} />
			</CTALink>
			<CTALink
				isSocial={true}
				className="no-animate"
				target="_blank"
				rel="noopener noreferrer"
				href={linkedInLink ? linkedInLink : socialLinks.linkedin}>
				<Linkedin width={width ? width : 18} height={height ? height : 20} />
			</CTALink>
			<CTALink
				className="no-animate"
				isSocial={true}
				target="_blank"
				rel="noopener noreferrer"
				href={twitterLink ? twitterLink : socialLinks.twitter}>
				<Twitter width={width ? width : 18} height={height ? height : 20} />
			</CTALink>
			<CTALink
				className="no-animate"
				isSocial={true}
				target="_blank"
				rel="noopener noreferrer"
				href={whatsappLink ? whatsappLink : socialLinks.whatsapp}>
				<Whatsapp width={width ? width : 18} height={height ? height : 20} />
			</CTALink>
		</SocialsContainer>
	);
};

const SocialsContainer = styled.div<{ color?: string }>`
	display: flex;
	gap: 1.2rem;

	& > a > button {
		color: ${({ color }) => (color ? color : 'white')};
		padding: 0rem;
		background-color: transparent;
	}
`;

export default SocialMediaButtons;
