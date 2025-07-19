import React from "react";
import { NavLink } from "react-router-dom";

const navStyle = {
  padding: "16px 32px",
  backgroundColor: "#222",
  display: "flex",
  justifyContent: "center",
  gap: "24px",
};

const linkStyle = {
  margin: "0 12px",
  textDecoration: "none",
  color: "#555",
  fontWeight: "500",
};

const activeStyle = {
  color: "#e7e41d", // your yellow accent
  fontWeight: "700",
  borderBottom: "2px solid #e7e41d",
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        About
      </NavLink>
      <NavLink
        to="/services"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Services
      </NavLink>
      <NavLink
        to="/contact"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;
