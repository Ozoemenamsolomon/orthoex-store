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

export const CTAFlex = styled(CTA)`

	font: inherit;
	padding: 0.5rem;
	width: 100%;
	border-radius: 0.2rem;
	border: 0.09rem solid var(--oex-orange);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

@media(min-width: 768px){
		padding: 0.3rem 0.1rem;
		gap: 0.1rem;
		font-size: 0.7rem;
}

@media(min-width: 900px){
		padding: 0.5rem 0.5rem;
		gap: 0.7rem;
		font-size: 1rem;
}
`;

type CTAProps = React.ComponentProps<typeof CTA>;

export const CTALink: FC<CTAProps & { href: string; isSocial?: boolean }> = ({
	href,
	isSocial,
	...props
}) => {
	return (
		<Link href={href}>
			<a style={{ display: 'contents' }}>
				{isSocial ? <SocialCTA {...props} /> : <CTA {...props} />}
			</a>
		</Link>
	);
};
