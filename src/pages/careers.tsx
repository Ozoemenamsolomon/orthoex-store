import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Container } from '@components/styled';
import CareerPeople from '@assets/new/images/career/career-people.jpg';
import CareerManAndWoman from '@assets/new/images/career/career-man-woman.jpg';
import WomanOne from '@assets/new/images/career/woman-one.jpg';
import WomanTwo from '@assets/new/images/career/woman-two.jpg';
import WomanThree from '@assets/new/images/career/woman-three.jpg';

import ImageInfoHeader, {
	ImageInfoHeaderType,
} from '@components/ImageInfoHeader';
import InfoText from '@components/InfoText';
import SocialMediaButtons from '@components/shared/SocialMediaButtons';
import { openJobPositions } from '@data/openJobPositionsData';
import JobPositonCard from '@components/JobPositonCard';
import { hiringData } from '@data/hiringProcessData';

const careerData: ImageInfoHeaderType = {
	image: CareerPeople,
	heading: 'Inspired by Quality',
	paragraph:
		'We are driven by a desire to deliver quality products and technologies to our customers to empower them for success.',
	cta: { link: '#openPositions', text: 'View Open roles' },
};

function careers() {
	return (
		<StyledCareerWrapper>
			<Container paddingMultiplier={0}>
				<ImageInfoHeader data={careerData} />

				<StyledComponentHeading>Build a future with us</StyledComponentHeading>
				<StyledImageContentDiv>
					<StyledImageSmallDiv>
						<Image
							src={WomanOne}
							style={{ objectFit: 'cover' }}
							fill
							alt="career image"
						/>
					</StyledImageSmallDiv>
					<StyledImageLargeDiv>
						{/* TOD0: Set the image to be darker */}
						<Image
							src={CareerManAndWoman}
							style={{ objectFit: 'cover' }}
							fill
							alt="career image"
						/>
						<StyledContentInfo>
							<h3>Life at OrthoEx NG</h3>
							<p>
								Working at OrthoEx Nigeria is more than just a job. We’re a
								people-focused company; every part of the company and every
								employee is essential.{' '}
							</p>
						</StyledContentInfo>
					</StyledImageLargeDiv>
					<StyledImageSmallDiv>
						<Image
							src={WomanTwo}
							style={{ objectFit: 'cover' }}
							fill
							alt="career image"
						/>
					</StyledImageSmallDiv>
					<StyledImageSmallDiv>
						<Image
							src={WomanThree}
							style={{ objectFit: 'cover' }}
							fill
							alt="career image"
						/>
					</StyledImageSmallDiv>
				</StyledImageContentDiv>
			</Container>

			{/* Hiring process */}

			<StyledHiringProcess>
				<h2>Our Hiring Process</h2>

				<StyledHiringContent>
					{hiringData.map((data, index) => (
						<StyledHiringContentCard key={`hiring-card-${index}`}>
							<StyledContentCardDiv>
								<span className="roundedId">{index + 1}</span>
								<div>
									<h3 className="heading">{data.title}</h3>
									<p className="description">{data.description}</p>
								</div>
							</StyledContentCardDiv>
						</StyledHiringContentCard>
					))}
				</StyledHiringContent>
			</StyledHiringProcess>

			{/* Info Content */}

			<InfoText
				title={'We are empowering human potentials'}
				description={
					'Do you love to be a part of a passionate team that enables human potential? We are building the best experience for you!'
				}>
				<SocialMediaButtons
					height={20}
					width={15}
					color={'var(--oex-orange)'}
				/>
			</InfoText>

			{/* Open positions */}

			<StyledOpenPositons id="openPositions">
				<h2>Our Open Positions</h2>
				{openJobPositions.map((job, index) => (
					<JobPositonCard data={job} key={`job-position-${index}`} />
				))}
			</StyledOpenPositons>
		</StyledCareerWrapper>
	);
}

export default careers;

const StyledCareerWrapper = styled.div`
	margin: 7rem 0rem 0rem;

	@media (min-width: 768px) {
		// padding: 2rem;
	}
`;

