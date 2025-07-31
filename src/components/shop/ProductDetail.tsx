import React, { useState } from "react";
import styled from "styled-components";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("details");

  return (
    <Container>
      <MainContent>
        <ImageSection>
          <MainImage src="/product.png" alt="Polyester Resin" />
          <ThumbnailList>
            {[1, 2, 3].map((i) => (
              <Thumbnail key={i} src="/product.png" alt={`Thumbnail ${i}`} />
            ))}
          </ThumbnailList>
          <SocialShare>
            <h4>SHARE THIS PRODUCT</h4>
            <Icons>
              {["twitter", "facebook", "instagram", "whatsapp"].map((icon) => (
                <Icon key={icon} src={`/${icon}.svg`} alt={icon} />
              ))}
            </Icons>
          </SocialShare>
          <DataSheet>
            <h4>DATA SHEET</h4>
            <a href="#">Product Data Sheet</a>
            <a href="#">Safety Data Sheet</a>
          </DataSheet>
        </ImageSection>

        <ProductSection>
          <Breadcrumb>Composites &gt; Polyester Resin & Components &gt; Polyester Resin</Breadcrumb>
          <Title>Polyester Resin</Title>
          <Brand>Brand: <span>OEX</span></Brand>
          <Price>₦50.00 <SmallText>(No Reviews)</SmallText>
          </Price>
          <Description>
            FLAG Resin is a part our Medium-Viscosity 2:1 Non-Bl Resin. FLAG stands for
            filling, laminating and gluing. It is compatible with LV Resin and the Slow.
          </Description>
          <SecurePayment>
            <h5>Safe and secure payment</h5>
            <Icons>
              {["mastercard", "visa", "bank"].map((icon) => (
                <Icon key={icon} src={`/${icon}.svg`} alt={icon} />
              ))}
            </Icons>
          </SecurePayment>

          <OrderControls>
            <select>
              <option>Select size</option>
            </select>
            <QuantityControls>
              <button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </QuantityControls>
          </OrderControls>

          <ActionButtons>
            <AddToCart>Add to cart</AddToCart>
            <SaveLater>Save for later</SaveLater>
          </ActionButtons>
        </ProductSection>
      </MainContent>

      <Tabs>
        <Tab active={selectedTab === "details"} onClick={() => setSelectedTab("details")}>Product details</Tab>
        <Tab active={selectedTab === "calculator"} onClick={() => setSelectedTab("calculator")}>Resin Calculator</Tab>
        <Tab active={selectedTab === "feedback"} onClick={() => setSelectedTab("feedback")}>Product Feedbacks</Tab>
      </Tabs>

      <TabContent>
        {selectedTab === "details" && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>}
        {selectedTab === "calculator" && <p>Resin calculator tool coming soon.</p>}
        {selectedTab === "feedback" && <p>No feedbacks available yet.</p>}
      </TabContent>
    </Container>
  );
};

export default ProductDetails;

// Styled-components below
const Container = styled.div`
  font-family: sans-serif;
  padding: 2rem;
  background: #fafafa;
`;

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
`;

const ImageSection = styled.div`
  flex: 1;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 350px;
`;

const ThumbnailList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Thumbnail = styled.img`
  width: 60px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const SocialShare = styled.div`
  margin-top: 2rem;
`;

const DataSheet = styled.div`
  margin-top: 1rem;
`;

const Icons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ProductSection = styled.div`
  flex: 2;
`;

const Breadcrumb = styled.div`
  color: #999;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const Brand = styled.div`
  margin-top: 0.5rem;
  span {
    color: orange;
  }
`;

const Price = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const SmallText = styled.span`
  font-size: 0.875rem;
  color: #888;
  margin-left: 1rem;
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const SecurePayment = styled.div`
  margin-top: 2rem;
`;

const OrderControls = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  select {
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const ActionButtons = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const AddToCart = styled.button`
  padding: 0.75rem 1.5rem;
  background: #f78002;
  color: white;
  border: none;
  cursor: pointer;
`;

const SaveLater = styled.button`
  padding: 0.75rem 1.5rem;
  background: #fff6e9;
  border: 1px solid #f78002;
  color: #f78002;
  cursor: pointer;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${(props) => (props.active ? "#f78002" : "transparent")};
  color: ${(props) => (props.active ? "#f78002" : "#888")};
`;

const TabContent = styled.div`
  margin-top: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;
