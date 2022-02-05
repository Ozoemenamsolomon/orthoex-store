import styled from 'styled-components';
import Image from 'next/image';

import composite from '../assets/images/composite-material-Icon-1.png';
import durable from '../assets/images/durable-Icon-3.png';
import quality from '../assets/images/high-quality-Icon-2.png';
import nigeria from '../assets/images/multiple-market-Icon-4.png';
import { Container } from '../pages';
import { CTA } from './Header';

const CardsComp = () => {
	return (
		<Container>
			<Cards>
				<Card>
					<CardIcon>
						<Image src={composite}></Image>
					</CardIcon>
					<p>We offer the right composite material for your projects</p>
				</Card>
				<Card>
					<CardIcon>
						<Image src={quality}></Image>
					</CardIcon>
					<p>High-quality products to keep you satisfied</p>
				</Card>
				<Card>
					<CardIcon>
						<Image src={durable}></Image>
					</CardIcon>
					<p>Durable and abrasion-resistant resins to keep you competitive</p>
				</Card>
				<Card>
					<CardIcon>
						<Image src={nigeria}></Image>
					</CardIcon>
					<p>
						Our materials are represented in hundreds of products across
						multiple markets in Nigeria
					</p>
				</Card>
			</Cards>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://wa.me/2347030324696?text=Hello%2C%0D%0AI%27m+interested+in+buying+composite%21"
			>
				<CTA>Chat with us</CTA>
			</a>
		</Container>
	);
};

export default CardsComp;

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
	margin: 2rem 0;
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
	height: 5rem;
	width: 5rem;
	position: relative;
`;
