import React from 'react';
import styled from 'styled-components';
import { CTA } from './Header';
import SooSection from './SooSection';
import Image from 'next/image';

import CoreValue from '../assets/icons/core-values.png';
import ContactUs from '../assets/icons/contact-us.png';
import EnableBusiness from '../assets/icons/learn-more.png';
import ViewProducts from '../assets/icons/view-products.png';
import KristaTemple from '../assets/images/krista-and-temple.png';

const ValuesSection = () => {
	return (
		<SooSection>
			<ValueCardsContainer>
				<div
					style={{
						gridRow: '2/4',
						background: 'linear-gradient(135deg,yellow,var(--oex-orange))',
						color: 'white',
						padding: '1rem',
						textAlign: 'center',
					}}
				>
					<div style={{ position: 'relative', aspectRatio: '3' }}>
						<Image layout="fill" objectFit="contain" src={ContactUs}></Image>
					</div>
					<p>
						Our customer service team is available via email, phone call and
						WhatsApp
					</p>
					<CTA white>CONTACT US</CTA>
				</div>
				<PassionateValueCard>
					<Image
						src={KristaTemple}
						className="krista-temple"
						layout="fill"
						objectFit="cover"
					></Image>
					<div
						style={{
							zIndex: 2,
							backgroundColor: 'white',
							padding: '.5rem',
							borderRadius: '1rem 1rem 0 0',
							gridRow: '-1',
						}}
					>
						<p>We are passionate about empowering human potentials.</p>
						<CTA>JOIN US</CTA>
					</div>
				</PassionateValueCard>
				<ValuesTitleCardContainer>
					<h4>Our Core Values</h4>
					<Image src={CoreValue} />
				</ValuesTitleCardContainer>
				<div
					style={{
						gridRow: '4 / 8',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						textAlign: 'center',
						padding: '1rem',
					}}
				>
					<div
						style={{
							position: 'relative',
							aspectRatio: '3',
						}}
					>
						<Image
							layout="fill"
							objectFit="contain"
							src={EnableBusiness}
						></Image>
					</div>
					<p>We are enabling businesses like yours for success</p>
					<CTA style={{ alignSelf: 'center' }}>LEARN MORE</CTA>
				</div>
				<div
					style={{
						gridRow: '5 / 7',
						padding: '1rem',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<div style={{ position: 'relative', aspectRatio: '3' }}>
						<Image layout="fill" objectFit="contain" src={ViewProducts}></Image>
					</div>
					<p>
						Our materials are represented in hundreds of products across
						multiple markets in Nigeria
					</p>
					<CTA style={{ alignSelf: 'center' }}>VIEW PRODUCTS</CTA>
				</div>
			</ValueCardsContainer>
		</SooSection>
	);
};

export default ValuesSection;

const ValueCardsContainer = styled.div`
	gap: 1.5rem;
	display: flex;
	flex-direction: column;
	@media (min-width: 600px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 900px) {
		grid-template-columns: repeat(3, 1fr);
		/*grid-template-rows: 0.8fr 0.5fr 3fr 1fr 2fr 2fr 1fr; */
	}

	.krista-temple {
		z-index: -1;
	}
	& > div {
		box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
		border-radius: 1rem;
	}
`;

const ValuesTitleCardContainer = styled.div`
	position: relative;
	text-align: center;
	color: var(--oex-orange);
	padding: 2rem 0;
	@media (min-width: 900px) {
		grid-row: 3 / 6;
	}
`;

const PassionateValueCard = styled.div`
	grid-row: 1 / 5;
	display: grid;
	position: relative;
	isolation: isolate;
	align-items: flex-end;
	text-align: center;
	overflow: hidden;
	grid-template-rows: repeat(3, 1fr);
	@media (max-width: 900px) {
		grid-auto-rows: 1fr;
	}
`;
