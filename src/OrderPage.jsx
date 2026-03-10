import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./styles/OrderPage.css";


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false); // State for cart fetch error
  const [isCartLoading, setIsCartLoading] = useState(true); // State for cart loading

  useEffect(() => {
    fetchOrders();
    if (username) {
      fetchCartCount(); // Fetch cart count only if username is available
    }
  }, [username]); // Re-run cart count fetch if username changes

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://globalmart-backend-rktj.onrender.com/api/orders', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data.products || []);
      setUsername(data.username || 'Guest'); // Extract username
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true); // Set loading state
    try {
      const response = await fetch(`https://globalmart-backend-rktj.onrender.com/api/cart/items/count?username=${username}`, {
        credentials: 'include',
      });
      const count = await response.json();
      setCartCount(count);
      setCartError(false); // Reset error state if successful
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true); // Set error state
    } finally {
      setIsCartLoading(false); // Remove loading state
    }
  };

  return (
    <div className="maindiv">
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />
      <main className="main-content">
        <h1 className="form-title">Your Orders</h1>
        {loading && <p>Loading orders...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p>No orders found. Start shopping now!</p>
        )}
        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-card-header">
                  <h3>Order Id : {order.order_id}</h3>
                </div>
                <div className="order-card-body">
                  <img
                    src={order.image_url}
                    alt={order.name}
                    className="order-product-image"
                  />
                  <div className="order-details">
                    <h3 className="product-name">ProductName : {order.name}</h3>
                    <h3>Description : {order.description}</h3>
                    <h3>Quantity : {order.quantity}</h3>
                    <h3>Price per Unit : ₹{order.price_per_unit.toFixed(2)}</h3>
                    <h3>Total Price : ₹{order.total_price.toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
    </div>
  );
}