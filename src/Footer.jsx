// Footer.jsx
import React from 'react';
import "./styles/CustomerHomePage.css";
import "./styles/Footer.css";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-title">GlobalMart</h3>
          <p className="footer-tagline">Your one-stop shop for all your needs. EveryThing you wants at one place. Best Quality Products.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 GlobalMart. All rights reserved.</p>
      </div>
    </footer>
  );
}