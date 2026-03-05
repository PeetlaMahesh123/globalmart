import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./styles/OrderPage.css";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const response = await fetch(
        "http://localhost:9096/api/orders",
        { credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();

      setOrders(data.products || []);
      setUsername(data.username || "Guest");

    } catch (error) {

      console.error("Error fetching orders:", error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="orders-page-wrapper">

      {/* HEADER */}

      <Header
        cartCount={cartCount}
        username={username}
      />



      {/* MAIN CONTENT */}

      <main className="orders-main-container">

        <h1 className="orders-title">
          Your Orders
        </h1>



        {/* LOADING */}

        {loading && (
          <p className="orders-loading">
            Loading orders...
          </p>
        )}



        {/* NO ORDERS */}

        {!loading && orders.length === 0 && (
          <p className="orders-empty">
            No orders found
          </p>
        )}



        {/* ORDERS GRID */}

        {!loading && orders.length > 0 && (

          <div className="orders-grid">

            {orders.map((order, index) => (

              <div key={index} className="orders-card">


                {/* ORDER HEADER */}

                <div className="orders-card-header">
                  Order ID : {order.order_id}
                </div>



                {/* ORDER BODY */}

                <div className="orders-card-body">

                  {/* PRODUCT IMAGE */}

                  <img
                    src={
                      order.image_url ||
                      "https://via.placeholder.com/100"
                    }
                    alt={order.name}
                    className="orders-product-image"
                  />



                  {/* PRODUCT DETAILS */}

                  <div className="orders-product-details">

                    <p className="orders-product-name">
                      {order.name}
                    </p>

                    <p className="orders-product-info">
                      Quantity : {order.quantity}
                    </p>

                    <p className="orders-product-info">
                      Price : ₹{order.price_per_unit.toFixed(2)}
                    </p>

                    <p className="orders-total-price">
                      Total : ₹{order.total_price.toFixed(2)}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>



      {/* FOOTER */}

      <Footer />

    </div>

  );
}