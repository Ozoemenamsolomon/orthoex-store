import React from "react";
import { ServiceCardType } from "@components/ServiceCard";
import styled from "styled-components";
import Composite from "@assets/new/icons/composite.svg";
import Image from "next/image";

const services: ServiceCardType[] = [
  { description: "Prosthetics", image: Composite },
  { description: "Composites", image: Composite },
  { description: "Trainings", image: Composite },
  { description: "After Sales", image: Composite },
  { description: "Consultancy", image: Composite },
  { description: "Procurement", image: Composite },
];

function ServiceStandard() {
  return (
    <StyledServiceStandard>
      <ServiceWriteUp>
        <h3>Our commitment to quality ensures your peace of mind</h3>
        <p>
          At OrthoEx Nigeria Limited, we aim at the highest standard of quality
          in everything we do. This also includes providing quality products and
          technologies that are tailored to the requirements of our customers in
          the health care and manufacturing industries, enabling us to satisfy
          their needs and helping them reach their business goals.
        </p>
      </ServiceWriteUp>
      <StyledServiceIcon>
        <ImageDescriptionWrapper>
          {services.map((service, index) => (
            <ImageDescription key={index}>
              <Image
                src={service.image}
                alt={service.description}
                objectFit="contain"
                width="120px"
                height="200px"
              />
              <p>{service.description}</p>
            </ImageDescription>
          ))}
        </ImageDescriptionWrapper>
      </StyledServiceIcon>
    </StyledServiceStandard>
  );
}

export default ServiceStandard;

const StyledServiceStandard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 4rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ServiceWriteUp = styled.div`
  width: 40%;
  flex: 0 1 auto;

  & > h3 {
    margin-bottom: 2rem;
    font-size: 3rem;
    line-height: 1.2;
    font-weight: 600;
  }

  & > p {
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    width: 100%;

    & > h3 {
      font-size: 2rem;
      line-height: 1.2;
      font-weight: 500;
    }
  }
`;

const StyledServiceIcon = styled.div`
  width: 60%;
  height: 100%;
  flex: 2 1 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImageDescription = styled.div`

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 33%;

  @media (max-width: 768px) {
    flex: 50%;
    width: 10%;
  }
`;

const ImageDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;



  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
