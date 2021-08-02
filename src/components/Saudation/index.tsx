import React from "react";

import { SaudationDiv, SaudationTitle } from "./styles";

interface UserNameProps {
  title: string;
  subtitle: string;
}

const Saudation: React.FC<UserNameProps> = ({ title, subtitle }) => {
  return (
    <SaudationDiv className="typography-hd-cr-3 mb-3">
      <SaudationTitle style={{ color: "grey" }}>
        <span style={{ fontWeight: "lighter" }}>{title} </span>
        <strong>{subtitle}</strong>
      </SaudationTitle>
    </SaudationDiv>
  );
};

export default Saudation;
