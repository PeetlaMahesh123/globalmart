import React, { useEffect, useState } from "react";
import "./styles/CartPage.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  const navigate = useNavigate();

  /* ================= FETCH CART ================= */

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const response = await fetch(
          "https://globalmart-backend-rktj.onrender.com/api/cart/items",
          { credentials: "include" }
        );

        const data = await response.json();

        const products =
          data?.cart?.products?.map((item) => ({
            ...item,
            total_price: parseFloat(item.total_price),
            price_per_unit: parseFloat(item.price_per_unit),
          })) || [];

        setCartItems(products);
        setUsername(data?.username || "");

      } catch (error) {

        console.error("Cart fetch error:", error);

      }

    };

    fetchCart();

  }, []);

  /* ================= CALCULATE SUBTOTAL ================= */

  useEffect(() => {

    const total = cartItems.reduce(
      (sum, item) => sum + item.total_price,
      0
    );

    setSubtotal(total);

  }, [cartItems]);

  /* ================= REMOVE ITEM ================= */

  const handleRemoveItem = async (productId) => {

    await fetch(
      "https://globalmart-backend-rktj.onrender.com/api/cart/delete",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId }),
      }
    );

    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );

  };

  /* ================= UPDATE QUANTITY ================= */

  const handleQuantityChange = async (productId, quantity) => {

    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    await fetch(
      "https://globalmart-backend-rktj.onrender.com/api/cart/update",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId, quantity }),
      }
    );

    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              quantity,
              total_price: item.price_per_unit * quantity,
            }
          : item
      )
    );

  };

  /* ================= CHECKOUT ================= */

  const handleCheckout = async () => {

    try {

      const requestBody = {
        totalAmount: subtotal,
        cartItems: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price_per_unit
        }))
      };

      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const razorpayOrderId = await response.text();

      const options = {

        key: "rzp_test_LqWBBDbgwot5lh",

        amount: subtotal * 100,

        currency: "INR",

        name: "GlobalMart",

        description: "Order Payment",

        order_id: razorpayOrderId,

        handler: async function (response) {

          try {

            const verifyResponse = await fetch(
              "https://globalmart-backend-rktj.onrender.com/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature
                })
              }
            );

            if (verifyResponse.ok) {

              alert("Payment Successful!");

              navigate("/orders");

            } else {

              alert("Payment verification failed");

            }

          } catch (error) {

            console.error("Verification error:", error);

          }

        },

        prefill: {
          name: username,
          email: "test@example.com",
          contact: "9999999999"
        },

        theme: {
          color: "#3399cc"
        }

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.error("Checkout error:", error);
      alert("Oops! Something went wrong. Payment Failed");

    }

  };

  const totalProducts = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const shipping = (5 * 74).toFixed(2);

  /* ================= EMPTY CART ================= */

  if (cartItems.length === 0) {

    return (

      <>
        <Header cartCount={0} username={username} />

        <div className="empty-cart-container">

          <div className="empty-cart-card">

            <div className="empty-cart-icon">🛒</div>

            <h2>Your Cart is Empty</h2>

            <p>Start shopping to add products to your cart.</p>

            <button
              className="empty-cart-button"
              onClick={() => navigate("/customerhome")}
            >
              Continue Shopping
            </button>

          </div>

        </div>

        <Footer />

      </>

    );

  }

  /* ================= CART PAGE ================= */

  return (

    <div className="cart-page-wrapper">

      <Header cartCount={totalProducts()} username={username} />

      <div className="cart-container">

        <div className="cart-page">

          <button
            className="back-button"
            onClick={() => navigate("/customerhome")}
          >
            ← Continue Shopping
          </button>

          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <p>You have {cartItems.length} items in your cart</p>
          </div>

          <div className="cart-items">

            {cartItems.map((item) => (

              <div key={item.product_id} className="cart-item">

                <img src={item.image_url} alt={item.name} />

                <div className="item-details">

                  <div className="item-info">

                    <h3>{item.name}</h3>
                    <p>{item.description}</p>

                  </div>

                  <div className="item-actions">

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <span className="price">
                      ₹{item.total_price.toFixed(2)}
                    </span>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemoveItem(item.product_id)
                      }
                    >
                      🗑
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="checkout-section">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>
              ₹{(subtotal + parseFloat(shipping)).toFixed(2)}
            </span>
          </div>

          <button
            className="checkout-button"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

      <Footer />

    </div>

  );

};

export default CartPage;