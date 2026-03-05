import React, { useState } from "react";
import "./styles/CategoryNavigation.css";

export function CategoryNavigation({ onCategoryClick }) {
  const categories = [
    "Shirts",
    "Pants",
    "Accessories",
    "Mobiles",
    "Mobile Accessories",
  ];

  const [activeCategory, setActiveCategory] = useState("Shirts");

  const handleClick = (category) => {
    setActiveCategory(category);
    onCategoryClick(category);
  };

  return (
    <nav className="category-navigation">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`category-item ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}