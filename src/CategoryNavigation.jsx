import React, { useState } from "react";
import "./styles/CategoryNavigation.css";

export function CategoryNavigation({ onCategoryClick }) {
  // Static categories list
  const categories = ['Shirts', 'Pants', 'Accessories', 'Mobiles', 'Mobile Accessories'];

  return (
    <nav className="category-navigation">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li
            key={index}
            className="category-item"
            onClick={() => onCategoryClick(category)} // Trigger the click handler on category click
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}