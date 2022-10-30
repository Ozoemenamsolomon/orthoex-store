import React, { useState, SetStateAction } from "react";
import styled from "styled-components";

const AboutInfData = [
  { title: "Company overview", titleId: "overview" },
  { title: "Culture and values", titleId: "values" },
  { title: "Our businesses", titleId: "business" },
];

interface AboutInfoProps {
  setCurrentSelected: React.Dispatch<SetStateAction<string>>
}

const  AboutInfo: React.FC<AboutInfoProps> = ({setCurrentSelected}) => {

  const [clickedValue, setclickedValue] = useState<string>("overview");

  const onListClick = (info: string) => {
    setclickedValue(info);
    setCurrentSelected(info)
  };

  return (
    <StyledAboutInfo>
      {AboutInfData.map((info, index) => (
        <StyledAboutInfoUl key={`${info.titleId}-${index}`}>
          <StyledAboutInfoLi clicked={clickedValue === info.titleId}
            onClick={() => onListClick(info.titleId)}
          >
            {info.title}
          </StyledAboutInfoLi>
        </StyledAboutInfoUl>
      ))}
    </StyledAboutInfo>
  );
}

export default AboutInfo;

const StyledAboutInfo = styled.div`

  @media (min-width: 768px) {
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

  @media (min-width: 768px) {

  }
`;

const StyledAboutInfoLi = styled.li<{ clicked?: boolean }>`
  border: 0.1rem solid var(--oex-light-grey);
  padding: 0.8rem;
  text-align: center;
  color: ${({ clicked }) => (clicked ? "black" : "var(--oex-dark-grey)")};
  background-color: ${({ clicked }) => (clicked ? "var(--oex-lightest-grey)" : "")};
  border-radius: 0.4rem;

  @media(min-width:768px){
    border-radius: 0rem;
    border: none;
    padding: 1.2rem;
    text-align: left;
    font-size: 1.2rem;

  }
`;

//onClick={(e) => setActive(!active)}
