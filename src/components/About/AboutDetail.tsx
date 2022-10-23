import React, { useState, SetStateAction } from "react";

interface AboutDetailProp {
  currentSelected: string
}

const AboutDetail: React.FC<AboutDetailProp> = ({currentSelected}) => {
  return (
    <div>
      {currentSelected}
    </div>
  )
}

export default AboutDetail
