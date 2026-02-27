import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/CartPage.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function CartPage() {

  const navigate = useNavigate();

  // ===============================
  // STATE
  // ===============================
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");

  const [subtotal, setSubtotal] = useState(0);
  const [overallPrice, setOverallPrice] = useState(0);

  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const SHIPPING_COST = 0;


  // ===============================
  // CART COUNT
  // ===============================
  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );


  // ===============================
  // LOAD CART
  // ===============================
  useEffect(() => {
    fetchCartItems();
  }, []);


  // ===============================
  // FETCH CART ITEMS
  // ===============================
  const fetchCartItems = async () => {

    try {

      const userResponse = await fetch(
        "http://localhost:9093/api/products?category=Shirts",
        { credentials: "include" }
      );

      const userData = await userResponse.json();

      const loggedUser = userData?.user?.name;

      if (!loggedUser) {
        navigate("/login");
        return;
      }

      setUsername(loggedUser);

      const cartResponse = await fetch(
        `http://localhost:9093/api/cart/items?username=${loggedUser}`,
        { credentials: "include" }
      );

      const cartData = await cartResponse.json();

      const items =
        cartData?.cart?.products?.map(item => ({
          ...item,
          price_per_unit: Number(item.price_per_unit),
          quantity: Number(item.quantity),
          total_price: Number(item.total_price)
        })) || [];

      setCartItems(items);

    }
    catch (error) {
      console.error(error);
    }

  };


  // ===============================
  // CALCULATE TOTALS (FIXED FLOATING)
  // ===============================
  useEffect(() => {

    const sub = cartItems.reduce(
      (sum, item) =>
        sum + (item.price_per_unit * item.quantity),
      0
    );

    const fixedSubtotal = Number(sub.toFixed(2));

    setSubtotal(fixedSubtotal);

    setOverallPrice(
      Number((fixedSubtotal + SHIPPING_COST).toFixed(2))
    );

  }, [cartItems]);


  // ===============================
  // REMOVE ITEM (OPTIMISTIC)
  // ===============================
  const handleRemoveItem = async (productId) => {

    if (removingId === productId) return;

    setRemovingId(productId);

    const previousItems = cartItems;

    // instant UI update
    setCartItems(prev =>
      prev.filter(item =>
        item.product_id !== productId
      )
    );

    try {

      const response = await fetch(
        "http://localhost:9093/api/cart/delete",
        {
          method: "DELETE",
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

      if (!response.ok) {
        setCartItems(previousItems);
      }

    }
    catch {
      setCartItems(previousItems);
    }
    finally {
      setRemovingId(null);
    }

  };


  // ===============================
  // UPDATE QUANTITY (FIXED FLOATING)
  // ===============================
  const handleQuantityChange = async (productId, newQuantity) => {

    if (updatingId === productId) return;

    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setUpdatingId(productId);

    const previousItems = cartItems;

    // instant UI update
    setCartItems(prev =>
      prev.map(item =>
        item.product_id === productId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: Number(
                (item.price_per_unit * newQuantity).toFixed(2)
              )
            }
          : item
      )
    );

    try {

      const response = await fetch(
        "http://localhost:9093/api/cart/update",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            productId,
            quantity: newQuantity
          })
        }
      );

      if (!response.ok) {
        setCartItems(previousItems);
      }

    }
    catch {
      setCartItems(previousItems);
    }
    finally {
      setUpdatingId(null);
    }

  };


  // ===============================
  // CHECKOUT
  // ===============================
  const handleCheckout = async () => {

    if (checkoutLoading) return;

    setCheckoutLoading(true);

    try {

      const response = await fetch(
        "http://localhost:9093/api/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            totalAmount: overallPrice,
            cartItems: cartItems.map(item => ({
              productId: item.product_id,
              quantity: item.quantity,
              price: item.price_per_unit
            }))
          })
        }
      );

      const orderId = await response.text();

      const options = {

        key: "rzp_test_LqWBBDbgwot5lh",

        amount: overallPrice * 100,

        currency: "INR",

        name: "GlobalMart",

        order_id: orderId,

        handler: () => {

          alert("Payment Successful ✅");

          navigate("/home");

        }

      };

      new window.Razorpay(options).open();

    }
    catch {
      alert("Payment failed");
    }
    finally {
      setCheckoutLoading(false);
    }

  };


  // ===============================
  // UI
  // ===============================
  return (

    <>

      <Header
        username={username}
        cartCount={totalCartCount}
      />

      <div className="cart-container">

        <h2>Your Cart 🛒</h2>

        {cartItems.length === 0 ? (

          <div className="empty-cart">
            <h3>Cart is empty</h3>
          </div>

        ) : (

          <div className="cart-content">

            <div className="cart-items">

              {cartItems.map(item => (

                <div key={item.product_id} className="cart-item">

                  <img
                    src={item.image_url}
                    alt=""
                    className="cart-image"
                  />

                  <div className="item-details">

                    <h4>{item.name}</h4>

                    <p>
                      ₹{item.price_per_unit.toFixed(2)}
                    </p>

                    <div className="quantity-controls">

                      <button
                        disabled={updatingId === item.product_id}
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        disabled={updatingId === item.product_id}
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

                    <button
                      className="remove-btn"
                      disabled={removingId === item.product_id}
                      onClick={() =>
                        handleRemoveItem(item.product_id)
                      }
                    >
                      {removingId === item.product_id
                        ? "Removing..."
                        : "Remove"}
                    </button>

                  </div>

                  <div className="item-total">
                    ₹{item.total_price.toFixed(2)}
                  </div>

                </div>

              ))}

            </div>


            <div className="cart-summary">

              <h3>Order Summary</h3>

              <p>
                Subtotal
                <span> ₹{subtotal.toFixed(2)}</span>
              </p>

              <p>
                Shipping
                <span> ₹0.00</span>
              </p>

              <hr />

              <h3>
                Total
                <span> ₹{overallPrice.toFixed(2)}</span>
              </h3>

              <button
                className="checkout-btn"
                disabled={checkoutLoading}
                onClick={handleCheckout}
              >
                {checkoutLoading
                  ? "Processing..."
                  : "Checkout 🚀"}
              </button>

            </div>

          </div>

        )}

      </div>

      <Footer />

    </>

  );

}