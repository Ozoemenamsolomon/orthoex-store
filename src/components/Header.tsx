import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import orthoExLogo from '@assets/images/orthoex-logo-white.png';
import orthoExLogoCol from '@assets/new/images/orthoex-logo-coloured.png';
import NavLink from './NavLink';
import { Container } from './styled';
import SearchIcon from '@assets/new/icons/Search';
import SccountIcon from '@assets/new/icons/Account';
import CartIcon from '@assets/new/icons/ShoppingCart';
import CTA from './CTA';

type HeaderProp = { pathname: string };

const navLinks = [
	{ name: 'Home', to: '/' },
	{ name: 'Composites', to: '/composites' },
	{ name: 'Orthopaedics', to: '/orthopaedics' },
	{ name: 'About us', to: '/about' },
	{ name: 'Trainings', to: '/trainings' },
	{ name: 'Careers', to: '/careers' },
];
const rightNavLinks = [
	{ name: 'Search', to: '/search', Icon: SearchIcon },
	{ name: 'Orthopaedics', to: '/account', Icon: SccountIcon },
	{ name: 'Composites', to: '/cart', Icon: CartIcon },
];

const Header: React.FC<HeaderProp> = ({ pathname }) => {
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

	const light =
		pathname.includes('categories') || pathname.includes('products');

	return (
		<>
			<SooHeader className={`${scrolled ? 'scrolled' : ''}`}>
				<Container
					paddingMultiplier={2}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						paddingBlock: '1rem',
					}}>
					<Link href="/">
						<a>
							<Logo>
								<Image
									src={light ? orthoExLogoCol : orthoExLogo}
									objectPosition="left"
									objectFit="contain"
									layout="fill"></Image>
							</Logo>
						</a>
					</Link>
					<HamburgerButton
						onClick={() => setIsNavOpen(prevState => !prevState)}>
						{isNavOpen ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								id="Ebene_1"
								data-name="Ebene 1"
								viewBox="0 0 48.88 40"
								height="32px"
								width="32px"
								fill="currentColor">
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
								fill="currentColor">
								<path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
							</svg>
						)}
					</HamburgerButton>

					<NavBar className={light ? 'light' : undefined}>
						<div>
							{navLinks.map((navLink, index) => (
								<NavLink
									key={`nav-link-${navLink.name}-${index}`}
									{...navLink}
								/>
							))}
						</div>
						<div
							style={{
								display: 'flex',
							}}>
							{rightNavLinks.map((navLink, index) => (
								<NavLink
									key={`nav-link-${navLink.name}-${index}`}
									{...navLink}
									icon={() => (
										<navLink.Icon colour={light ? 'black' : 'white'} />
									)}
								/>
							))}
						</div>
					</NavBar>
				</Container>
			</SooHeader>

			{isNavOpen && (
				<StyledSideBar>
					<StyledCloseIcon onClick={() => setIsNavOpen(prev => !prev)}>
						<svg
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.40994 7.00019L12.7099 2.71019C12.8982 2.52188 13.004 2.26649 13.004 2.00019C13.004 1.73388 12.8982 1.47849 12.7099 1.29019C12.5216 1.10188 12.2662 0.996094 11.9999 0.996094C11.7336 0.996094 11.4782 1.10188 11.2899 1.29019L6.99994 5.59019L2.70994 1.29019C2.52164 1.10188 2.26624 0.996094 1.99994 0.996094C1.73364 0.996094 1.47824 1.10188 1.28994 1.29019C1.10164 1.47849 0.995847 1.73388 0.995847 2.00019C0.995847 2.26649 1.10164 2.52188 1.28994 2.71019L5.58994 7.00019L1.28994 11.2902C1.19621 11.3831 1.12182 11.4937 1.07105 11.6156C1.02028 11.7375 0.994141 11.8682 0.994141 12.0002C0.994141 12.1322 1.02028 12.2629 1.07105 12.3848C1.12182 12.5066 1.19621 12.6172 1.28994 12.7102C1.3829 12.8039 1.4935 12.8783 1.61536 12.9291C1.73722 12.9798 1.86793 13.006 1.99994 13.006C2.13195 13.006 2.26266 12.9798 2.38452 12.9291C2.50638 12.8783 2.61698 12.8039 2.70994 12.7102L6.99994 8.41019L11.2899 12.7102C11.3829 12.8039 11.4935 12.8783 11.6154 12.9291C11.7372 12.9798 11.8679 13.006 11.9999 13.006C12.132 13.006 12.2627 12.9798 12.3845 12.9291C12.5064 12.8783 12.617 12.8039 12.7099 12.7102C12.8037 12.6172 12.8781 12.5066 12.9288 12.3848C12.9796 12.2629 13.0057 12.1322 13.0057 12.0002C13.0057 11.8682 12.9796 11.7375 12.9288 11.6156C12.8781 11.4937 12.8037 11.3831 12.7099 11.2902L8.40994 7.00019Z"
								fill="#2E2E2E"
							/>
						</svg>
					</StyledCloseIcon>
					<StyledSideBarContent>
						<StyledSideBarNavLink>
							{navLinks.map((navLink, index) => (
								<li
									style={{
										color: `${
											navLink.to === pathname ? 'var(--oex-orange)' : ''
										}`,
									}}
									key={`nav-link-${navLink.name}-${index}`}
									onClick={() => setIsNavOpen(prev => !prev)}>
									<Link href={navLink.to}>{navLink.name}</Link>
								</li>
							))}
						</StyledSideBarNavLink>
					</StyledSideBarContent>
					<StyledButton>Find a representative</StyledButton>
				</StyledSideBar>
			)}
		</>
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
		background-color: #00000089;
		color: white;
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
		color: var(--oex-orange);
	}
	&.light {
		color: black;
	}

	/* & > div > a.active::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		inset-block-end: 0;
		background-color: var(--oex-orange);
		height: 10%;
	} */

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

const HamburgerButton = styled(CTA)`
	padding: 0.3rem 0.6rem;
	align-self: center;
	z-index: 2;

	@media (min-width: 900px) {
		display: none;
	}
`;

const StyledSideBar = styled.div`
	padding: 2rem 1rem;
	position: fixed;
	z-index: 10000;
	height: 100vh;
	top: 0;
	right: 0;
	background-color: var(--oex-off-white);
	transition: 850ms;
	width: 100vw;
`;

const StyledSideBarContent = styled.div`
	margin-top: 4rem;
`;

const StyledCloseIcon = styled.span`
	position: absolute;
	right: 2rem;
	/* pointer: cursor;

	&:hover {
		pointer: cursor;
	} */
`;

const StyledSideBarNavLink = styled.ul`
	padding: 0;
	margin: 0;

	& > li {
		list-style-type: none;
		margin-bottom: 3rem;
		padding: 0;
	}
`;

const StyledButton = styled.button`
	color: white;
	background-color: var(--oex-orange);
	border: none;
	padding: 1.2rem 1rem;
	border-radius: 0.5rem;
	width: 100%;
	font-size: 1rem;
`;
