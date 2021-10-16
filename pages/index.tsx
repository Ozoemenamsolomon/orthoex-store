import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { CTA } from '../src/components/Header';
import BG from '../src/assets/images/Humboldt-n-5.jpg';
import React from 'react';
import SooSection from '../src/components/SooSection';

const Home: NextPage = () => {
	const callUs = () => {
		window.open('tel://+2347030324696', '_self');
	};
	return (
		<Layout>
			<HeroContainer>
				<Hero>
					<Container style={{ display: 'flex' }}>
						<HeroContent>
							<HeroTitle>
								We are your preferred <br /> partner of choice for quality!
							</HeroTitle>
							<HeroClaim>
								OEX Composite is Nigeria’s leading brand of epoxy and polyester
								resins, fibreglass, carbon reinforcements, RTV silicone,
								polyurethane foams, and other composite materials. Our products
								are tailored to the requirements of our customers in the
								healthcare and manufacturing industries, enabling us to satisfy
								their needs and helping them reach their business goals. Contact
								us to know how to fit our solutions to your needs.{' '}
							</HeroClaim>
							<CTA onClick={callUs}>Call Us</CTA>
						</HeroContent>
						<HeroImg>
							<Image
								layout="intrinsic"
								height={500}
								width={500}
								src="https://upload.wikimedia.org/wikipedia/en/9/97/Resin_on_Almond_tree.jpg"
							></Image>
						</HeroImg>
					</Container>
				</Hero>
				<div
					style={{
						position: 'absolute',
						top: 0,
						height: '100%',
						width: '100%',
						zIndex: -5,
					}}
				>
					<HeroBg layout="fill" objectFit="contain" src={BG}></HeroBg>
				</div>
			</HeroContainer>
			<Container style={{ margin: 'auto' }}>
				<SooSection title="We are helping to grow your business">
					<Container>
						<Cards>
							<Card>
								<CardIcon>👍🏽</CardIcon>
								<p>We offer the right composite material for your projects</p>
							</Card>
							<Card>
								<CardIcon>💅🏽</CardIcon>
								<p>High-quality products to keep you satisfied</p>
							</Card>
							<Card>
								<CardIcon>💪🏽</CardIcon>
								<p>
									Durable and abrasion-resistant resins to keep you competitive
								</p>
							</Card>
							<Card>
								<CardIcon>🆖</CardIcon>
								<p>
									Our materials are represented in hundreds of products across
									multiple markets in Nigeria
								</p>
							</Card>
						</Cards>
						<CTA>Chat with us</CTA>
					</Container>
				</SooSection>
				<SooSection title="Experience a new level of performance">
					<Container style={{ display: 'flex' }}>
						<div style={{ flex: 1.5 }}>
							<p>
								We are committed to delivering superior resins and composite
								materials that you can trust for your crafts. Take advantage of
								our high-quality products.
							</p>
							<CTA>Learn more</CTA>
						</div>
						<div style={{ flex: 1 }}></div>
					</Container>
				</SooSection>
				<SooSection title="Safe and reliable">
					<p>
						With our safe and reliable composite solutions, you can make a wide
						range of stronger, lighter and tougher products
					</p>
				</SooSection>
				<SooSection title="Contact Us">
					<h3>OrthoEx Nigeria Limited</h3>
					<p>
						10 Ipakodo Wharf Road, <br />
						Ebute, Ikorodu,
						<br />
						Lagos State, Nigeria.
					</p>
					<p>Email: store@orthoex.ng</p>
					<p>
						+234-703-032-4696 <br />
						+234-811-223-0122
					</p>
				</SooSection>
			</Container>
		</Layout>
	);
};

export default Home;

export const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	padding: 0 2rem;
	@media (max-width: 600) {
		& {
			padding: 0 1rem;
		}
	}
`;

const HeroContainer = styled.div`
	position: relative;
	max-height: 70%;
`;
const HeroBg = styled(Image)`
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
`;

const Hero = styled.div`
	background-color: #000000c6;
	color: white;
	display: flex;
	padding: 4.5em 0em 2em 0em;
	justify-content: center;

	@media (max-width: 600px) {
		& > div {
			flex-direction: column;
		}
	}
`;
const HeroImg = styled.div`
	margin-left: 3em;
	align-self: center;
	@media (max-width: 600px) {
		display: none;
	}
`;
const HeroContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	@media (min-width: 600px) {
		max-width: 60%;
	}
`;

const HeroTitle = styled.h1``;

const HeroClaim = styled.p``;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: all 0.51s ease;
	padding: 0.5rem 0.5rem;
	text-align: center;

	&:hover {
		box-shadow: 2px 2px 4px #0000003d;
		border-radius: 13px;
	}
`;

const Cards = styled.div`
	display: grid;
	gap: 0.5rem;
	@media (min-width: 300px) {
		--repeat-count: 2;
		grid-template-columns: repeat(var(--repeat-count), 1fr);
	}
	@media (min-width: 600px) {
		--repeat-count: 4;
	}
`;

const CardIcon = styled.span`
	font-size: 3rem;
`;

const SOOSectionContainer = styled.section`
	@media (min-width: 600px) {
		display: flex;
	}
`;
