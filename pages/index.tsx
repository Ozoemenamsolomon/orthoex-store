import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { CTA } from '../src/components/Header';
import React from 'react';
import SooSection from '../src/components/SooSection';

import safeAndReliableIcon from '../src/assets/images/safe-and-reliable-icon.png';

import { HeroComp as Hero } from '../src/components/Hero';
import HeroContent from '../src/components/HeroContent';
import Cards from '../src/components/Cards';
import Contact from '../src/components/Contact';

const Home: NextPage = () => {
	return (
		<Layout>
			<Hero content={HeroContent({})} />
		</Layout>
	);
};

export default Home;

export const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	padding: 0 2rem;
	@media (max-width: 600px) {
		& {
			padding: 0 1rem;
		}
	}
`;
