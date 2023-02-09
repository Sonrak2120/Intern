import React from "react";
import logoicn from "../../../assets/images/logo.png";
const LogoIcon = (props) => {
  return (
    <img
      alt="Logo"
      src={logoicn}
      {...props}
      style={{ height: "80%", width: "100%" }}
    />
  );
};

export default LogoIcon;
