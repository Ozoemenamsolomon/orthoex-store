import React, { useState } from "react";
import styled from "styled-components";
import ProductCalculator from "./calculator";
import { FacebookIcon, InstaIcon, SheetIcon, TwitterIcon, WhatsappIcon } from "constant/icon";
import DeliveryInfo from "./DeliveryInfo";
import HelpSection from "./Help";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("details");

  return (
    <MainContainer>
      <Breadcrumb>Composites &gt; Polyester Resin & Components &gt; Polyester Resin</Breadcrumb>
      <Container>
        <div>
          <MainContent>
            <ImageSection>
              <MainImage src="/shop/sample.png" alt="Polyester Resin" />
              <ThumbnailList>
                {[1, 2, 3].map((i) => (
                  <Thumbnail key={i} src="/shop/sample.png" alt={`Thumbnail ${i}`} />
                ))}
              </ThumbnailList>
              <SocialShare>
                <Share>SHARE THIS PRODUCT</Share>
                <Icons>
                  <FacebookIcon />
                  <TwitterIcon />
                  <InstaIcon />
                  <WhatsappIcon />
                </Icons>
              </SocialShare>
              <DataSheet>
                <SheetContainer>
                  <SheetIcon />
                  <SheetTitle>Data Sheet</SheetTitle>
                </SheetContainer>
                <Link >Product Data Sheet</Link>
                <Link >Safety Data Sheet</Link>
              </DataSheet>
            </ImageSection>

            <ProductSection>

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

        </div>

        <MainContent2>
          <DeliveryInfo />
        </MainContent2>
      </Container>

      <Container>
        <MainContent>
          <div style={{width:"750px"}}>
            <Tabs>
              <Tab active={selectedTab === "details"} onClick={() => setSelectedTab("details")}>Product details</Tab>
              <Tab active={selectedTab === "calculator"} onClick={() => setSelectedTab("calculator")}>Resin Calculator</Tab>
              <Tab active={selectedTab === "feedback"} onClick={() => setSelectedTab("feedback")}>Product Feedbacks</Tab>
            </Tabs>

            <TabContent>
              {selectedTab === "details" && <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>}
              {selectedTab === "calculator" &&

                <ProductCalculator />}
              {selectedTab === "feedback" && <p>No feedbacks available yet.</p>}
            </TabContent>
          </div>
        </MainContent>

        <MainContent2>
          <HelpSection/>
        </MainContent2>

      </Container>
    </MainContainer>
  );
};

export default ProductDetails;

// Styled-components below

const MainContainer = styled.div`
  padding: 39px 155px;
  font-family: sans-serif;

   @media (max-width: 779px) {
       padding: 39px 12px;
    }
`;

const Container = styled.div`
    display: flex;
    gap:16px;
`;


const MainContent = styled.div`
  display: flex;
  gap: 32px;
   @media (max-width: 779px) {
      flex-direction: column;
    }
`;

const MainContent2 = styled.div`
   @media (max-width: 779px) {

   }
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
  gap: 16px;
  margin-top: 1rem;
`;

const Thumbnail = styled.img`
  width: 84px;
  height:65px;
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
  gap: 16px;
  align-items :center;
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
  margin-top: 38px;
  margin-bottom: 38px;
`;

const Title = styled.h1`
  font-size: 32px;
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

const Share = styled.div`
  font-size:16px;
  font-weight:600; 
`

const SheetContainer = styled.div`
  display: flex;
  gap:8px;
  margin-top:16px;
`;

const SheetTitle = styled.p`
  font-size:20px;
  font-size:600;
`;

const Link = styled.p`
  font-size:16px;
  margin-top:8px;
  color:#FE7624;
`