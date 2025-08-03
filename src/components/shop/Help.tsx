// components/HelpSection.js
'use client';

import React from 'react';
import styled from 'styled-components';
import { Phone, MessageCircle, HelpCircle } from 'lucide-react';

// Styled Components
const Section = styled.section`
  padding: 2rem 1rem;
  background: #fff;
  max-width: 337px;
  margin: auto;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #222;
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
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 8px;
  flex: 1;
  min-width: 260px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Icon = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
  color: #222;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0.5rem 0 1.25rem;
`;

const Button = styled.button`
  background: none;
  color: #f60;
  border: 1px solid #f60;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f60;
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
          <Icon><Phone size={24} /></Icon>
          <Title>Contact our sales team</Title>
          <Description>
            Talk to a customer care representative<br />
            Mon - Fri: 9:00am - 5:00pm
          </Description>
          <Button>Dial Number</Button>
        </Card>

        <Card>
          <Icon><MessageCircle size={24} /></Icon>
          <Title>Chat with us</Title>
          <Description>Chat with a product expert</Description>
          <Button>Live Chat</Button>
        </Card>

        <Card>
          <Icon><HelpCircle size={24} /></Icon>
          <Title>Read FAQ</Title>
          <Description>Find a list of answers to the most popular questions that are asked</Description>
          <Button>Check FAQ</Button>
        </Card>
      </CardContainer>
    </Section>
  );
};

export default HelpSection;
