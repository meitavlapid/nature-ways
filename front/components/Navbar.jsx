import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as bootstrap from "bootstrap";
import { useUser } from "../hooks/UserContext";
import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const { user, logout } = useUser();

  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarNavDropdown");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) bsCollapse.hide();
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top ">
     
        <div className="logo">
          <Link className="navbar-brand" to="/">
            <img
              src="https://res.cloudinary.com/dt5nnq3ew/image/upload/v1750344062/logo_ul47xl.png"
              alt="לוגו האתר"
              className="logo-img"
            />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="תפריט ניווט"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse custom-collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                עמוד הבית
              </Link>
            </li>

            <li className="nav-item dropdown">
              <span
                className="nav-link"
                role="button"
                data-bs-toggle="dropdown"
              >
                איכות ומרקם העור
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/psoriasis">
                    פסוריאזיס
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/antiaging">
                    אנטי אייג'ינג
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/acne">
                    אקנה
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/pigmentation">
                    פיגמנטציה
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/hairloss">
                התקרחות גברית/נשית
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rehabilitation">
                שיקום העור
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/weightloss">
                הרזייה וחיטוב הגוף{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customdevelopment">
                מוצרים פיתוח אישי
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/research">
                תוכן ומחקר
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                צור קשר
              </Link>
            </li>

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  ניהול המערכת
                </Link>
              </li>
            )}

            {user ? (
              <li className="nav-item">
                <span className="user-greeting">שלום {user.name}</span>
                <button className="btn btn-outline-danger" onClick={logout}>
                  התנתק
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    התחברות
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    הרשמה
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
    </nav>
  );
}

export default Navbar;
