import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'; // Import the image
import "./styles/Logo.css";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div className="logo-container" onClick={() => navigate('/customerhome')}>
      <img
        src={logo} // Use the imported image
        alt="SalesSavvy Logo"
        className="logo-image" // Updated class name
        onError={(e) => { e.target.src = 'fallback-logo.png'; }} // Fallback for image error
      />
      <span className="logo-text">GlobalMart</span>
    </div>
  );
}