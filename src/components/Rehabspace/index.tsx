import React from 'react';
import Hero from './Hero';
import Benefits from './Benefits';
import PaymentSection from './PaymentSection';
import BookingTypes from './BookingTypes';
import SchedulSession from './SchedulSession';

const Index: React.FC = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <PaymentSection />
      <BookingTypes />
      <SchedulSession />
    </>
  );
};

export default Index;
