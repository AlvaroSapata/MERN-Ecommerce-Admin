import React from "react";
import "./Footer.css";
import InstagramIcon from "../Assets/instagram.svg";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <div className="footer-content">
        <p>© 2024 LA.GRIMA Taller </p>
        <a href="https://www.instagram.com/la__grima__taller/" target="_blank" rel="noopener">
          <img src={InstagramIcon} alt="Insta" />
        </a>
        <p> All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
