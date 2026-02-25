import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartIcon.css";

export function CartIcon({ count = 0 }) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/UserCartPage");
  };

  return (
    <div className="cart-icon" onClick={handleCartClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="cart-icon-svg"
      >
        <path d="M3 3h18l-2 9H5L3 3zM8.5 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
      </svg>

      {count > 0 && (
        <span className="cart-badge">
          {count}
        </span>
      )}
    </div>
  );
}