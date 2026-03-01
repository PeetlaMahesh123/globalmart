import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useravatar from "../assets/useravatar.png";
import "../styles/ProfileDropdown.css";

export function ProfileDropdown({ username }) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/home");
  };

  const handleOrders = () => {
    setIsOpen(false);
    navigate("/orders");
  };

  // ✅ CORRECT LOGOUT FUNCTION
  const handleLogout = async () => {

    setIsOpen(false);

    try {

      const response = await fetch("http://localhost:9096/api/auth/logout", {
        method: "POST",
        credentials: "include", // important for session cookies
      });

      if (response.ok) {

        // ✅ clear local storage
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        // optional: clear all storage
        // localStorage.clear();

        console.log("Logout successful");

        navigate("/login");

      } else {

        console.error("Logout failed");

      }

    } catch (error) {

      console.error("Logout error:", error);

    }

  };

  return (
    <div className="profile-dropdown">

      <button className="profile-btn" onClick={toggleDropdown}>

        <img
          src={useravatar}
          alt="User Avatar"
          className="profile-avatar"
          onError={(e) => e.target.src = "/fallback-avatar.png"}
        />

        <span className="profile-name">
          {username || "Guest"}
        </span>

      </button>

      {isOpen && (

        <div className="dropdown-menu">

          <button
            className="dropdown-item"
            onClick={handleProfile}
          >
            Profile
          </button>

          <button
            className="dropdown-item"
            onClick={handleOrders}
          >
            Orders
          </button>

          <button
            className="dropdown-item logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      )}

    </div>
  );
}