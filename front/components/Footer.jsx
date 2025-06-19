import React from "react";
import { FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-right">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://wa.me/yourwhatsappnumber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <a
          href="mailto:info@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
        </a>
      </div>

      <div className="footer-center">
        <img
          src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750344062/logo_ul47xl.png"
          alt="לוגו האתר"
          className="footer-logo"
        />
      </div>

      <div className="footer-left">
        <p>צור קשר</p>
        <p>© כל הזכויות שמורות</p>
      </div>
    </footer>
  );
}

export default Footer;
