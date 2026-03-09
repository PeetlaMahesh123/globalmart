import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductList } from "./ProductList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./styles/CustomerHomePage.css";

export default function CustomerHomePage() {

  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("Guest");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    initializePage();
  }, []);

  // Initialize page by fetching user and products
  const initializePage = async () => {
    await fetchUser();
    fetchProducts("Shirts");
  };

  // Fetch logged in user
const fetchUser = async () => {

  try {

    const response = await fetch(
      "https://globalmart-backend-rktj.onrender.com/api/auth/me",
      {
        method: "GET",
        credentials: "include"
      }
    );

    if (!response.ok) {
      setUsername("Guest");
      return;
    }

    const data = await response.json();

    if (data && data.username) {
      setUsername(data.username);
    } else {
      setUsername("Guest");
    }

  } catch (error) {
    console.log("User fetch error:", error);
    setUsername("Guest");
  }
};
  // Fetch products
  const fetchProducts = async (category = "Shirts") => {

    try {

      const response = await fetch(
        `https://globalmart-backend-rktj.onrender.com/api/products?category=${category}`,
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        setProducts([]);
        return;
      }

      const data = await response.json();

      // Ensure products is always array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }

    } catch (error) {
      console.log("Product fetch error:", error);
      setProducts([]);
    }
  };

  // Fetch cart count
  const fetchCartCount = async (username) => {

    if (!username || username === "Guest") {
      setCartCount(0);
      return;
    }

    try {

      const response = await fetch(
        `https://globalmart-backend-rktj.onrender.com/api/cart/items/count?username=${username}`,
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        setCartCount(0);
        return;
      }

      const count = await response.json();
      setCartCount(count || 0);

    } catch (error) {
      console.log("Cart count error:", error);
      setCartCount(0);
    }
  };

  // Add product to cart
  const handleAddToCart = async (productId) => {

    if (username === "Guest") {
      alert("Please login first to add items to cart.");
      return;
    }

    try {

      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            productId: productId
          })
        }
      );

      if (response.ok) {
        fetchCartCount(username);
      } else {
        console.log("Failed to add item to cart");
      }

    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

  return (

    <div className="customer-homepage">

      <Header
        cartCount={cartCount}
        username={username}
      />

      <nav className="navigation">
        <CategoryNavigation onCategoryClick={fetchProducts} />
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