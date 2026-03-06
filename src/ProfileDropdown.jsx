import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useravatar from "./useravatar.png";
import "./styles/ProfileDropdown.css";

export function ProfileDropdown({ username }) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  /* ================= TOGGLE DROPDOWN ================= */

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /* ================= NAVIGATE TO PROFILE ================= */

  const handleProfileClick = () => {
    navigate("/customerhome");
    setIsOpen(false);
  };

  /* ================= NAVIGATE TO ORDERS ================= */

  const handleOrdersClick = () => {
    navigate("/orders");
    setIsOpen(false);
  };

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {

    try {

      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {

        console.log("User logged out");

        navigate("/");

      } else {

        console.error("Logout failed");

      }

    } catch (error) {

      console.error("Logout error:", error);

    }

  };

  return (

    <div className="profile-dropdown">

      {/* PROFILE BUTTON */}

      <button
        className="profile-button"
        onClick={toggleDropdown}
      >

        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.target.src = "fallback-logo.png";
          }}
        />

        <span className="username">
          {username || "Guest"}
        </span>

      </button>


      {/* DROPDOWN MENU */}

      {isOpen && (

        <div className="dropdown-menu">

          <button
            className="dropdown-item"
            onClick={handleProfileClick}
          >
            Profile
          </button>

          <button
            className="dropdown-item"
            onClick={handleOrdersClick}
          >
            Orders
          </button>

          <button
            className="dropdown-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      )}

    </div>

  );

}