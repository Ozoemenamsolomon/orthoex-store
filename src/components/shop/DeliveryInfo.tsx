import React from "react";
import styled from "styled-components";
import { Truck, ShieldCheck, Headphones, Globe2 } from "lucide-react";

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
  margin-bottom: 8px;
  color: #0a0a0a;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #666;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
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
  margin-bottom: 4px;
`;

const ItemTitle = styled.h4`
  font-weight: 600;
  font-size: 15px;
  color: #111;
`;

const ItemText = styled.p`
  font-size: 14px;
  color: #555;
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
            <IconWrapper><Truck size={20} /></IconWrapper>
            <ItemTitle>Order by 12PM</ItemTitle>
            <ItemText>Shipped same day</ItemText>
          </Item>
          <Item>
            <IconWrapper><ShieldCheck size={20} /></IconWrapper>
            <ItemTitle>Safe payment</ItemTitle>
            <ItemText>Trusted SSL protection</ItemText>
          </Item>
          <Item>
            <IconWrapper><Headphones size={20} /></IconWrapper>
            <ItemTitle>Technical Advice</ItemTitle>
            <ItemText>We offer helpful tips & tricks to aid your craft</ItemText>
          </Item>
          <Item>
            <IconWrapper><Globe2 size={20} /></IconWrapper>
            <ItemTitle>Nationwide delivery</ItemTitle>
            <ItemText>We deliver to all cities in Nigeria</ItemText>
          </Item>
        </Grid>
      </Section>
    </Container>
  );
};

export default DeliveryInfo;
