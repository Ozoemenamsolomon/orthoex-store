import React from "react";
import styled from "styled-components";
import {Whatsapp} from '@styled-icons/bootstrap';
import {Email} from '@styled-icons/material-outlined';
import {StyledIcon} from '@styled-icons/styled-icon'
import {Call} from '@styled-icons/fluentui-system-regular';
import CustomerService from "@assets/new/images/home/customer-service.svg";
import Imprint from "@assets/new/images/home/imprint.svg";
import QuickChange from "@assets/new/images/home/quickchange.svg";
import InfoCard from "./InfoCard";

interface InfoSectionType {
  image: StaticImageData;
  description: string;
  buttons: {
    link: string;
    title: string;
    icon?: StyledIcon;
  }[];
}
[];

const InfoSectionData: InfoSectionType[] = [
  {
    image: CustomerService,
    description:
      "Our customer service team is available via email, phone call and WhatsApp.",
    buttons: [
      { link: "", title: "Call", icon: Call },
      { link: "", title: "Email", icon: Email },
      { link: "", title: "Chat", icon: Whatsapp },
    ],
  },
  {
    image: QuickChange,
    description: "We are passionate about empowering human potentials.",
    buttons: [{ link: "", title: "Read more"}],
  },
  {
    image: Imprint,
    description:
      "Our materials are represented in hundreds of products across multiple markets in Nigeria.",
    buttons: [{ link: "", title: "View Products"}],
  },
];

function InfoSection() {
  return (
    <InfoSectionStyled>
      {InfoSectionData.map((item, index) => (
        <InfoCard
          key={index}
          buttons={item.buttons}
          image={item.image}
          description={item.description}
        />
      ))}
    </InfoSectionStyled>
  );
}

export default InfoSection;

export const InfoSectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex: 1;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }

  @media (max-width: 400px) {
    padding: 0rem;
  }
`;
