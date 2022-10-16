import styled from "styled-components"
// import Call from "@assets/new/icons/home/call.svg"
import React from "react"

interface ButtonProps {
  width: string
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({width, children, primary}) => {
  return (
    <StyledCallButton width={width} primary={primary}>
      {children}
    </StyledCallButton>
  )
}

export default Button


const StyledCallButton = styled.button<ButtonProps>`
  color: ${({primary}) => primary ? "white" : "var(--oex-orange)" };
  background-color: ${({primary}) => primary ? "var(--oex-orange)" : "white"  };
  font: inherit;
  padding: 1rem;
  width: ${({width}) => width ? width : "" };
  border-radius: 0.2rem;
  border: 0.09rem solid var(--oex-orange);

  &:hover {
    color: ${({primary}) => primary ? "var(--oex-orange)" : "white" } ;
    background-color: ${({primary}) => primary ? "white" : "var(--oex-orange)" };
  }
`