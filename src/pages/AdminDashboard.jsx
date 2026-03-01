// AdminDashboard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import Logo from "../components/Logo";
import "../styles/AdminDashboard.css";
import CustomModal from "./CustomModal";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);
  const [response, setResponse] = useState(null);

  // Card Data
  const cardData = [

    {
      title: "Add Product",
      description: "Create and manage new product listings with validation",
      modalType: "addProduct",
    },

    {
      title: "Delete Product",
      description: "Remove products from inventory system",
      modalType: "deleteProduct",
    },

    {
      title: "Modify User",
      description: "Update user details and manage roles",
      modalType: "modifyUser",
    },

    {
      title: "View User Details",
      description: "Fetch and display details of a specific user",
      modalType: "viewUser",
    },

    {
      title: "Monthly Business",
      description: "View revenue metrics for specific months",
      modalType: "monthlyBusiness",
    },

    {
      title: "Day Business",
      description: "Track daily revenue and transactions",
      modalType: "dailyBusiness",
    },

    {
      title: "Yearly Business",
      description: "Analyze annual revenue performance",
      modalType: "yearlyBusiness",
    },

    {
      title: "Overall Business",
      description: "View total revenue since inception",
      modalType: "overallBusiness",
    },

  ];


  // Logout
  const handleLogout = async () => {

    navigate("/login"); // instant navigation (fast)

    try {

      await fetch("http://localhost:9096/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

    }
    catch (error) {

      console.error(error);

    }

  };


  // Modal Submit Handler
  const handleSubmit = (data) => {

    switch (modalType) {

      case "addProduct":
        handleAddProductSubmit(data);
        break;

      case "deleteProduct":
        handleDeleteProductSubmit(data);
        break;

      case "viewUser":
        handleViewUserSubmit(data);
        break;

      case "modifyUser":
        handleModifyUserSubmit(data);
        break;

      case "monthlyBusiness":
        handleMonthlyBusiness(data);
        break;

      case "dailyBusiness":
        handleDailyBusiness(data);
        break;

      case "yearlyBusiness":
        handleYearlyBusiness(data);
        break;

      case "overallBusiness":
        handleOverallBusiness();
        break;

      default:
        break;

    }

  };


  // ===============================
  // API FUNCTIONS
  // ===============================

  const handleAddProductSubmit = async (productData) => {

    const res = await fetch(
      "http://localhost:9096/admin/products/add",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
      }
    );

    const data = await res.json();

    setResponse({ product: data });

  };


  const handleDeleteProductSubmit = async ({ productId }) => {

    await fetch(
      "http://localhost:9096/admin/products/delete",
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      }
    );

    setResponse({ message: "Deleted Successfully" });

  };


  const handleViewUserSubmit = async ({ userId }) => {

    const res = await fetch(
      `http://localhost:9096/admin/user/getbyid?userId=${userId}`,
      {
        method: "GET",
        credentials: "include"
      }
    );

    const data = await res.json();

    setResponse({ user: data });

  };


  const handleModifyUserSubmit = async (data) => {

    if (!data.username) {

      const res = await fetch(
        `http://localhost:9096/admin/user/getbyid?userId=${data.userId}`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      const user = await res.json();

      setResponse({ user });

      setModalType("modifyUser");

    }

    else {

      const res = await fetch(
        "http://localhost:9096/admin/user/modify",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );

      const updatedUser = await res.json();

      setResponse({ user: updatedUser });

    }

  };


  const handleMonthlyBusiness = async (data) => {

    const res = await fetch(
      `http://localhost:9096/admin/business/monthly?month=${data.month}&year=${data.year}`,
      { credentials: "include" }
    );

    const result = await res.json();

    setResponse({ monthlyBusiness: result });

  };


  const handleDailyBusiness = async (data) => {

    const res = await fetch(
      `http://localhost:9096/admin/business/daily?date=${data.date}`,
      { credentials: "include" }
    );

    const result = await res.json();

    setResponse({ dailyBusiness: result });

  };


  const handleYearlyBusiness = async (data) => {

    const res = await fetch(
      `http://localhost:9096/admin/business/yearly?year=${data.year}`,
      { credentials: "include" }
    );

    const result = await res.json();

    setResponse({ yearlyBusiness: result });

  };


  const handleOverallBusiness = async () => {

    const res = await fetch(
      "http://localhost:9096/admin/business/overall",
      { credentials: "include" }
    );

    const result = await res.json();

    setResponse({ overallBusiness: result });

  };


  // ===============================
  // UI
  // ===============================

  return (

    <div className="admin-dashboard">

      <header className="dashboard-header">

        <Logo />

        <button onClick={handleLogout}>
          Logout
        </button>

      </header>


      <main className="dashboard-content">

        <div className="cards-grid">

          {cardData.map((card, index) => (

            <div key={index} className="card">

              {/* BUTTON HEADING */}
              <button
                className="card-heading-btn"
                onClick={() => setModalType(card.modalType)}
              >
                {card.title}
              </button>

              <p>
                {card.description}
              </p>

            </div>

          ))}

        </div>

      </main>


      <Footer />


      {modalType && (

        <CustomModal
          modalType={modalType}
          onClose={() => setModalType(null)}
          onSubmit={handleSubmit}
          response={response}
        />

      )}

    </div>

  );

};

export default AdminDashboard;