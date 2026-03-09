import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductList } from "./ProductList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import "./styles/CustomerHomePage.css";

export default function CustomerHomePage() {

  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ================= PAGE LOAD =================

  useEffect(() => {
    fetchProducts("Shirts");
  }, []);

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async (category = "Shirts") => {

    try {

      const response = await fetch(
        `https://globalmart-backend-rktj.onrender.com/api/products?category=${category}`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      console.log("Products API status:", response.status);

      // Redirect ONLY if unauthorized
      if (response.status === 401) {
        navigate("/");
        return;
      }

      if (!response.ok) {
        console.error("Products API error:", response.status);
        return;
      }

      const data = await response.json();

      setProducts(data.products || []);
      setUsername(data.username || "");

      if (data.username) {
        fetchCartCount(data.username);
      }

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH CART COUNT =================

  const fetchCartCount = async (user) => {

    try {

      const response = await fetch(
        `https://globalmart-backend-rktj.onrender.com/api/cart/items/count?username=${user}`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      if (!response.ok) {
        console.error("Cart count API error:", response.status);
        return;
      }

      const count = await response.json();

      setCartCount(count);

    } catch (error) {
      console.error("Cart count error:", error);
    }
  };

  // ================= ADD TO CART =================

  const handleAddToCart = async (productId) => {

    try {

      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/cart/add",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            productId
          })
        }
      );

      if (response.ok) {
        fetchCartCount(username);
      } else {
        console.error("Add to cart failed:", response.status);
      }

    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  // ================= UI =================

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

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
          />
        )}

      </main>

      <Footer />

    </div>

  );
}