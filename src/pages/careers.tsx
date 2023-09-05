import CareerManAndWoman from '@assets/new/images/career/career-man-woman.jpg';
import CareerPeople from '@assets/new/images/career/career-people.jpg';
import WomanOne from '@assets/new/images/career/woman-one.jpg';
import WomanThree from '@assets/new/images/career/woman-three.jpg';
import WomanTwo from '@assets/new/images/career/woman-two.jpg';
import { Container } from '@components/styled';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import ImageInfoHeader, {
	ImageInfoHeaderType,
} from '@components/ImageInfoHeader';
import InfoText from '@components/InfoText';
import JobPositonCard from '@components/JobPositonCard';
import SocialMediaButtons from '@components/shared/SocialMediaButtons';
import { hiringData } from '@data/hiringProcessData';
import { openJobPositions } from '@data/openJobPositionsData';

const careerData: ImageInfoHeaderType = {
	image: CareerPeople,
	heading: 'Inspired by Quality',
	paragraph:
		'We are driven by a desire to deliver quality products and technologies to our customers to empower them for success.',
	cta: { link: '#openPositions', text: 'View Open roles' },
};

function Careers() {
	const [highlightBiggest, setHighlightBiggest] = useState(true);
	return (
		<>
			<Container paddingMultiplier={0}>
				<ImageInfoHeader data={careerData} />
				<StyledComponentHeading>Build a future with us</StyledComponentHeading>
				<StyledImageContentDiv
					onMouseOver={() => setHighlightBiggest(false)}
					onMouseLeave={() => setHighlightBiggest(true)}>
					<StyledImageSmallDiv>
						<Image
							src={WomanOne}
							style={{ objectFit: 'cover' }}
							fill
							alt="career image"
						/>
					</StyledImageSmallDiv>
					<StyledImageSmallDiv className={highlightBiggest ? 'selected' : ''}>
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
					</StyledImageSmallDiv>
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

			<InfoText
				title={'We are empowering human potentials'}
				description={
					'Do you love to be a part of a passionate team that enables human potential? We are building the best experience for you!'
				}>
				<SocialMediaButtons height={20} width={15} color={'white'} />
			</InfoText>

			<StyledOpenPositons id="openPositions">
				<h2>Our Open Positions</h2>
				{openJobPositions.map((job, index) => (
					<JobPositonCard data={job} key={`job-position-${index}`} />
				))}
			</StyledOpenPositons>
		</>
	);
}

export default Careers;

const StyledComponentHeading = styled.h2`
	font-size: 2rem;
	font-weight: 400;
	line-height: 38px;
	text-align: left;
	margin-bottom: 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
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
	gap: 0.2rem;
	height: 10rem;
	margin-bottom: 2rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		height: 30rem;
		padding: 2rem;
		gap: 1rem;
	}
`;

const StyledContentInfo = styled.div`
	display: none;
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

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem;
		width: 55%;

		& > h3 {
			margin-bottom: 1rem;
			font-size: 1.8rem;
			font-weight: 400;
		}

		& > p {
			font-size: 0.8rem;
		}
	}
`;

const StyledImageSmallDiv = styled.div`
	flex: 1;
	height: 100%;
	position: relative;
	overflow: hidden;
	transition: flex 0.3s ease-in-out;

	&::before {
		background-image: linear-gradient(to top right, #1a1a1a, transparent);
		content: '';
		height: 100%;
		position: absolute;
		width: 100%;
		z-index: 1;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	&:hover,
	&.selected {
		flex: 4;
		&::before {
			opacity: 1;
		}
		${StyledContentInfo} {
			display: block;
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

	@media ${({ theme }) => theme.breakpoints.above.md} {
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

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
	}
`;

const StyledHiringContentCard = styled.div`
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

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding-left: 0rem;
		flex-direction: row;
		align-items: start;
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

	@media ${({ theme }) => theme.breakpoints.above.md} {
		display: flex;
		flex-direction: column;
		gap: 5rem;
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

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 3rem 5rem;

		& > h2 {
			font-size: 2.5rem;
			text-align: center;
			margin-bottom: 5rem;
		}
	}
`;
