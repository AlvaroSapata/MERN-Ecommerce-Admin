import React from "react";
import "./Navbar.css";
import navlogoImg from "../Assets/nav-logo-Image.svg";
import navlogoLAGRIMA from "../Assets/nav-logo-LAGRIMA.svg";
import navlogoAdmin from "../Assets/nav-logo-Admin.svg";
import navprofileIcon from "../Assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={navlogoImg} className="nav-logo--icon" alt="Icon" />
        <div className="nav-logo--text">
          <img
            src={navlogoLAGRIMA}
            className="nav-logo--title"
            alt="LA.GRIMA"
            
          />
          <img
            src={navlogoAdmin}
            className="nav-logo--admin"
            alt="Admin Panel"
          />
        </div>
      </div>
      <img src={navprofileIcon} className="nav-profile" alt="" />
    </div>
  );
};

export default Navbar;
