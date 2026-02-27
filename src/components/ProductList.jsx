import React, { useState } from "react";
import "../styles/ProductList.css";

export function ProductList({ products, onAddToCart }) {

  const [loadingId, setLoadingId] = useState(null);

  if (!products || products.length === 0) {
    return <p className="no-products">No products available.</p>;
  }

  const handleClick = async (productId) => {

    console.log("BUTTON CLICKED:", productId);

    setLoadingId(productId);

    try {
      await onAddToCart(productId);
    }
    catch (error) {
      console.error(error);
    }

    setLoadingId(null);
  };

  return (

    <div className="product-grid">

      {products.map((product, index) => {

        const imageUrl =
          product.images?.[0] ||
          "https://placehold.co/300x300";

        return (

          <div
            key={`${product.product_id}-${index}`}
            className="product-card"
          >

            {/* IMAGE */}
            <div className="image-container">

              <img
                src={imageUrl}
                alt={product.name}
                className="product-image"
              />

            </div>

            {/* NAME */}
            <h3 className="product-name">
              {product.name}
            </h3>

            {/* PRICE */}
            <p className="product-price">
              ₹{Number(product.price).toFixed(2)}
            </p>

            {/* BUTTON */}
            <button
              type="button"
              className="add-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(product.product_id);
              }}
              disabled={loadingId === product.product_id}
            >
              {loadingId === product.product_id
                ? "Adding..."
                : "Add to Cart"}
            </button>

          </div>

        );

      })}

    </div>

  );

}