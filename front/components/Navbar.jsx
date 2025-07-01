import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as bootstrap from "bootstrap";
import { useUser } from "../hooks/UserContext";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";
import { FaWhatsapp, FaUserCircle } from "react-icons/fa";

import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const { user } = useUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar sticky-top">
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
          <li className="dropdown" ref={dropdownRef}>
            <span onClick={() => setDropdownOpen(!isDropdownOpen)}>מוצרים</span>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/psoriasis" onClick={() => setDropdownOpen(false)}>
                    פסוריאזיס
                  </Link>
                </li>
                <li>
                  <Link to="/antiaging" onClick={() => setDropdownOpen(false)}>
                    אנטי אייג'ינג
                  </Link>
                </li>
                <li>
                  <Link to="/acne" onClick={() => setDropdownOpen(false)}>
                    אקנה
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pigmentation"
                    onClick={() => setDropdownOpen(false)}
                  >
                    פיגמנטציה
                  </Link>
                </li>
                <li>
                  <Link to="/hairloss" onClick={() => setDropdownOpen(false)}>
                    התקרחות
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rehabilitation"
                    onClick={() => setDropdownOpen(false)}
                  >
                    שיקום העור
                  </Link>
                </li>
                <li>
                  <Link to="/weightloss" onClick={() => setDropdownOpen(false)}>
                    הרזייה וחיטוב
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customdevelopment"
                    onClick={() => setDropdownOpen(false)}
                  >
                    פיתוח אישי
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/articles">תוכן ומחקר</Link>
          </li>

          <li>
            <Link to="/about">אודות</Link>
          </li>
          <li>
            <Link to="/contact">צור קשר</Link>
          </li>
        </ul>
      </div>
      {/* צד שמאל: אייקונים */}
      <div className="nav-icons">
        <a
          href="https://wa.me/972558829222?text=היי%20אני%20פונה%20אלייך%20דרך%20אתר%20נייצר%20וויז"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={24} color="#25D366" />
        </a>

        {!user && (
          <Link to="/login" title="התחברות">
            <TbDoorEnter size={24} color="#333" />
          </Link>
        )}

        {user && (
          <>
            <Link to="/admin" title="אזור אישי">
              <FaUserCircle size={24} color="#D7B98B" className="user-icon" />
            </Link>
            <Link onClick={logout} title="התנתקות">
              <TbDoorExit size={24} color="#333" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
