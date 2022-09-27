import React from "react";
import styled from "styled-components";
import CustomerService from "@assets/new/images/home/customer-service.jpg";
import Imprint from "@assets/new/images/home/imprint.jpg";
import QuickChange from "@assets/new/images/home/quickChange.jpg";


interface InfoSectionType {
  image: StaticImageData;
  description: string;
  buttons: {
      link: string;
      title: string;
      icon: string;
  }[];
}[]

const InfoSectionData:InfoSectionType[] = [
  {
    image: CustomerService,
    description:
      "Our customer service team is available via email, phone call and WhatsApp.",
    buttons: [
      { link: "", title: "call", icon: "" },
      { link: "", title: "Email", icon: "" },
      { link: "", title: "Chat", icon: "" },
    ],
  },
  {
    image: Imprint,
    description:
      "We are passionate about empowering human potentials.",
    buttons: [
      { link: "", title: "Read more", icon: "" }
    ],
  },
  {
    image: QuickChange,
    description:
      "Our materials are represented in hundreds of products across multiple markets in Nigeria.",
    buttons: [
      { link: "", title: "Read more", icon: "" }
    ],
  },
];

function InfoSection() {
  return <InfoSectionStyled></InfoSectionStyled>;
}

export default InfoSection;

export const InfoSectionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
