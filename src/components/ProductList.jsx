import React, { useState } from 'react';
import '../styles/ProductList.css';

export function ProductList({ products, onAddToCart }) {

  const [loadingId, setLoadingId] = useState(null);

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  const handleClick = async (productId) => {
    setLoadingId(productId);

    try {
      await onAddToCart(productId);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="product-grid">
      {products.map((product) => {

        const imageUrl =
          product.images && product.images.length > 0
            ? product.images[0]
            : 'https://via.placeholder.com/200';

        return (
          <div key={product.product_id} className="product-card">

            <div className="product-image">
              <img
                src={imageUrl}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200';
                }}
              />
            </div>

            <h3>{product.name}</h3>

            {/* Better price format */}
            <p>₹{Number(product.price).toFixed(2)}</p>

            <button
              onClick={() => handleClick(product.product_id)}
              disabled={loadingId === product.product_id}
            >
              {loadingId === product.product_id ? "Adding..." : "Add to Cart"}
            </button>

          </div>
        );
      })}
    </div>
  );
}