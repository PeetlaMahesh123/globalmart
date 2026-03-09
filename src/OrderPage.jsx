import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./styles/OrderPage.css";

export default function OrdersPage(){

  const [orders,setOrders] = useState([]);
  const [username,setUsername] = useState("Guest");

  useEffect(()=>{
    fetchUser();
    fetchOrders();
  },[]);

  const fetchUser = async()=>{

    try{

      const res = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/auth/me",
        {credentials:"include"}
      );

      const data = await res.json();

      setUsername(data.username || "Guest");

    }catch(err){
      setUsername("Guest");
    }

  }

  const fetchOrders = async()=>{

    try{

      const res = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/orders",
        {credentials:"include"}
      );

      if(!res.ok) throw new Error("Failed");

      const data = await res.json();

      setOrders(data || []);

    }catch(err){
      console.log("Order error",err);
    }

  }

  return(

    <div>

      <Header username={username} cartCount={0}/>

      <h1>Your Orders</h1>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order=>(
        <div key={order.order_id} className="order-card">

          <h3>Order Id: {order.order_id}</h3>
          <p>Product: {order.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Total: ₹{order.total_price}</p>

        </div>
      ))}

      <Footer/>

    </div>

  );

}