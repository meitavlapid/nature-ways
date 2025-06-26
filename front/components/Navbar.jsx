import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as bootstrap from "bootstrap";
import { useUser } from "../hooks/UserContext";
import { FaWhatsapp, FaUserCircle } from "react-icons/fa";
import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarNavDropdown");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) bsCollapse.hide();
  }, [location]);

  return (
    <nav className="navbar sticky-top">
      <div className="container">
        {/* צד ימין: לוגו */}
        <div className="logo">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750344062/logo_ul47xl.png"
              alt="לוגו האתר"
            />
          </Link>
        </div>

        {/* מרכז */}
        <div className="nav-center">
          <ul>
            <li className="dropdown">
              <span>מוצרים</span>
              <ul >
                <li>
                  <Link to="/psoriasis">פסוריאזיס</Link>
                </li>
                <li>
                  <Link to="/antiaging">אנטי אייג'ינג</Link>
                </li>
                <li>
                  <Link to="/acne">אקנה</Link>
                </li>
                <li>
                  <Link to="/pigmentation">פיגמנטציה</Link>
                </li>
                <li>
                  <Link to="/hairloss">התקרחות</Link>
                </li>
                <li>
                  <Link to="/rehabilitation">שיקום העור</Link>
                </li>
                <li>
                  <Link to="/weightloss">הרזייה וחיטוב</Link>
                </li>
                <li>
                  <Link to="/customdevelopment">פיתוח אישי</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/research">תוכן ומחקר</Link>
            </li>
            <li>
              <Link to="/contact">צור קשר</Link>
            </li>
            <li>
              <Link to="/about">אודות</Link>
            </li>
          </ul>
        </div>

        {/* צד שמאל: אייקונים */}
        <div className="nav-icons">
          <a
            href="https://wa.me/972501234567"
            target="_blank"
            rel="noopener noreferrer"
            title="צ'אט ווטסאפ"
          >
            <FaWhatsapp size={24} color="#25D366" />
          </a>
          <Link to={user ? "/profile" : "/login"} title="אזור אישי">
            <FaUserCircle size={24} color="#333" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
