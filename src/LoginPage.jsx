import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";

export default function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");

    try {

      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(data.error || "Invalid username or password");
        return;
      }

      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      if (data.role === "ADMIN") {
  navigate("/adminhome", { replace: true });
} else if (data.role === "CUSTOMER") {
  navigate("/customerhome", { replace: true });
}

    } catch (error) {
      console.error(error);
      setError("Server error");
    }
  };

  return (

    <div className="page-container">

      <div className="form-container">

        <h1 className="form-title">Login</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="form-content">

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button type="submit" className="form-button">
            Login
          </button>

        </form>

        <p className="form-footer">
          New user? <a href="/register">Register here</a>
        </p>

      </div>

    </div>
  );
}