export const StyledComponentHeading = styled.h2`
	font-size: 2rem;
	font-weight: 400;
	line-height: 38px;
	text-align: left;
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		font-size: 3rem;
		font-weight: 400;
		line-height: 3rem;
		padding-left: 3rem;
		margin-bottom: 3rem;
	}
`;

const StyledImageContentDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	height: 10rem;
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		height: 30rem;
		padding: 2rem;
	}
`;

const StyledImageSmallDiv = styled.div`
	width: 9%;
	height: 100%;
	position: relative;
	overflow: hidden;

	@media (min-width: 768px) {
		width: 15%;
	}
`;

const StyledImageLargeDiv = styled.div`
	width: 70%;
	height: 100%;
	position: relative;
	overflow: hidden;
	// opacity: 0.5;
	// background-color: var(--oex-orange);

	&::before {
		background-image: linear-gradient(to top right, #1a1a1a, transparent);
		content: '';
		height: 100%;
		position: absolute;
		width: 100%;
		z-index: 1;
	}

	@media (min-width: 768px) {
		width: 60%;
	}
`;

const StyledContentInfo = styled.div`
	position: absolute;
	color: white;
	padding: 0.5rem;
	bottom: 1%;
	left: 0;
	right: 0;
	z-index: 1;

	& > h3 {
		margin: 0;
		padding: 0;
		font-size: 1rem;
		font-weight: 400;
	}

	& > p {
		font-size: 0.5rem;
		margin-bottom: 0rem;
	}

	@media (min-width: 768px) {
		padding: 2rem;
		width: 55%;

		& > h3 {
			margin-bottom: 1rem;
			font-size: 1.8rem;
			font-weight: 400;
		}

		& > p {
			font-size: 0.8rem;
			// margin-bottom: 0rem;
		}
	}
`;

const StyledHiringProcess = styled.div`
	padding: 3rem 1rem;

	& > h2 {
		font-size: 2rem;
		line-height: 38px;
		margin-bottom: 2rem;
		font-weight: 400;
	}

	@media (min-width: 768px) {
		padding: 3rem;

		& > h2 {
			font-size: 2.5rem;
			text-align: center;
			margin-bottom: 5rem;
		}
	}
`;

const StyledHiringContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const StyledHiringContentCard = styled.div`
	// padding-left: 3rem;
	position: relative;
	display: flex;

	& > .roundedId {
		color: var(--oex-orange);
		border-radius: 100%;
		border: 1px solid var(--oex-orange);
		text-align: center;
	}

	& > h3 {
		font-size: 1.1rem;
		font-weight: 500;
	}
	& > p {
		color: var(--text-colour-grey);
		font-size: 1rem;
	}

	@media (min-width: 768px) {
		padding-left: 0rem;

		flex-direction: row;
		align-items: start;

		& > h3 {
		}

		& > p {
		}
	}
`;

const StyledContentCardDiv = styled.div`
	display: flex;
	align-items: start;
	gap: 2rem;
	flex: 1;

	& > .roundedId {
		color: var(--oex-orange);
		border-radius: 100%;
		border: 1px solid var(--oex-orange);
		text-align: center;
		padding: 0.5rem 0.8rem;
	}

	& > div > .heading {
		font-size: 1.1rem;
		font-weight: 500;
		margin: 0;
		margin-bottom: 1rem;
	}
	& > div > .description {
		color: var(--text-colour-grey);
		font-size: 1rem;
		margin: 0;
	}

	@media (min-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 5rem;

		& > h2 {
		}
	}
`;

const StyledOpenPositons = styled.div`
	padding: 3rem 1rem;
	background-color: var(--oex-off-white);

	& > h2 {
		font-size: 2rem;
		line-height: 38px;
		margin-bottom: 2rem;
		font-weight: 400;
	}

	@media (min-width: 768px) {
		padding: 3rem 5rem;

		& > h2 {
			font-size: 2.5rem;
			text-align: center;
			margin-bottom: 5rem;
		}
	}
`;
