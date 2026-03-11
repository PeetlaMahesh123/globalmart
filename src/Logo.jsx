import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png"; // your logo image
import "./styles/Logo.css";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div className="logo-container" onClick={() => navigate("/customerhome")}>
      <img
        src={logo}
        alt="GlobalMart Logo"
        className="logo-image"
        onError={(e) => { e.target.src = "fallback-logo.png"; }}
      />
      <span className="logo-text">GlobalMart</span>
    </div>
  );
}