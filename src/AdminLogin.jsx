import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/AdminLogin.css";

export default function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://globalmart-backend-rktj.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          setError("You are not an admin");
        }
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-layout">
      <div className="page-container1">
        <div className="form-container">

          <h1 className="form-title">Admin Login</h1>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSignIn} className="form-content">

            <div className="form-group">
              <label className="form-label">Admin Username</label>
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="form-button">
              Enter As Admin
            </button>

          </form>

          <div className="form-footer">
            <Link to="/" className="form-link">
              Not Admin? Login as User
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}