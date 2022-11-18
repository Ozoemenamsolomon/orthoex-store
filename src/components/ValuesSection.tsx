import React from "react";
import styled from "styled-components";
import SooSection from "./SooSection";
import Image from "next/image";

import CoreValue from "@assets/icons/core-values.png";
import ContactUs from "@assets/icons/contact-us.png";
import EnableBusiness from "@assets/icons/learn-more.png";
import ViewProducts from "@assets/icons/view-products.png";
import KristaTemple from "@assets/images/krista-and-temple.png";
import CTA from "./CTA";

const ValuesSection = () => {
	return (
		<SooSection>
			<ValueCardsContainer>
				<BaseValueCard>
					<div className="image-container">
						<Image layout="fill" objectFit="contain" src={ContactUs}></Image>
					</div>
					<p>
						Our customer service team is available via email, phone call and
						WhatsApp
					</p>
					<CTA white>CONTACT US</CTA>
				</BaseValueCard>
				<PassionateValueCard>
					<Image
						src={KristaTemple}
						className="krista-temple"
						layout="fill"
						objectFit="cover"
					/>
					<div className="content">
						<p>We are passionate about empowering human potentials.</p>
						<CTA>JOIN US</CTA>
					</div>
				</PassionateValueCard>
				<ValuesTitleCardContainer>
					<div className="image-container">
						<Image layout="fill" objectFit="contain" src={CoreValue}></Image>
					</div>
					<CTA>Our Core Values</CTA>
				</ValuesTitleCardContainer>
				<BaseValueCard>
					<div className="image-container">
						<Image layout="fill" objectFit="contain" src={EnableBusiness} />
					</div>
					<p>We are enabling businesses like yours for success</p>
					<CTA>LEARN MORE</CTA>
				</BaseValueCard>
				<BaseValueCard>
					<div className="image-container">
						<Image layout="fill" objectFit="contain" src={ViewProducts}></Image>
					</div>
					<p>
						Our materials are represented in hundreds of products across
						multiple markets in Nigeria
					</p>
					<CTA>VIEW PRODUCTS</CTA>
				</BaseValueCard>
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
`;

const BaseValueCard = styled.div`
	position: relative;
	padding: 1rem;
	text-align: center;
	box-shadow: 1px 6px 8px rgb(0 0 0 / 17%);
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	button {
		align-self: center;
	}

	&:nth-child(1) {
		grid-row: 2/4;
		background: linear-gradient(135deg, var(--oex-yellow), var(--oex-orange));
		color: white;
	}
	&:nth-child(4) {
		grid-row: 4 / 8;
		// need to adjust eventually
		align-self: start;
	}
	&:nth-child(5) {
		grid-row: 5 / 7;
	}

	> .image-container {
		position: relative;
		aspect-ratio: 3;
		margin-bottom: 1rem;
	}
`;

const ValuesTitleCardContainer = styled(BaseValueCard)`
	padding-inline: 0;
	@media (min-width: 900px) {
		grid-row: 3 / 6;
	}
	> .image-container {
		position: relative;
		aspect-ratio: 1;
	}
`;
const PassionateValueCard = styled(BaseValueCard)`
	padding: 0;
	grid-row: 1 / 5;
	display: grid;
	grid-template-columns: 1fr;
	isolation: isolate;
	align-items: flex-end;
	overflow: hidden;
	grid-template-rows: repeat(3, 1fr);
	@media (max-width: 900px) {
		grid-auto-rows: 1fr;
	}
	.krista-temple {
		z-index: -1;
	}
	> .content {
		z-index: 2;
		background-color: white;
		padding: 0.5rem;
		border-radius: 1rem 1rem 0 0;
		grid-row: -1;
	}
`;
