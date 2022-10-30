import React from "react";
import styled from "styled-components";
import {StyledIcon} from '@styled-icons/styled-icon'
import Call from "@assets/new/icons/call-info.svg";
import Email from "@assets/new/icons/email-info.svg";
import Whatsapp from "@assets/new/icons/whatsapp-info.svg";

import CustomerService from "@assets/new/images/home/customer-service.jpg";
import Imprint from "@assets/new/images/home/imprint.jpg";
import QuickChange from "@assets/new/images/home/quickchange.jpg";
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
    buttons: [{ link: "#product-vertical", title: "View Products"}],
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
  justify-content: center;
  flex-direction: column;
  padding: 2rem;


  @media (min-width: 768px) {
    flex-direction: row;
    flex: 1;
    padding: 3rem;
    gap: 2rem;
  }
`;