import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useravatar from "./useravatar.png";
import "./styles/ProfileDropdown.css";

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    navigate("/customerhome");
    setIsOpen(false);
  };

  const handleOrdersClick = () => {
    navigate("/orders");
    setIsOpen(false);
  };

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
        console.log("User successfully logged out");
        navigate("/");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.target.src = "fallback-logo.png";
          }}
        />
        <span className="username">{username || "Guest"}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleProfileClick}>
            Profile
          </button>

          <button className="dropdown-item" onClick={handleOrdersClick}>
            Orders
          </button>

          <button className="dropdown-item logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}