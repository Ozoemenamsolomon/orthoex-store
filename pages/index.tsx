import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { CTA } from '../src/components/Header';

const Home: NextPage = () => {
	return (
		<Layout>
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
			<Container>
				<section>
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
				</section>
				<section>
					<h2>Experience a new level of performance</h2>
					<p>
						We are committed to delivering superior resins and composite
						materials that you can trust for your crafts. Take advantage of our
						high-quality products.
					</p>
					<button>Learn more</button>
				</section>
				<section>
					<h2>Safe and reliable</h2>
					<p>
						With our safe and reliable composite solutions, you can make a wide
						range of stronger, lighter and tougher products
					</p>
				</section>
				<section>
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
				</section>
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

const Hero = styled.div`
	background: linear-gradient(45deg, black, red);
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
`;

const Cards = styled.div`
	display: grid;
	gap: 1em;
	@media (min-width: 300px) {
		--repeat-count: 2;
		grid-template-columns: repeat(var(--repeat-count), 1fr);
	}
	@media (min-width: 600px) {
		--repeat-count: 4;
	}
`;
