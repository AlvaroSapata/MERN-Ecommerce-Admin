import React from "react";
import { Form, Link } from "react-router-dom";
import "./Navbar.css";
import navlogoImg from "../Assets/nav-logo-Image.svg";
import navlogoLAGRIMA from "../Assets/nav-logo-LAGRIMA.svg";
import navlogoAdmin from "../Assets/nav-logo-Admin.svg";
import LoginIcon from "../Assets/login.svg";
import LogoutIcon from "../Assets/logout.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
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
      </Link>
      <img src={LoginIcon} className="nav-profile" alt="" />
    </div>
  );
};

export default Navbar;
