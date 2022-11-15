import { useState } from "react";
import styled from "styled-components";
import AboutDetail, { AboutDetailDataType, DescriptionInfoType } from "../components/About/AboutDetail";
import AboutInfo from "../components/About/AboutInfo";
import { Container } from "@components/styled";
import OurMission from "@assets/new/icons/about/our-mission.svg"
import OurVision from "@assets/new/icons/about/our-vision.svg"
import HumanPotential from "@assets/new/icons/about/human-potentials.svg"
import Innovative from "@assets/new/icons/about/innovative.svg"
import SwiftResponsive from "@assets/new/icons/about/swift-and-responsive.svg"
import PositivePassionate from "@assets/new/icons/about/positive-and-pastionate.svg"
import Excellence from "@assets/new/icons/about/excellence-and-dependable.svg"
import CustomerFirst from "@assets/new/icons/about/customer-first.svg"
import Orthopeadeics from "@assets/new/icons/about/orthopaedics.svg"
import Composites from "@assets/new/icons/about/composites.svg"

const AboutInfoData = [
  { title: "Company overview", titleId: "overview" },
  { title: "Culture and values", titleId: "values" },
  { title: "Our businesses", titleId: "business" },
];


const overviewDescription = [
  "OrthoEx is a leading prosthetic, orthotic components, and composite materials supplier. Since 2014, we have served thousands of professionals in both the private and public sectors. Our products are designed for our customers' needs across multiple markets in the healthcare and manufacturing industries. In addition, we work closely with prosthetists who provide free artificial limbs to amputees in Nigeria.",
  "As the market leader, we collaborate with top brands across the globe and offer technical training and consultancy to professionals and organizations on our range of products and technologies.",
  "We pride ourselves on satisfying our customers and helping them reach their business goals. OrthoEx is on a mission to empower human potential!",
  "There are many reasons our partners love to work with us. Join us and take advantage of the growing benefits as we continue to grow our competence, quality, and customer experience."
]

const missionData: DescriptionInfoType[] = [
  {image: OurMission,title: "Our Mission", description: "To empower human potential."},
  {image: OurVision,title: "Our Vision", description: "To be the preferred partner of choice for quality"},
]

const businessData: DescriptionInfoType[] = [
  {image: Orthopeadeics,title: "Orthopaedics", description: "We continually enable our clients to achieve efficiency and increased effectiveness of biomedical devices designed for their patients."},
  {image: Composites, title: "Composites", description: "We collaborate with our clients to help them adapt to changing market conditions and stay ahead of the competition."},
]
const valuesData: DescriptionInfoType[] = [
  {image: CustomerFirst,title: "Customer-first", description: "Our customers are the centre of our corporate decisions. "},
  {image: HumanPotential,title: "Empower human potentials", description: "We challenge and inspire our customers and employees to make an impact through their work"},
  {image: Excellence,title: "Excellence and dependable", description: "We surpass our customers' expecta tions in a caring and professional manner."},
  {image: PositivePassionate,title: "Positive & passionate", description: "We are a cheerful people, passionate about our brand and mission. We believe in possibilities!"},
  {image: SwiftResponsive,title: "Swift and Responsive", description: "We are swift and responsive by design. We prioritize a personalized customer experience."},
  {image: Innovative,title: "Innovative", description: "We encourage collaborations and constantly seek new innovative solutions to our challenges."},
]

const aboutDetailData: AboutDetailDataType = {
  description: overviewDescription,
  business: businessData,
  mission: missionData,
  values: valuesData
}

function About() {
  const [currentSelected, setcurrentSelected] = useState<string>("overview");

  return (
    <Container bg="#FAFAFA" paddingMultiplier={0}>
      <StyledAbout>
        <AboutInfo data={AboutInfoData} setCurrentSelected={setcurrentSelected} />
        <AboutDetail data={aboutDetailData} currentSelected={currentSelected} />
      </StyledAbout>
    </Container>
  );
}

export default About;

// remove min-height below

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  margin-top: 5rem;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 3rem 5rem 5rem;
    background-color: var(--oex-lightest-grey);
  }
`;

