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

  const handleLogout = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <div className="profile-dropdown">

      <button className="profile-btn" onClick={toggleDropdown}>

        <img
          src={useravatar}
          alt="User Avatar"
          className="profile-avatar"
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