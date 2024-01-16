import { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLinkClick = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <>
      <div className={`mobile-menu-button ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="menu-dot"></div>
        <div className="menu-dot"></div>
        <div className="menu-dot"></div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <Link to="/about" onClick={() => handleLinkClick("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link to="/project" onClick={() => handleLinkClick("/project")}>
                Projects
              </Link>
            </li>
            <li className="contact">
              <Link to="/contact" onClick={() => handleLinkClick("/contact")} className="contact-btn">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}

      <Link to="/" className="header-link" onClick={() => handleLinkClick("/")}>
        <div className="header">
          <h1 className="heading" style={{ color: "#02d688"}}>
            PORTFOLIO.
          </h1>
        </div>
      </Link>

      <div className="links">
        <ul className="nav-menu">
          <li>
            <Link to="/about" onClick={() => handleLinkClick("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link to="/project" onClick={() => handleLinkClick("/project")}>
              Projects
            </Link>
          </li>
          <li className="contact">
            <Link to="/contact" onClick={() => handleLinkClick("/contact")} className="contact-btn">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
