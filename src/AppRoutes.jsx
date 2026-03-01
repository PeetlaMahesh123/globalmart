import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CustomerHome from "./pages/CustomerHomePage";
import { CartPage } from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<LoginPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegistrationPage />} />

      <Route path="/home" element={<CustomerHome />} />

      {/* ✅ Cart route */}
      <Route path="/cart" element={<CartPage />} />

      {/* ✅ Orders route */}
      <Route path="/orders" element={<OrdersPage />} />

      {/* ✅ Admin dashboard route */}
      <Route path="/adminhome" element={<AdminDashboard />} />
      
      <Route path="/admin" element={<AdminLogin />} />
    </Routes>
  );
};

export default AppRoutes;