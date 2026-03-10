import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/CartIcon.css";

export function CartIcon({ count }) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/UserCartPage'); // Navigate to the cart page
  };

  return (
    <div className="cart-icon" onClick={handleCartClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="cart-icon-svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h18l-2 9H5L3 3zM8.5 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        />
      </svg>
      <span className="cart-badge">{count}</span> {/* Always display the count */}
    </div>
  );
}