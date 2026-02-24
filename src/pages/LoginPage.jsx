import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === 'CUSTOMER') {
          navigate('/customerhome');
        } else if (data.role === 'ADMIN') {
          navigate('/adminhome');
        } else {
          throw new Error('Invalid user role');
        }
      } else {
        throw new Error(data.error || 'Login failed');
      }

    } catch (err) {
      setError(err.message);
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
              className="form-input"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="form-button">
            Sign In
          </button>
        </form>

        <div className="form-footer">
          Already a user?{" "}
          <Link to="/register">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}