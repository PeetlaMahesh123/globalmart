import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "../components/CategoryNavigation";
import { ProductList } from "../components/ProductList";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "../styles/CustomerHomePage.css";

import {
  addToCart,
  getCartCount,
} from "../api/cartApi";

export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const [isCartLoading, setIsCartLoading] = useState(true);

  // 🔹 Load products on first render
  useEffect(() => {
    fetchProducts("Shirts");
  }, []);

  // 🔹 Fetch Products
  const fetchProducts = async (category = "") => {
    try {
      const response = await fetch(
        `http://localhost:9092/api/products${
          category ? `?category=${category}` : ""
        }`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      const loggedUser = data?.user?.name || "";
      setUsername(loggedUser);
      setProducts(data?.products || []);

      if (loggedUser) {
        await fetchCartCount(loggedUser);
      } else {
        setCartCount(0);
      }

    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // 🔹 Fetch Cart Count
  const fetchCartCount = async (user) => {
    try {
      setIsCartLoading(true);

      const count = await getCartCount(user);

      console.log("Cart count from backend:", count); // 🔥 DEBUG

      setCartCount(count ?? 0);

    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    } finally {
      setIsCartLoading(false);
    }
  };

  // 🔹 Category Click
  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  // 🔹 Add to Cart
  const handleAddToCart = async (productId) => {
    if (!username) {
      alert("Please login first");
      return;
    }

    try {
      await addToCart({
        username,
        productId,
        quantity: 1,
      });

      console.log("Product added, refreshing count..."); // 🔥 DEBUG

      await fetchCartCount(username); // 🔥 IMPORTANT

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? "..." : cartCount}
        username={username || "Guest"}
      />

      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>

      <main className="main-content">
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />
    </div>
  );
}