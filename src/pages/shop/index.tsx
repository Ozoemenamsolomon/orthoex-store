import React from "react";
import Categories from "@components/shop/Categories";
import styled from 'styled-components';


export default function Shop() {

  const BgBody = styled.div`
    background: #fafafa;
    
  `;

  return (
    <BgBody >
      <Categories />
    </BgBody>
  );
}


