import React from "react";
import { FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../css/Footer.css";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-right">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="facebook-icon" />
        </a>
        <a
          href="https://wa.me/yourwhatsappnumber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="whatsapp-icon" />
        </a>
        <a
          href="mailto:info@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className="email-icon" />
        </a>
      </div>

      <div className="footer-center">
        <img
          src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750344062/logo_ul47xl.png"
          alt="לוגו האתר"
        
        />
      </div>

      <div className="footer-left">
       
        <p>© כל הזכויות שמורות</p>
        
        <Link to="/">האתר נבנה ע"י ML</Link>
      </div>
    </footer>
  );
}

export default Footer;
