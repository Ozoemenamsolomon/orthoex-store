import type { NextPage } from 'next';
import Layout from '../src/components/Layout';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
	return (
		<Layout>
			<Container>
				<HeroClaim>
					OEX Composite is Nigeria’s leading brand of epoxy and polyester
					resins, fibreglass, carbon reinforcements, RTV silicone, polyurethane
					foams, and other composite materials. Our products are tailored to the
					requirements of our customers in the healthcare and manufacturing
					industries, enabling us to satisfy their needs and helping them reach
					their business goals. Contact us to know how to fit our solutions to
					your needs.{' '}
				</HeroClaim>
				<HeroImg>
					<Image src=""></Image>
				</HeroImg>
			</Container>
		</Layout>
	);
};

export default Home;

const Container = styled.div`
	max-width: 1200px;
	width: 100%;
`;

const HeroClaim = styled.p``;

const HeroImg = styled.div``;
