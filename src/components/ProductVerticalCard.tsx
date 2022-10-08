import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { VerticalType } from "./ProductVertical";



const ProductVerticalCard: React.FC<VerticalType> = ({image,link, title}) => {
  return (
    <StyledProductVertical>
      <StyledImageWrapper>
        <Image width="100" height="100" quality={100} objectFit="cover" layout="fill" src={image} />
      </StyledImageWrapper>
      <StyledContent>
        <p>{title.toLocaleUpperCase()}</p>
        <Link href={link}>View Product</Link>
      </StyledContent>
    </StyledProductVertical>
  )
}

export default ProductVerticalCard


const  StyledProductVertical = styled.div`
  position: relative;
  width: 100%;
`

const  StyledImageWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 1;
`



// change the bg color below
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 13rem;
  font-size: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;

  & > p, a {
    display: none;
  }

  &:hover{
    background-color: rgba(0,0,0,.4);
  }

  &:hover > p {
    display: block;
    color: white;
    font-size: 1rem;
    padding-top: 2rem;
  }

  &:hover > a {
    display: block;
    color: white;
    background-color: var(--oex-bg-grey);
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
    text-align: center;
    width: 80%;
    border-radius: 0.5rem;
  }
`