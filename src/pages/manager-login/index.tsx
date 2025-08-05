import React from "react";
import Login from "@components/shop/ManagerLogin";
import styled from 'styled-components';


export default function ManagerLogin() {

  const BgBody = styled.div`
    background: #fafafa; 
  `;

  return (
    <BgBody >
      <Login />
    </BgBody>
  );
}


