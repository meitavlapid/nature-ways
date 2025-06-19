import React from "react";

import { FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-right">
        <a href="https://facebook.com" target="_blank">
          <FaFacebook />
        </a>
        <a href="https://wa.me/yourwhatsappnumber" target="_blank">
          <FaWhatsapp />
        </a>
        <a href="mailto:info@example.com" target="_blank">
          <FaEnvelope />
        </a>
      </div>

      <div className="footer-center">
        <img src="../images/logo.png" alt="לוגו האתר" className="footer-logo" />
      </div>

      <div className="footer-left">
        <p>צור קשר</p>
        <p>© כל הזכויות שמורות</p>
      </div>
    </footer>
  );
}

export default Footer;
