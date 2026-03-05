import React from "react";
import "./styles/ProductList.css";

export function ProductList({ products = [], onAddToCart }) {

  // If no products available
  if (!products || products.length === 0) {
    return <p className="no-products">No products available.</p>;
  }

  return (
    <div className="product-list">

      <div className="product-grid">

        {products.map((product) => {

          // Get first image or fallback
          const imageUrl =
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/300";

          return (

            <div key={product.product_id} className="product-card">

              {/* PRODUCT IMAGE */}
              <div className="product-image-container">

                <img
                  src={imageUrl}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />

              </div>


              {/* PRODUCT INFO */}
              <div className="product-info">

                <h3 className="product-name">
                  {product.name}
                </h3>

                <p className="product-price">
                  ₹{Number(product.price).toFixed(2)}
                </p>

                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product.product_id)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}