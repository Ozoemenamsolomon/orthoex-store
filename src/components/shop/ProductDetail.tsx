import styled from "styled-components";
import React, { useState } from "react";

const Section = styled.section`
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 2px solid transparent;
  cursor: pointer;

  &.active {
    border-color: orange;
  }
`;

const Details = styled.div`
  flex: 2;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Brand = styled.p`
  margin: 0.5rem 0;
  color: orange;
`;

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  margin: 0.5rem 0 1rem;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const Icon = styled.img`
  height: 30px;
`;

const SizeSelector = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
`;

const QuantitySelector = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  background: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkorange;
  }
`;

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState("/resin1.png");

  const images = ["/resin1.png", "/resin2.png", "/resin3.png"];

  return (
    <Section>
      <ImageContainer>
        <MainImage src={selectedImage} alt="Product" />
        <ThumbnailWrapper>
          {images.map((img) => (
            <Thumbnail
              key={img}
              src={img}
              alt="thumbnail"
              className={selectedImage === img ? "active" : ""}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </ThumbnailWrapper>
      </ImageContainer>

      <Details>
        <Title>Polyester Resin</Title>
        <Brand>Brand: OEX</Brand>
        <Price>₦50.00</Price>
        <Description>
          FLAG Resin is a part our Medium-Viscosity 2:1 Non-BL Resin. FLAG stands for filling,
          laminating and gluing. It compatible with LV Resin and the Slow.
        </Description>

        <h4>Safe and secure payment</h4>
        <PaymentIcons>
          <Icon src="/mastercard.svg" alt="MasterCard" />
          <Icon src="/visa.svg" alt="Visa" />
          <Icon src="/bank.svg" alt="Bank Transfer" />
        </PaymentIcons>

        <div>
          <SizeSelector>
            <option>Select size</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </SizeSelector>

          <QuantitySelector>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </QuantitySelector>
        </div>

        <div>
          <Button>Add to cart</Button>
          <Button style={{ background: "#ffcc80", color: "#000" }}>Save for later</Button>
        </div>
      </Details>
    </Section>
  );
}
