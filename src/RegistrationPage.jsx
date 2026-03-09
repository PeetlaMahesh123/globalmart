import React, { useState } from "react";
import "./styles/RegistrationPage.css";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {

      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password,
            role: "CUSTOMER"
          })
        }
      );

      let data = {};
try {
  data = await response.json();
} catch {}

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/");

    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">

        <h1 className="form-title">Register</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignUp} className="form-content">

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="form-button">
            Sign Up
          </button>

        </form>

        <p className="form-footer">
          Already a user?{" "}
          <a href="/" className="form-link">
            Log in here
          </a>
        </p>

      </div>
    </div>
  );
}