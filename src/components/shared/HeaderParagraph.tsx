import React from 'react';
import styled from 'styled-components';

export interface HeaderParagraphType {
	heading?: string;
	paragraph?: string;
}

interface HeaderParagraphProps {
	data: HeaderParagraphType;
}

const HeaderParagraph: React.FC<HeaderParagraphProps> = ({ data }) => {
	const { heading, paragraph } = data;
	return (
		<StyledHeaderDiv>
			<h2>{heading}</h2>
			<p>{paragraph}</p>
		</StyledHeaderDiv>
	);
};

export default HeaderParagraph;

const StyledHeaderDiv = styled.div`

margin-bottom: 4rem;

& > h2 {
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 38px;
  text-align: left;
}

& > p {
  font-size: 0.9rem;
  font-weight: 350;
  letter-spacing: 0.03rem;
  text-align: left;
  color: var(--text-colour-grey);
}

@media(min-width: 768px){
  text-align: center;

  & > h2 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 3rem;
  }

  & > p {
    text-align: center;
    font-size: 1rem;
    font-weight: 300;
    line-height: 2rem;
    letter-spacing: 0.03rem;
  }

}
`;
