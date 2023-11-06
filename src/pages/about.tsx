import { Container } from '@components/styled';
import { aboutData } from '@data/aboutPageData';
import { useState } from 'react';
import styled from 'styled-components';
import AboutDetail from '../components/About/AboutCardDetail';
import AboutInfo from '../components/About/AboutInfo';
function About() {
	const [currentSelected, setcurrentSelected] = useState(0);

	return (
		<Container>
			<StyledAbout>
				<AboutInfo
					data={aboutData}
					currentSelected={currentSelected}
					setCurrentSelected={setcurrentSelected}
				/>
				<AboutDetail data={aboutData} currentSelected={currentSelected} />
			</StyledAbout>
		</Container>
	);
}

export default About;

const StyledAbout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 80vh;
	padding: 1rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		flex-direction: row;
		padding: 3rem 10rem 5rem;
		background-color: var(--oex-lightest-grey);
	}
`;
