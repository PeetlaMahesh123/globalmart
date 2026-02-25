import React from "react";
import Logo from "./Logo";
import { CartIcon } from "./CartIcon";
import { ProfileDropdown } from "./ProfileDropdown";
import "../styles/Header.css";

export function Header({ cartCount, username }) {
  return (
    <header className="header">
      <div className="header-content">
        
        {/* Logo Component */}
        <Logo />

        {/* Right Section */}
        <div className="header-actions">
          <CartIcon count={cartCount} />
          <ProfileDropdown username={username} />
        </div>

      </div>
    </header>
  );
}