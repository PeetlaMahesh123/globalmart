import React from "react";
import CategoryNavigation from "./CategoryNavigation";
import CartIcon from "./CartIcon";
import ProfileDropdown from "./ProfileDropdown";
import "../styles/Navbar.css";

export default function Navbar({ setProducts }) {
  return (
    <div className="navbar">
      <h2 className="logo">Global Mart</h2>

      <CategoryNavigation setProducts={setProducts} />

      <div className="nav-right">
        <CartIcon />
        <ProfileDropdown />
      </div>
    </div>
  );
}