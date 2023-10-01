import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

type LayoutProp = {};

const Layout: React.FC<LayoutProp> = ({ children }) => {
	const { asPath, pathname } = useRouter();
	const titleString = asPath.charAt(1).toUpperCase() + asPath.slice(2);

	return (
		<LayoutWrapper>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" />
				<meta name="msapplication-TileColor" content="var(--oex-orange)" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="description"
					content="OrthoEx is the leading healthcare device and equipment, Provider of Medical devices and equipment, serving all segments of healthcare market with a niche in Prosthetics, Orthopaedics, Physiotherapy and Rehabilitation systems and support."
				/>
				<meta
					name="keywords"
					content="OrthoEx is the leading healthcare device and equipment, Provider of Medical devices and equipment, serving all segments of healthcare market with a niche in Prosthetics, Orthopaedics, Physiotherapy and Rehabilitation systems and support."
				/>
				<meta name="author" content="Orthoex Nigeria Limited" />
				<meta name="robots" content="index, follow" />
				<meta name="googlebot" content="index, follow" />
				<meta name="google" content="nositelinkssearchbox" />
				<title>
					{`${
						titleString
							.replace(/-/g, ' ')
							.replace('/', ' ')
							.replace(/\//g, ' > ') || 'Home'
					} | OrthoEx Nigeria`}
				</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta charSet="UTF-8" />
			</Head>
			<Header pathname={pathname} />
			<Main>{children}</Main>
			<Footer pathname={pathname} />
		</LayoutWrapper>
	);
};

export default Layout;

const LayoutWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
`;

const Main = styled.main`
	flex: 1;
`;
