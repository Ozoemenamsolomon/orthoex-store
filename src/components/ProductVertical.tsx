import React from "react";
import styled from "styled-components";
import SooSection from "./SooSection";
import ColorPigment from "@assets/new/images/home/color_pigment.jpg";
import EpoxyResins from "@assets/new/images/home/epoxy_resin.jpg";
import Fabrication from "@assets/new/images/home/fabrication_materials.jpg";
import Orthoses from "@assets/new/images/home/orthoses.jpg";
import PolyesterResins from "@assets/new/images/home/polyester_resins.jpg";
import SiliconMould from "@assets/new/images/home/silicon_mould.jpg";
import SyntheticFibre from "@assets/new/images/home/synthetic_fibre.jpg";
import Protheses from "@assets/new/images/home/prosthesis.jpg";
import ProductVerticalCard from "./ProductVerticalCard";

export interface VerticalType {
  title: string;
  image: StaticImageData;
  link: string;
}

const productVerticalData: VerticalType[] = [
  {
    title: "synthetic fibre",
    image: SyntheticFibre,
    link: "",
  },
  {
    title: "epoxy resin",
    image: EpoxyResins,
    link: "",
  },
  {
    title: "color pigment",
    image: ColorPigment,
    link: "",
  },
  {
    title: "silicon mould",
    image: SiliconMould,
    link: "",
  },
  {
    title: "orthoses",
    image: Orthoses,
    link: "",
  },
  {
    title: "prostheses",
    image: Protheses,
    link: "",
  },
  {
    title: "fabrication materials",
    image: Fabrication,
    link: "",
  },
  {
    title: "polyester resin",
    image: PolyesterResins,
    link: "",
  },
];

function ProductVertical() {
  return (
    <div id="product-vertical">
      <SooSection
        header={{
          title: "Which of our product vertical is relevant for you?",
          subtitle:
            "Take full advantage of our expert knowledge and growing product portfolio in these domains for your specific field of application:",
        }}
      >
        <StyledProductSection>
          {productVerticalData.map((product, index) => (
            <ProductVerticalCard
              image={product.image}
              key={`${index}-${product}`}
              link={product.link}
              title={product.title}
            />
          ))}
        </StyledProductSection>
      </SooSection>
    </div>
  );
}

export default ProductVertical;

const StyledProductSections = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);

  @media(min-width: 768px){
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;


const StyledProductSection = styled.div`
  display: flex;

  @media(min-width: 768px){

  }
`;
