import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CustomerHome from "./pages/CustomerHomePage";
import { CartPage } from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

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
    </Routes>
  );
};

export default AppRoutes;