import React, { FC } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

type LayoutProp = {};

const Layout: React.FC<LayoutProp> = ({ children }) => {
	return (
		<LayoutWrapper>
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
`;

const Main = styled.main`
	flex: 1;
	padding: 0 1rem;
	justify-content: center;
	display: flex;
`;
