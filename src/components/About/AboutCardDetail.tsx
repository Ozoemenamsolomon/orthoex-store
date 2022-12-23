import { AboutDataType } from '@data/aboutPageData';
import React from 'react';
import styled from 'styled-components';
import AboutCardSection from './AboutCardSection';

interface AboutDetailProp {
	currentSelected: number;
	data: AboutDataType[];
}

const AboutDetail: React.FC<AboutDetailProp> = ({ currentSelected, data }) => {
	return (
		<StyledAboutDetail>
			{data.map(
				({ sections }, index) =>
					currentSelected === index && (
						<AboutCardSection sections={sections} key={`about-tab-${index}`} />
					),
			)}
		</StyledAboutDetail>
	);
};

export default AboutDetail;

const StyledAboutDetail = styled.div`
	margin-top: 2rem;
	@media ${({ theme }) => theme.breakpoints.above.md} {
		background-color: white;
		margin-top: 0rem;
		width: 75%;
	}
`;
