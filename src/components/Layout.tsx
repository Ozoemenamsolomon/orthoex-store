import React, { FC } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

type LayoutProp = {};

const Layout: React.FC<LayoutProp> = ({ children }) => {
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
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#00aba9" />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<Header />
			<Main>{children}</Main>
			<Footer />
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
	/* justify-content: center;
	display: flex;
	flex-direction: column; */
`;
