import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import orthoExLogo from '../assets/images/orthoex-logo-white.png';
import NavLink from './NavLink';
import { Container } from './styled';
import searchIcon from '../assets/new/icons/search.svg';
import accountIcon from '../assets/new/icons/account.svg';
import cartIcon from '../assets/new/icons/shopping-cart.svg';

interface HeaderProp {}

const navLinks = [
	{ name: 'Home', to: '/' },
	{ name: 'Composites', to: '/composites' },
	{ name: 'Orthopaedics', to: '/orthopaedics' },
	{ name: 'About us', to: '/about' },
	{ name: 'Trainings', to: '/trainings' },
	{ name: 'Careers', to: '/careers' },
];
const rightNavLinks = [
	{ name: 'Search', to: '/search', icon: searchIcon },
	{ name: 'Orthopaedics', to: '/account', icon: accountIcon },
	{ name: 'Composites', to: '/cart', icon: cartIcon },
];

const Header: React.FC<HeaderProp> = () => {
	const [scrolled, setScrolled] = useState(false);
	const [isNavOpen, setIsNavOpen] = useState(false);

	const handleScroll = () => {
		const isScrolled = window.scrollY > 0;
		isScrolled !== scrolled ? setScrolled(!scrolled) : setScrolled(false);
	};

	useEffect(() => {
		document.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<SooHeader className={`${scrolled ? 'scrolled' : ''}`}>
			<Container
				paddingMultiplier={2}
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					paddingBlock: '1rem',
				}}
			>
				<Link href="/">
					<a>
						<Logo>
							<Image
								src={orthoExLogo}
								objectPosition="left"
								objectFit="contain"
								layout="fill"
							></Image>
						</Logo>
					</a>
				</Link>
				<HamburgerButton
					onClick={() => setIsNavOpen((prevState) => !prevState)}
				>
					{isNavOpen ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							id="Ebene_1"
							data-name="Ebene 1"
							viewBox="0 0 48.88 40"
							height="32px"
							width="32px"
							fill="currentColor"
						>
							<path d="M28,19.85,39.64,8.18a2.5,2.5,0,0,0-3.53-3.54L24.44,16.31,12.77,4.64A2.5,2.5,0,0,0,9.24,8.18L20.91,19.85,9.24,31.51A2.5,2.5,0,0,0,11,35.78a2.45,2.45,0,0,0,1.76-.73L24.44,23.38,36.11,35.05a2.49,2.49,0,0,0,1.77.73,2.45,2.45,0,0,0,1.76-.73,2.5,2.5,0,0,0,0-3.54Z" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							height="32px"
							id="Layer_1"
							version="1.1"
							viewBox="0 0 32 32"
							width="32px"
							xmlSpace="preserve"
							fill="currentColor"
						>
							<path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
						</svg>
					)}
				</HamburgerButton>
				<NavBar data-nav-open={isNavOpen}>
					<div>
						{navLinks.map((navLink, index) => (
							<NavLink key={`nav-link-${navLink.name}-${index}`} {...navLink} />
						))}
					</div>
					<div
						style={{
							display: 'flex',
						}}
					>
						{rightNavLinks.map((navLink, index) => (
							<NavLink key={`nav-link-${navLink.name}-${index}`} {...navLink} />
						))}
					</div>
				</NavBar>
			</Container>
		</SooHeader>
	);
};

export default Header;

const SooHeader = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100%;
	z-index: 5;
	color: #fff;
	transition: background-color 0.5s ease;
	&.scrolled {
		background-color: #00000097;
		backdrop-filter: blur(4px);
	}
`;
const Logo = styled.div`
	padding: 1rem 1rem;
	height: 4rem;
	position: relative;
	aspect-ratio: 1.5;
	@media (min-width: 600px) {
		aspect-ratio: 2;

		img {
			filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.363));
		}
	}
`;
const NavBar = styled.nav`
	display: flex;
	flex: 1;
	justify-content: end;
	gap: 4rem;
	align-items: center;

	& > div:first-child {
		display: flex;
		gap: 1.5rem;
	}

	& > div > a {
		padding: 0.35rem 0.5rem;
		text-align: center;
	}
	& > div > a.active {
		position: relative;
	}
	& > div > a.active::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		inset-block-end: 0;
		background-color: var(--oex-orange);
		height: 10%;
	}

	@media (max-width: 900px) {
		display: none;
		position: absolute;
		right: 0;
		top: 0;
		height: 100vh;
		justify-content: center;
		flex-direction: column;
		width: 75%;
		background: var(--oex-orange);
		padding: 2rem;
		align-items: stretch;

		&[data-nav-open='true'] {
			display: flex;
		}
	}
`;

export const CTA = styled.button<{ white?: Boolean }>`
	padding: 1.5rem 3rem;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
	transition: all 0.5s ease;

	border: ${({ white }) => (white ? '1px solid var(--oex-orange)' : 'none')};
	background-color: ${(prop) => (prop.white ? 'white' : 'var(--oex-orange)')};
	color: ${(prop) =>
		prop.white ? 'var(--oex-orange)' : 'var(--text-colour-light)'};

	&:not(.no-animate) {
		&:hover {
			color: ${(prop) =>
				prop.white ? 'var(--text-colour-light)' : 'var(--oex-orange)'};
			background-color: ${(prop) =>
				prop.white ? 'var(--oex-orange)' : 'white'};
		}
	}
`;

const HamburgerButton = styled(CTA)`
	padding: 0.3rem 0.6rem;
	align-self: center;
	z-index: 2;

	@media (min-width: 900px) {
		display: none;
	}
`;

export const SocialCTA = styled(CTA)`
	padding: 0.5rem;
	color: black;
	background-color: white;
	border-radius: 9999px;
`;
