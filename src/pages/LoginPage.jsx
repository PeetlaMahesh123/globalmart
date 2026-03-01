import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/LoginPage.css";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9096/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Important for JWT Cookie
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {

        // ✅ Store user info
        localStorage.setItem("username", username);
        localStorage.setItem("role", data.role);

        // ✅ Redirect based on role
        if (data.role === "CUSTOMER") {
          navigate("/home");
        } 
        else if (data.role === "ADMIN") {
          navigate("/adminhome");
        } 
        else {
          throw new Error("Invalid user role");
        }

      } else {
        throw new Error(data.message || "Invalid username or password");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">

        <h1 className="form-title">GlobalMart Login</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignIn} className="form-content">

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="form-button">
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="form-footer">
          New user? <Link to="/register">Register here</Link>
        </div>

      </div>
    </div>
  );
}