import styled from 'styled-components';
import { Container } from '../../pages';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../assets/images/oex-white-logo.png';
import orthoExLogo from '../assets/images/orthoex-logo.png';
import React, { useEffect, useState } from 'react';

interface HeaderProp {}

const Header: React.FC<HeaderProp> = () => {
	const [scrolled, setScrolled] = useState(false);

	const handleScroll = () => {
		const isScrolled = window.scrollY > 10;
		if (isScrolled !== scrolled) {
			setScrolled(!scrolled);
		}
	};

	useEffect(() => {
		document.addEventListener('scroll', handleScroll, { passive: true });
	});

	return (
		<SooHeader className={`${scrolled ? 'scrolled' : ''}`}>
			<Container
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Logo>
					<Link href="/">
						<a>
							<Image
								src={logo}
								objectPosition="left"
								objectFit="contain"
								layout="fill"
							></Image>
						</a>
					</Link>
				</Logo>
				<NavBar>
					<a href="https://www.orthoex.ng" target="_blank" rel="noref">
						<Logo>
							<Image
								src={orthoExLogo}
								objectPosition="left"
								objectFit="contain"
								layout="fill"
							></Image>
						</Logo>
					</a>
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
	transition: background-color 0.5s ease;
	&.scrolled {
		background-color: #00000092;
	}
`;
const Logo = styled.div`
	padding: 1rem 1rem;
	height: 4rem;
	width: 5rem;
	position: relative;
`;
const NavBar = styled.nav`
	display: flex;
	align-items: center;
`;

export const CTA = styled.button<{ white?: Boolean }>`
	--border-radius: 99999px;

	padding: 0.8rem 2rem;
	border: none;
	border-radius: var(--border-radius);
	cursor: pointer;
	background-color: ${(prop) => (prop.white ? 'white' : 'var(--oex-orange)')};
	color: ${(prop) =>
		prop.white ? 'var(--text-colour-dark)' : 'var(--text-colour-light)'};
	font-weight: bold;
	transition: all 0.5s ease;
	/* text-transform: uppercase; */
	&:hover {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.363);
	}
`;
