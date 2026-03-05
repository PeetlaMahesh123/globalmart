import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent double submission

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:9096/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // IMPORTANT for cookies
          body: JSON.stringify({
            username: username.trim(),
            password: password.trim(),
          }),
        }
      );

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        setError(data.error || "Invalid username or password");
        return;
      }

      // Save user info locally (optional)
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      const role = data.role?.toUpperCase();

      if (role === "CUSTOMER") {
        console.log("Navigating to /customerhome");
        navigate("/customerhome", { replace: true });
      } else if (role === "ADMIN") {
        console.log("Navigating to /adminhome");
        navigate("/adminhome", { replace: true });
      } else {
        setError("Invalid role received from server");
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <div className="page-container">
        <div className="form-container">

          <h1 className="form-title">Login</h1>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSignIn} className="form-content">

            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="form-button"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <div className="form-footer">
            <Link to="/register">New User? Sign up here</Link>
          </div>

        </div>
      </div>
    </div>
  );
}