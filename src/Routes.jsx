import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import CustomerHomePage from "./CustomerHomePage";
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {

  return (

    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<LoginPage />} />

      {/* REGISTER */}
      <Route path="/register" element={<RegistrationPage />} />

      {/* CUSTOMER HOME */}
      <Route
        path="/customerhome"
        element={
          <ProtectedRoute>
            <CustomerHomePage />
          </ProtectedRoute>
        }
      />

      {/* CART */}
      <Route
        path="/usercartpage"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      {/* ORDERS */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        }
      />

      {/* ADMIN LOGIN */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/adminhome"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}