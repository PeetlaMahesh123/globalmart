import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";

export default function LoginPage() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async(e)=>{
    e.preventDefault();

    try{

      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/auth/login",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error || "Login failed");
      }

      if(data.role === "ADMIN"){
        navigate("/adminhome");
      }else{
        navigate("/customerhome");
      }

    }catch(err){
      setError(err.message);
    }
  }

  return (
    <div className="page-layout">
      <div className="page-container">
        <div className="form-container">

          <h1>Login</h1>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSignIn}>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <button type="submit">Sign In</button>

          </form>

        </div>
      </div>
    </div>
  );
}