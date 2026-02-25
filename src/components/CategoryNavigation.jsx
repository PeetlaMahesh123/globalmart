// CategoryNavigation.jsx
import React from 'react';
import '../styles/CategoryNavigation.css';


export function CategoryNavigation({ onCategoryClick }) {
  const categories = ['Shirts', 'Pants', 'Accessories', 'Mobiles', 'Mobile Accessories'];

  return (
    <nav className="category-navigation">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item" onClick={() => onCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}