// Footer.jsx
import React from 'react';
import "./styles/CustomerHomePage.css";
import "./styles/Footer.css";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-title" align="center">Global Mart</h3>
          <p className="footer-tagline" >Global Mart – Where the World Shops from everywhere, for everyone.
          <br />
          Worldwide varieties with trusted & branded Quality.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Global Mart. All rights reserved.</p>
      </div>
    </footer>
  );
}