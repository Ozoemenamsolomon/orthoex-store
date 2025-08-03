"use client";

import styled from "styled-components";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
  align-items: center;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  border: 1px solid #ddd;
  background: white;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;
`;

export default function ProductCalculator() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 200;

  return (
    <Container>
      <Price>₦{(pricePerItem * quantity).toLocaleString()}</Price>
      <QuantityControl>
        <QuantityButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus size={16} /></QuantityButton>
        <span>{quantity}</span>
        <QuantityButton onClick={() => setQuantity((q) => q + 1)}><Plus size={16} /></QuantityButton>
      </QuantityControl>
    </Container>
  );
}
