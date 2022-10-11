import React from "react";
import { ServiceCardType } from "@components/ServiceCard";
import styled from "styled-components";
import Prosthetics from "@assets/new/icons/home/prosthetics.svg";
import Enzymes from "@assets/new/icons/home/enzyme.svg";
import Training from "@assets/new/icons/home/training.svg"; 
import Operator from "@assets/new/icons/home/operator.svg";
import Briefcase from "@assets/new/icons/home/briefcase.svg";
import ShoppingCart from "@assets/new/icons/home/shopping-cart.svg";
import Image from "next/image";

const services: ServiceCardType[] = [
  { description: "Prosthetics", image: Prosthetics },
  { description: "Composites", image: Enzymes },
  { description: "Training", image: Training },
  { description: "After Sales", image: Operator },
  { description: "Consultancy", image: Briefcase },
  { description: "Procurement", image: ShoppingCart },
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
                height="120px"
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
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;

  @media(min-width: 768px) {
    flex-direction: row;
  }
`;

const ServiceWriteUp = styled.div`
  width: 100%;
  flex: 0 1 auto;

  & > h3 {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  & > p {
    line-height: 1.5;
    color: var(--text-colour-p);

  }

  @media (min-width: 1028px) {
    width: 40%;
    padding-left: 3rem;

    & > h3 {
      margin-bottom: 2rem;
      font-size: 3rem;
      line-height: 1.2;
      font-weight: 600;
    }
  }
`;

const StyledServiceIcon = styled.div`
  width: 100%;
  height: 100%;
  flex: 2 1 auto;

  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const ImageDescription = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  flex: 50%;
  margin-bottom: 2rem;


  & > p {
    color: var(--text-colour-p);
  }

  @media (min-width: 1028px) {
    flex: 33%;
  }
`;

const ImageDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;
