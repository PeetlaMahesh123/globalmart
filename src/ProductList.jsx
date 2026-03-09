import React from "react";
import "./styles/ProductList.css";

export function ProductList({ products, onAddToCart }) {

  if(!Array.isArray(products) || products.length === 0){
    return <p className="no-products">No products available.</p>;
  }

  return (
    <div className="product-list">
      <div className="product-grid">

        {products.map((product) => {

          const imageUrl =
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/150";

          return (

            <div key={product.product_id || product.productId} className="product-card">

              <img
                src={imageUrl}
                alt={product.name}
                className="product-image"
                loading="lazy"
                onError={(e)=>{
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />

              <div className="product-info">

                <h3 className="product-name">{product.name}</h3>

                <p className="product-description">
                  {product.description || "No description"}
                </p>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <button
                  className="add-to-cart-btn"
                  onClick={()=>onAddToCart(product.product_id || product.productId)}
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