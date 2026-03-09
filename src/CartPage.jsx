import React, { useEffect, useState } from "react";
import "./styles/CartPage.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

  const [cartItems,setCartItems] = useState([]);
  const [subtotal,setSubtotal] = useState(0);
  const [username,setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    fetchCartItems();
    fetchUser();
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

  const fetchCartItems = async()=>{

    try{

      const res = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/cart/items",
        {credentials:"include"}
      );

      if(!res.ok) throw new Error("Cart fetch failed");

      const data = await res.json();

      setCartItems(data?.cart?.products || []);

      const total = data?.cart?.products?.reduce(
        (sum,item)=> sum + item.total_price ,0
      ) || 0;

      setSubtotal(total);

    }catch(err){
      console.error("Cart error:",err);
    }

  };

  const handleRemoveItem = async(productId)=>{

    try{

      const res = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/cart/delete",
        {
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({productId})
        }
      );

      if(res.ok){
        fetchCartItems();
      }

    }catch(err){
      console.log("Remove error",err);
    }

  };

  const handleQuantityChange = async(productId,quantity)=>{

    if(quantity <= 0){
      handleRemoveItem(productId);
      return;
    }

    try{

      const res = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/cart/update",
        {
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({
            productId,
            quantity
          })
        }
      );

      if(res.ok){
        fetchCartItems();
      }

    }catch(err){
      console.log("Update error",err);
    }

  };

  if(cartItems.length === 0){
    return (
      <div className="cart-page empty">
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  return(

    <div>

      <Header username={username} cartCount={cartItems.length}/>

      <div className="cart-container">

        {cartItems.map(item=>(
          <div key={item.product_id} className="cart-item">

            <h3>{item.name}</h3>

            <button onClick={()=>handleQuantityChange(item.product_id,item.quantity-1)}>-</button>

            {item.quantity}

            <button onClick={()=>handleQuantityChange(item.product_id,item.quantity+1)}>+</button>

            ₹{item.total_price}

            <button onClick={()=>handleRemoveItem(item.product_id)}>Delete</button>

          </div>
        ))}

        <h2>Total: ₹{subtotal}</h2>

      </div>

      <Footer/>

    </div>

  );

};

export default CartPage;