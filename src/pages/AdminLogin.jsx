import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/LoginPage.css";

export default function AdminLoginPage() {

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

      const response = await fetch(
        "http://localhost:9096/api/auth/login",
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Only allow ADMIN
      if (data.role !== "ADMIN") {

        throw new Error("Access denied. Admin only.");

      }

      // ✅ Store admin info
      localStorage.setItem("username", username);
      localStorage.setItem("role", data.role);

      // ✅ Redirect to admin dashboard
      navigate("/adminhome");


    }
    catch (err) {

      setError(err.message);

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="page-container">

      <div className="form-container">

        <h1 className="form-title">
          Admin Login
        </h1>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSignIn}
          className="form-content"
        >

          <div className="form-group">

            <input
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
              className="form-input"
            />

          </div>


          <div className="form-group">

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="form-input"
            />

          </div>


          <button
            type="submit"
            className="form-button"
          >

            {loading
              ? "Signing In..."
              : "Login as Admin"}

          </button>

        </form>


        <div className="form-footer">

          <Link to="/">
            Login as Customer
          </Link>

        </div>

      </div>

    </div>

  );

}