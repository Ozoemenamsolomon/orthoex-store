// components/HelpSection.js
'use client';

import React from 'react';
import styled from 'styled-components';
import { Phone, MessageCircle, HelpCircle } from 'lucide-react';

// Styled Components
const Section = styled.section`
  padding: 17px 24px;
  background: #fff;
  max-width: 337px;
  margin: auto;
`;

const Heading = styled.h2`
  font-size: 18px;
 font-weight: 600;
 margin-bottom: 16px;
 color: #0A0E2E;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  border: none;
  padding: 10px;
  flex: 1;
  min-width: 260px;
`;

const Icon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
  color: #222;
`;

const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 13px;
  color: #717171;
  margin-bottom: 1rem;
  `;

const Button = styled.button`
  background: none;
  color: #FE7624;
  border: 1px solid #f60;
  padding: 10px 0;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 18px;
  width: 100%;

  &:hover {
    background: #FE7624;
    color: white;
  }
`;

// Component
const HelpSection = () => {
  return (
    <Section>
      <Heading>Do you need help?</Heading>
      <CardContainer>
        <Card>
          <Icon><Phone size={32} /></Icon>
          <Title>Contact our sales team</Title>
          <Description>
            Talk to a customer care representative<br />
            Mon - Fri: 9:00am - 5:00pm
          </Description>
          <Button>Dial Number</Button>
        </Card>

        <Card>
          <Icon><MessageCircle size={32} /></Icon>
          <Title>Chat with us</Title>
          <Description>Chat with a product expert</Description>
          <Button>Live Chat</Button>
        </Card>

        <Card>
          <Icon><HelpCircle size={32} /></Icon>
          <Title>Read FAQ</Title>
          <Description>Find a list of answers to the most popular questions that are asked</Description>
          <Button>Check FAQ</Button>
        </Card>
      </CardContainer>
    </Section>
  );
};

export default HelpSection;
