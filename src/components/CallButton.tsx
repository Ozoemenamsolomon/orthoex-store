import React from "react";
import styled from "styled-components";
import CTA from "./CTA";

const CallButton = () => {
  return (
    <StyledCallButtonDiv>
      <CTA>
      <svg
        width="14"
        height="20"
        viewBox="0 0 14 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.36332 0.43881L3.43932 0.0948098C4.44832 -0.22719 5.52632 0.29381 5.95832 1.31181L6.81832 3.33981C7.19232 4.22281 6.98432 5.26181 6.30432 5.90781L4.40932 7.70581C4.52632 8.78181 4.88832 9.84081 5.49432 10.8828C6.06979 11.8909 6.84169 12.7734 7.76432 13.4778L10.0403 12.7178C10.9023 12.4308 11.8423 12.7618 12.3703 13.5388L13.6033 15.3488C14.2183 16.2528 14.1073 17.4988 13.3443 18.2648L12.5273 19.0858C11.7133 19.9028 10.5503 20.1998 9.47532 19.8638C6.93532 19.0718 4.60232 16.7208 2.47232 12.8108C0.339318 8.89481 -0.413682 5.57081 0.214318 2.84281C0.478318 1.69481 1.29532 0.77981 2.36332 0.43881Z"
          fill="white"
        />
      </svg>
      Call
      </CTA>
      </StyledCallButtonDiv>
  );
};

export default CallButton;

const StyledCallButtonDiv = styled.div`
position: fixed;
left: 0;
bottom: 2%;
z-index: 10;

& > button {
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: var(--oex-orange);
  border: 0.09rem solid var(--oex-orange);
  color: white;
  font: inherit;
}

  @media (min-width: 768px) {
    display: none;
  }
`;
