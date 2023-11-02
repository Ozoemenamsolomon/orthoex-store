import AccountIcon from '@assets/new/icons/Account';
import HamburgerIcon from '@assets/new/icons/HamburgerIcon';
import SearchIcon from '@assets/new/icons/Search';
import CartIcon from '@assets/new/icons/ShoppingCart';
import orthoExLogoCol from '@assets/new/logos/orthoex-logo-coloured.svg';
import orthoExLogo from '@assets/new/logos/orthoex-logo-white.svg';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useCart } from 'context/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CTALink } from './CTA';
import NavLink from './NavLink';
import { Container } from './styled';

type HeaderProp = { pathname: string };

const Header: React.FC<HeaderProp> = ({ pathname }) => {
	const [scrollOffset, setScrollOffset] = useState(0);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [light, setLight] = useState(false);

	useEffect(() => {
		setLight(
			!(
				pathname.split('/')[1] === '' ||
				pathname.split('/')[1] === 'orthopaedics' ||
				(pathname.split('/')[1] === 'composites' &&
					!/\/composites\/(\w)+/.test(pathname))
			),
		);

		const handleScroll = () => {
			setScrollOffset(window.scrollY);
		};

		if (light) {
			return;
		}
		document.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, [pathname, light]);

	return (
		<>
			<SooHeader
				light={light}
				className={`${scrollOffset > 0 ? 'scrolled' : ''}`}>
				<Container
					paddingMultiplier={2}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						paddingBlock: '1rem',
					}}>
					<Link href="/">
						<Logo>
							<Image
								src={light ? orthoExLogoCol : orthoExLogo}
								style={{ objectPosition: 'left' }}
								object-fit="contain"
								alt="OrthoEx Logo"
								fill
							/>
						</Logo>
					</Link>
					<CartHamburgerContainer>
						<NavLink name="Cart" to="/cart" icon={CartIcon} isRight />
						<HamburgerButton onClick={() => setIsNavOpen(true)}>
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
								<HamburgerIcon colour={light ? 'black' : 'currentColor'} />
							)}
						</HamburgerButton>
					</CartHamburgerContainer>
					<NavBar className={light ? 'light' : undefined}>
						<LeftNav />
						<RightNav light={light} />
					</NavBar>
				</Container>
			</SooHeader>

			{isNavOpen && (
				<StyledSideBar
					onClick={e => {
						setIsNavOpen(prev => !prev);
					}}>
					<StyledCloseIcon onClickCapture={() => setIsNavOpen(false)}>
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
						<LeftNav forMobile />
						<hr
							style={{
								border: '1px solid #E5E5E5',
								margin: '1rem 0',
							}}
						/>
						<RightNav forMobile light={light} />
					</StyledSideBarContent>
					<CTALink
						className="full-width"
						href="/contact"
						onClick={() => setIsNavOpen(prevState => !prevState)}>
						Contact Us
					</CTALink>
				</StyledSideBar>
			)}
		</>
	);
};

export default Header;

const RightNav: FC<{
	light: boolean;
	forMobile?: boolean;
}> = ({ light, forMobile = false }) => {
	const { user } = useUser();

	const { cart } = useCart();

	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

	const rightNavLinks = [
		{ name: 'Search', to: '/search', Icon: SearchIcon },
		{ name: 'Account', to: '/account/overview', Icon: AccountIcon },
		...(user ? [{ name: 'Cart', to: '/cart', Icon: CartIcon }] : []),
	];

	return (
		<RightNavWrapper>
			{rightNavLinks.map((navLink, index) => (
				<NavLink
					key={`nav-link-2-${navLink.name}-${index}`}
					isRight={true}
					{...navLink}
					icon={() => (
						<navLink.Icon
							colour={forMobile ? 'black' : light ? 'black' : 'white'}
							{...(navLink.name === 'Cart' ? { totalItems } : {})}
						/>
					)}
				/>
			))}
		</RightNavWrapper>
	);
};

const RightNavWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		flex-direction: row;
		gap: 0.5rem;
	}
`;
const LeftNav: FC<{ forMobile?: boolean }> = ({ forMobile = false }) => {
	const navLinks = [
		{ name: 'Home', to: '/' },
		{ name: 'Composites', to: '/composites' },
		{ name: 'Orthopaedics', to: '/orthopaedics' },
		{ name: 'Trainings', to: '/trainings' },
		{ name: 'Rehabspace', to: '/rehabspace' },
		{ name: 'About us', to: '/about' },
		{ name: 'Careers', to: '/careers' },
	];

	return (
		<LeftNavWrapper>
			{navLinks.map((navLink, index) => (
				<NavLink key={`nav-link-2-${navLink.name}-${index}`} {...navLink} />
			))}
		</LeftNavWrapper>
	);
};

const LeftNavWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	& > a {
		padding: 0.35rem 0.5rem;
		&.active {
			position: relative;
			color: var(--oex-orange);
		}
	}

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		flex-direction: row;
		& > a {
			text-align: center;
		}
	}
`;

const SooHeader = styled.header<{ light: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 5;
	color: #fff;
	transition: background-color 0.5s ease;
	${({ light }) =>
		light
			? `
			position: sticky;
			top:0; 
			background-color: white;
    		box-shadow: 0px 1px 3px #d6d6d6;
			`
			: `
			position: fixed;
			width: 100%;
			&.scrolled {
				background-color: #00000089;
				color: white;
				backdrop-filter: blur(4px);
			}`}
`;
const Logo = styled.div`
	padding: 1rem 1rem;
	height: 4rem;
	position: relative;
	aspect-ratio: 1.5;

	@media ${({ theme }) => theme.breakpoints.above.sm} {
		aspect-ratio: 2;
	}
`;
const NavBar = styled.nav`
	display: flex;
	flex: 1;
	justify-content: end;
	gap: 4rem;
	align-items: center;

	&.light {
		color: black;
	}

	&:not(.light) > div > a.active::after {
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

const HamburgerButton = styled.span`
	/* z-index: 2; */
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

	.full-width {
		width: 100%;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: none;
	}
`;

const StyledSideBarContent = styled.div`
	margin-block: 4rem 2rem;
`;

const StyledCloseIcon = styled.button`
	border: none;
	background: none;
	position: absolute;
	right: 2rem;
`;

const CartHamburgerContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;

	> a > span {
		display: none;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: none;
	}
`;
