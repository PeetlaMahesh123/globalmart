import React, { useState } from 'react';
import useravatar from "../assets/useravatar.png";
import '../styles/ProfileDropdown.css';

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropdown}>
        <img src={useravatar} alt="User Avatar" />
        {username || 'Guest'}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <a href="#">Profile</a>
          <a href="#">Orders</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}