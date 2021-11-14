import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { CTA } from '../src/components/Header';
import React, { Fragment } from 'react';
import SooSection from '../src/components/SooSection';

import safeAndReliableIcon from '../src/assets/images/safe-and-reliable-icon.png';

import { HeroComp as Hero } from '../src/components/Hero';
import HeroContent from '../src/components/HeroContent';
import Cards from '../src/components/Cards';
import Contact from '../src/components/Contact';

const Home: NextPage = () => {
	return (
		<Fragment>
			<Link href="jobs/content-writer">view jobs</Link>
		</Fragment>
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
