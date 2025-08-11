import React from "react";
import ProductDetail from "@components/shop/ProductDetail";
import styled from 'styled-components';

export default function Shop() {

   const BgBody = styled.div`
    background: #fafafa;
  `;

  return (
    <BgBody>
      <ProductDetail />
    </BgBody>
  );
}
