import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

type CTAType = {
	white?: Boolean;
	/** class of "no-animate" removes the transition on hover */
	className?: string;
};

const CTA = styled.button<CTAType>`
	padding: 1rem 1rem;
	border-radius: 4px;
	cursor: pointer;
	font-weight: 300;
	transition: all 0.5s ease;
	font-size: 1rem;

	border: ${({ white }) => (white ? '1px solid var(--oex-orange)' : 'none')};
	background-color: ${prop => (prop.white ? 'white' : 'var(--oex-orange)')};
	color: ${prop =>
		prop.white ? 'var(--oex-orange)' : 'var(--text-colour-light)'};

	&:not(.no-animate):hover {
		color: ${prop =>
			prop.white ? 'var(--text-colour-light)' : 'var(--oex-orange)'};
		background-color: ${prop => (prop.white ? 'var(--oex-orange)' : 'white')};
	}
	@media ${prop => prop.theme.breakpoints.above.sm} {
		padding: 1rem 2rem;
		font-size: 1.2rem;
	}
`;

export default CTA;

const SocialCTA = styled(CTA)`
	padding: 0.5rem;
	color: black;
	background-color: white;
	border-radius: 7px;
`;

type CTAProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CTAType;

export const CTALink: FC<
	CTAProps & {
		href: string;
		isSocial?: boolean;
		target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
		rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
	}
> = ({ href, isSocial, target, rel, ...props }) => {
	return href.startsWith('http') ||
		href.startsWith('mailto') ||
		href.startsWith('tel') ||
		isSocial ? (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			style={{ display: 'contents' }}>
			{isSocial ? <SocialCTA {...props} /> : <CTA {...props} />}
		</a>
	) : (
		<Link href={href} rel={rel} style={{ display: 'contents' }}>
			{<CTA {...props} />}
		</Link>
	);
};
