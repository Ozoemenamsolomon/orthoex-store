import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import styled from 'styled-components';
import Head from 'next/head';
import { CTA } from '../src/components/Header';
import React from 'react';
import SooSection from '../src/components/SooSection';

import { HeroComp as Hero } from '../src/components/Hero';
import HeroContent from '../src/components/HeroContent';
import Cards from '../src/components/Cards';
import Contact from '../src/components/Contact';

const Home: NextPage = () => {
	return (
		<Layout>
			<Hero content={HeroContent({})} />
			<Container style={{ margin: 'auto' }}>
				<SooSection title="We are helping to grow your business">
					<Cards />
				</SooSection>
				<SooSection title="Experience a new level of performance">
					<Container
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
						}}
					>
						<p>
							We are committed to delivering superior resins and composite
							materials that you can trust for your crafts. Take advantage of
							our high-quality products.
						</p>

						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://wa.me/2347030324696?text=Hello%2C%0D%0Acould+you+please+tell+me+more+about+the+composite%3F"
						>
							<CTA>Learn more</CTA>
						</a>
					</Container>
				</SooSection>
				<SooSection title="Safe and reliable">
					<Container>
						<p>
							With our safe and reliable composite solutions, you can make a
							wide range of stronger, lighter and tougher products
						</p>
					</Container>
				</SooSection>
			</Container>

			<SooSection color="#E6E6E6" container={false}>
				<Container
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						flexWrap: 'wrap',
						gap: '1em',
						margin: 'auto',
					}}
				>
					<p>Polyester Resin</p>
					<p>Epoxy Resin</p>
					<p>Fibre Glass</p>
					<p>Carbon Fibre</p>
					<p>Polyurethane Foams</p>
					<p>RTV Silicone</p>
					<p>Pigments</p>
				</Container>
			</SooSection>
			<Hero
				content={
					<SooSection title="Contact Us">
						<Contact />
					</SooSection>
				}
			></Hero>
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

const SOOSectionContainer = styled.section`
	@media (min-width: 600px) {
		display: flex;
	}
`;
