import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { CTA } from '../src/components/Header';
import BG from '../src/assets/images/Humboldt-n-5.jpg';

const Home: NextPage = () => {
	return (
		<Layout>
			<HeroContainer>
				<Hero>
					<Container style={{ display: 'flex' }}>
						<HeroContent>
							<HeroTitle>
								We are your preferred partner of choice for quality!
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
							<CTA>Call Us</CTA>
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
					}}
				>
					<HeroBg layout="fill" objectFit="contain" src={BG}></HeroBg>
				</div>
			</HeroContainer>
			<Container style={{ margin: 'auto' }}>
				<SOOSection>
					<Container>
						<h2>We are helping to grow your business</h2>
						<Cards>
							<Card>
								<span>👍🏽</span>
								<p>We offer the right composite material for your projects</p>
							</Card>
							<Card>
								<span>💅🏽</span>
								<p>High-quality products to keep you satisfied</p>
							</Card>
							<Card>
								<span>💪🏽</span>
								<p>
									Durable and abrasion-resistant resins to keep you competitive
								</p>
							</Card>
							<Card>
								<span>🆖</span>
								<p>
									Our materials are represented in hundreds of products across
									multiple markets in Nigeria
								</p>
							</Card>
						</Cards>
					</Container>
				</SOOSection>
				<SOOSection>
					<Container>
						<h2>Experience a new level of performance</h2>
						<p>
							We are committed to delivering superior resins and composite
							materials that you can trust for your crafts. Take advantage of
							our high-quality products.
						</p>
						<CTA>Learn more</CTA>
					</Container>
				</SOOSection>
				<SOOSection>
					<Container>
						<h2>Safe and reliable</h2>
						<p>
							With our safe and reliable composite solutions, you can make a
							wide range of stronger, lighter and tougher products
						</p>
					</Container>
				</SOOSection>
				<SOOSection>
					<Container>
						<h2>Contact Us</h2>
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
					</Container>
				</SOOSection>
			</Container>
		</Layout>
	);
};

export default Home;

export const Container = styled.div`
	max-width: 1200px;
	width: 100%;
	padding: 0 1rem;
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
	background-color: #1b120190;
	display: flex;
	padding: 2.5em 0em;
	justify-content: center;
`;
const HeroContent = styled.div`
	max-width: 70%;
`;

const HeroTitle = styled.h1``;

const HeroClaim = styled.p``;

const HeroImg = styled.div``;

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

const SOOSection = styled.section`
	@media (min-width: 600px) {
		display: flex;
	}
`;
