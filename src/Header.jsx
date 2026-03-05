import React from "react";
import { CartIcon } from "./CartIcon";
import { ProfileDropdown } from "./ProfileDropdown";
import Logo from "./Logo";
import "./styles/Header.css";

export function Header({ cartCount, username }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Logo />
        </div>

        <div className="header-right">
          <CartIcon count={cartCount} />
          <ProfileDropdown username={username} />
        </div>
      </div>
    </header>
  );
}