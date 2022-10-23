import { useState } from "react";
import styled from "styled-components";

const AboutInfData = [
  { title: "Company Overview", titleId: "overview" },
  { title: "Culture and values", titleId: "values" },
  { title: "Our businesses", titleId: "business" },
];

type ClickedValueType = "overview" | "values" | "business";

function AboutInfo() {
  const [active, setActive] = useState(false);
  const [clickedValue, setclickedValue] = useState<string>("");

  const onListClick = (info: string) => {
    console.log(info, clickedValue);
    setclickedValue(info);
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

const StyledAboutInfo = styled.div``;

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
  border-radius: 0.4rem;
`;

//onClick={(e) => setActive(!active)}
