import React, { SetStateAction } from 'react';
import styled from 'styled-components';

type AboutDataType = { title: string };

interface AboutInfoProps {
	setCurrentSelected: React.Dispatch<SetStateAction<number>>;
	currentSelected: number;
	data: AboutDataType[];
}

const AboutInfo: React.FC<AboutInfoProps> = ({
	setCurrentSelected,
	currentSelected,
	data,
}) => {
	return (
		<StyledAboutInfo>
			<StyledAboutInfoUl>
				{data?.map((info, index) => (
					<StyledAboutInfoLi
						key={`about-tab-nav-${index}`}
						selected={currentSelected === index}
						onClick={() => setCurrentSelected(index)}>
						{info.title}
					</StyledAboutInfoLi>
				))}
			</StyledAboutInfoUl>
		</StyledAboutInfo>
	);
};

export default AboutInfo;

const StyledAboutInfo = styled.div`
	@media ${({ theme }) => theme.breakpoints.above.md} {
		background-color: white;
		width: 25%;
		padding-left: 1.5rem;
		border-right: 0.1rem solid var(--oex-lighter-grey);
		padding-top: 1.7rem;
	}
`;

const StyledAboutInfoUl = styled.ul`
	list-style-type: none;
	padding: 0rem;
`;

const StyledAboutInfoLi = styled.li<{ selected?: boolean }>`
	border: 0.1rem solid var(--oex-light-grey);
	padding: 0.8rem;
	text-align: center;
	cursor: pointer;
	color: ${({ selected }) => (selected ? 'black' : 'var(--oex-dark-grey)')};
	background-color: ${({ selected }) =>
		selected ? 'var(--oex-lightest-grey)' : ''};
	border-radius: 0.4rem;
	@media ${({ theme }) => theme.breakpoints.above.md} {
		border-radius: 0rem;
		border: none;
		padding: 1.2rem;
		text-align: left;
		font-size: 1.2rem;
	}
`;
