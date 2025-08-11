import React from "react";
import styled from "styled-components";
import { Truck, ShieldCheck, Headphones, Globe2 } from "lucide-react";
import { CardIcon, SupportIcon, VanIcon } from "constant/icon";

const Container = styled.div`
  border: 1px solid #eee;
  padding: 24px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  background-color: white;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 13px;
  color: #0A0E2E;
`;

const SubText = styled.p`
  font-size: 13px;
  color: #717171;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 19px;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const IconWrapper = styled.div`
  color: #111;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h4`
  font-weight: 600;
  font-size: 16px;
  color: #0A0E2E;
`;

const ItemText = styled.p`
  font-size: 13px;
  color: #717171;
`;

const DeliveryInfo = () => {
  return (
    <Container>
      <Section>
        <Title>Delivery</Title>
        <SubText>
          Delivery is charged based on your location at checkout
        </SubText>
      </Section>

      <Section>
        <Title>Our Advantages</Title>
        <Grid>
          <Item>
            <IconWrapper><VanIcon/></IconWrapper>
            <ItemTitle>Order by 12PM</ItemTitle>
            <ItemText>Shipped same day</ItemText>
          </Item>
          <Item>
            <IconWrapper><CardIcon/></IconWrapper>
            <ItemTitle>Safe payment</ItemTitle>
            <ItemText>Trusted SSL protection</ItemText>
          </Item>
          <Item>
            <IconWrapper><SupportIcon/></IconWrapper>
            <ItemTitle>Technical Advice</ItemTitle>
            <ItemText>We offer helpful tips & tricks to aid your craft</ItemText>
          </Item>
          <Item>
            <IconWrapper>
              <img src="/shop/map.png" alt="Map" />
            </IconWrapper>
            <ItemTitle>Nationwide delivery</ItemTitle>
            <ItemText>We deliver to all cities in Nigeria</ItemText>
          </Item>
        </Grid>
      </Section>
    </Container>
  );
};

export default DeliveryInfo;
