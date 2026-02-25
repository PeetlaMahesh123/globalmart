import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegistrationPage.css";

const RegistrationPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let newErrors = {};

    if (formData.username.length < 5 || formData.username.length > 50) {
      newErrors.username = "Username must be between 5 and 50 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ characters with uppercase, lowercase, number & special character.";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- HANDLE INPUT CHANGE ----------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:9092/api/users/register",   // ✅ Correct Backend URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");   // Redirect to login page
      } else {
        alert(data.error || "Registration Failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`register-container ${
        formData.role === "ADMIN"
          ? "admin-bg"
          : formData.role === "CUSTOMER"
          ? "customer-bg"
          : ""
      }`}
    >
      <div
        className={`register-card ${
          formData.role === "ADMIN"
            ? "admin-theme"
            : formData.role === "CUSTOMER"
            ? "customer-theme"
            : ""
        }`}
      >
        <h2 className="form-title">GlobalMart Register</h2>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <small className="error">{errors.username}</small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="error">{errors.email}</small>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          {/* Role */}
          <div className="form-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="CUSTOMER">Customer</option>
            </select>
            {errors.role && (
              <small className="error">{errors.role}</small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`submit-btn ${
              formData.role === "CUSTOMER" ? "customer-btn" : ""
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

        </form>

        <p className="login-link">
          Already a user? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;