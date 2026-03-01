import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "../components/CategoryNavigation";
import { ProductList } from "../components/ProductList";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/CustomerHomePage.css";
import { addToCart, getCartCount } from "../api/cartApi";

export default function CustomerHomePage() {

  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD PRODUCTS ON PAGE LOAD
  // ===============================
  useEffect(() => {
    fetchProducts("Shirts");
  }, []);

  // ===============================
  // FETCH PRODUCTS
  // ===============================
  const fetchProducts = async (category = "") => {

    try {

      setLoading(true);

      const response = await fetch(
        `http://localhost:9096/api/products?category=${category}`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      console.log("Products:", data);

      const loggedUser = data?.user?.name || "";

      setUsername(loggedUser);

      setProducts(data?.products || []);

      // fetch cart count
      if (loggedUser) {
        fetchCartCount(loggedUser);
      }

    }
    catch (error) {
      console.error("Fetch products error:", error);
    }
    finally {
      setLoading(false);
    }

  };

  // ===============================
  // FETCH CART COUNT
  // ===============================
  const fetchCartCount = async (user) => {

    try {

      const result = await getCartCount(user);

      if (result && typeof result.count === "number") {
        setCartCount(result.count);
      } else {
        setCartCount(0);
      }

    }
    catch (error) {

      console.error("Cart count error:", error);
      setCartCount(0);

    }

  };

  // ===============================
  // ADD TO CART
  // ===============================
  const handleAddToCart = async (productId) => {

    try {

      await addToCart({
        username,
        productId,
        quantity: 1
      });

      fetchCartCount(username);

    }
    catch (error) {
      console.error("Add to cart error:", error);
    }

  };

  // ===============================
  // UI
  // ===============================
  return (

    <div className="customer-homepage">

      {/* HEADER */}
      <Header
        cartCount={cartCount}
        username={username || "Guest"}
      />

      {/* CATEGORY NAVIGATION */}
      <div className="navigation-container">
        <CategoryNavigation onCategoryClick={fetchProducts} />
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content-container">

        {loading ? (
          <div className="loading-container">
            <p>Loading products...</p>
          </div>
        ) : (
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
          />
        )}

      </div>

      {/* FOOTER */}
      <Footer />

    </div>

  );

}