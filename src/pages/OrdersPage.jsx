import React, { useState, useEffect } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "../styles/OrdersPage.css";

export default function OrdersPage() {

  // ===============================
  // State
  // ===============================
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // ===============================
  // Load page
  // ===============================
  useEffect(() => {

    fetchUserAndOrders();

  }, []);



  // ===============================
  // Fetch user first
  // ===============================
  const fetchUserAndOrders = async () => {

    try {

      // STEP 1: Get logged user (same as CartPage)
      const userResponse = await fetch(
        "http://localhost:9093/api/products?category=Shirts",
        {
          credentials: "include"
        }
      );

      if (!userResponse.ok) {

        window.location.href = "/login";
        return;

      }

      const userData = await userResponse.json();

      const loggedUser = userData?.user?.name;

      if (!loggedUser) {

        window.location.href = "/login";
        return;

      }

      setUsername(loggedUser);



      // STEP 2: Fetch Orders
      const ordersResponse = await fetch(
        `http://localhost:9093/api/orders?username=${loggedUser}`,
        {
          credentials: "include"
        }
      );

      if (!ordersResponse.ok) {

        throw new Error("Failed to fetch orders");

      }

      const ordersData = await ordersResponse.json();

      console.log("Orders API response:", ordersData);


      // ✅ FIX: use products array
      setOrders(ordersData.products || []);



      // STEP 3: Fetch cart count
      const cartResponse = await fetch(
        `http://localhost:9093/api/cart/items?username=${loggedUser}`,
        {
          credentials: "include"
        }
      );

      if (cartResponse.ok) {

        const cartData = await cartResponse.json();

        const count =
          cartData?.cart?.products?.reduce(
            (sum, item) => sum + item.quantity,
            0
          ) || 0;

        setCartCount(count);

      }

    }
    catch (error) {

      console.error(error);

      setError("Failed to load orders");

    }
    finally {

      setLoading(false);

    }

  };



  // ===============================
  // UI
  // ===============================
  return (

    <div className="customer-homepage">

      <Header
        username={username}
        cartCount={cartCount}
      />


      <main className="main-content">

        <h1 className="form-title">
          Your Orders 📦
        </h1>



        {loading && (

          <p className="loading-message">
            Loading orders...
          </p>

        )}



        {error && (

          <p className="error-message">
            {error}
          </p>

        )}



        {!loading && !error && orders.length === 0 && (

          <p className="no-orders">
            No orders found.
          </p>

        )}



        {!loading && !error && Array.isArray(orders) && orders.length > 0 && (

          <div className="orders-list">

            {orders.map((order, index) => (

              <div
                key={index}
                className="order-card"
              >

                <div className="order-card-header">

                  <h3>
                    Order ID: {order.order_id}
                  </h3>

                </div>


                <div className="order-card-body">

                  <img
                    src={order.image_url}
                    alt={order.name}
                    className="order-product-image"
                  />


                  <div className="order-details">

                    <h3>
                      {order.name}
                    </h3>

                    <p>
                      Quantity: {order.quantity}
                    </p>

                    <p>
                      Price: ₹{order.price_per_unit}
                    </p>

                    <p>
                      Total: ₹{order.total_price}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>


      <Footer />

    </div>

  );

}