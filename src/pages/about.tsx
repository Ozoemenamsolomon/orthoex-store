import { aboutData } from '@data/aboutPageData';
import { useState } from 'react';
import styled from 'styled-components';
import AboutDetail from '../components/About/AboutCardDetail';
import AboutInfo from '../components/About/AboutInfo';
function About() {
	const [currentSelected, setcurrentSelected] = useState(0);

	return (
		<StyledAboutWrapper>
			<StyledAbout>
				<AboutInfo
					data={aboutData}
					currentSelected={currentSelected}
					setCurrentSelected={setcurrentSelected}
				/>
				<AboutDetail data={aboutData} currentSelected={currentSelected} />
			</StyledAbout>
		</StyledAboutWrapper>
	);
}

export default About;

// remove min-height below

const StyledAbout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 80vh;
	// margin-top: 5rem;
	padding: 1rem;
	margin: 5rem auto 0rem;

	@media (min-width: 768px) {
		flex-direction: row;
		padding: 3rem 10rem 5rem;
		background-color: var(--oex-lightest-grey);
	}

	@media (min-width: 2000px) {
		padding: 3rem 25rem 5rem;
	}
`;

const StyledAboutWrapper = styled.div``;
