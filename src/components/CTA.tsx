import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

type CTAType = {
	white?: Boolean;
	/** class of "no-animate" removes the transition on hover */
	className?: string;
};

const CTA = styled.button<CTAType>`
	padding: 1rem 2rem;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
	transition: all 0.5s ease;
	font-size: 1.2rem;

	border: ${({ white }) => (white ? '1px solid var(--oex-orange)' : 'none')};
	background-color: ${prop => (prop.white ? 'white' : 'var(--oex-orange)')};
	color: ${prop =>
		prop.white ? 'var(--oex-orange)' : 'var(--text-colour-light)'};

	&:not(.no-animate):hover {
		color: ${prop =>
			prop.white ? 'var(--text-colour-light)' : 'var(--oex-orange)'};
		background-color: ${prop => (prop.white ? 'var(--oex-orange)' : 'white')};
	}
`;

export default CTA;

export const SocialCTA = styled(CTA)`
	padding: 0.5rem;
	color: black;
	background-color: white;
	border-radius: 7px;
`;

type CTAProps = React.ComponentProps<typeof CTA>;

export const CTALink: FC<CTAProps & { href: string; isSocial?: boolean }> = ({
	href,
	isSocial,
	...props
}) => {
	return (
		<Link href={href} legacyBehavior>
			<a style={{ display: 'contents' }}>
				{isSocial ? <SocialCTA {...props} /> : <CTA {...props} />}
			</a>
		</Link>
	);
};
