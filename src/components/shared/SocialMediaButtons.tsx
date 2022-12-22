import React from 'react';
import { CTALink } from '../CTA';
import styled from 'styled-components';
import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from '@styled-icons/bootstrap';

type SocialMediaButtonsType = {
	width?: number;
	height?: number;
	color?: string;
};

const SocialMediaButtons: React.FC<SocialMediaButtonsType> = ({
	width,
	height,
	color,
}) => {
	return (
		<SocialsContainer color={color}>
			<CTALink
				className="no-animate"
				isSocial={true}
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.facebook.com/orthoexng">
				<Facebook width={width ? width : 18} height={height ? height : 18} />
			</CTALink>
			<CTALink
				className="no-animate"
				isSocial={true}
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.instagram.com/orthoex_nigeria/">
				<Instagram width={width ? width : 18} height={height ? height : 20} />
			</CTALink>
			<CTALink
				isSocial={true}
				className="no-animate"
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.linkedin.com/company/orthoexnigeria/">
				<Linkedin width={width ? width : 18} height={height ? height : 20} />
			</CTALink>
			<CTALink
				className="no-animate"
				isSocial={true}
				target="_blank"
				rel="noopener noreferrer"
				href="https://twitter.com/OrthoExNg">
				<Twitter width={width ? width : 18} height={height ? height : 20} />
			</CTALink>
		</SocialsContainer>
	);
};

export const SocialsContainer = styled.div<{ color?: string }>`
	display: flex;
	gap: 1.2rem;

	& > a > button {
		color: white;
		padding: 0rem;
		background-color: transparent;
	}
`;

export default SocialMediaButtons;
