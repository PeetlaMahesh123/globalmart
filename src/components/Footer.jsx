// Footer.jsx
import React from 'react';
import '../styles/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>Global Mart</h3>
          <p>“Everything You Love, Delivered to Your Door.”</p>
        </div>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Global Mart. All rights reserved.</p>
      </div>
    </footer>
  );
}