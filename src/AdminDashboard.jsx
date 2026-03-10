import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import Logo from "./Logo";
import "./styles/AdminDashboard.css";
import CustomModal from "./CustomModal";

const API_BASE = "https://globalmart-backend-rktj.onrender.com";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);
  const [response, setResponse] = useState(null);

  const cardData = [
    { title:"Add Product", description:"Create new product", modalType:"addProduct"},
    { title:"Delete Product", description:"Remove product", modalType:"deleteProduct"},
    { title:"Modify User", description:"Update user", modalType:"modifyUser"},
    { title:"View User Details", description:"Fetch user", modalType:"viewUser"},
    { title:"Monthly Business", description:"Monthly revenue", modalType:"monthlyBusiness"},
    { title:"Day Business", description:"Daily revenue", modalType:"dailyBusiness"},
    { title:"Yearly Business", description:"Yearly revenue", modalType:"yearlyBusiness"},
    { title:"Overall Business", description:"Total revenue", modalType:"overallBusiness"},
  ];

  const openModal = (type) => {
    setResponse(null);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setResponse(null);
  };

  // SAFE RESPONSE PARSER
  const parseResponse = async (res) => {

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }

  };

  // LOGOUT
  const handleLogout = async () => {

    try {

      await fetch(`${API_BASE}/api/auth/logout`,{
        method:"POST",
        credentials:"include"
      });

    } catch(err){
      console.error(err);
    }

    navigate("/admin");
  };

  // ADD PRODUCT
  const handleAddProductSubmit = async (data) => {

    try{

      const res = await fetch(`${API_BASE}/admin/products/add`,{

        method:"POST",
        credentials:"include",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

      });

      const result = await parseResponse(res);

      setResponse({product:result});

    }catch(err){
      console.error(err);
    }

  };

  // DELETE PRODUCT
  const handleDeleteProductSubmit = async ({productId}) => {

    try{

      const res = await fetch(`${API_BASE}/admin/products/delete`,{

        method:"DELETE",
        credentials:"include",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({productId})

      });

      const result = await parseResponse(res);

      setResponse(result);

    }catch(err){
      console.error(err);
    }

  };

  // VIEW USER
  const handleViewUserSubmit = async ({userId}) => {

    try{

      const res = await fetch(`${API_BASE}/admin/user/getbyid?id=${userId}`,{

        method:"GET",
        credentials:"include"

      });

      const data = await parseResponse(res);

      setResponse({user:data});

    }catch(err){
      console.error(err);
    }

  };

  // MODIFY USER
  const handleModifyUserSubmit = async (data) => {

    try{

      const res = await fetch(`${API_BASE}/admin/user/update`,{

        method:"PUT",
        credentials:"include",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

      });

      const result = await parseResponse(res);

      setResponse({user:result});

    }catch(err){
      console.error(err);
    }

  };

  // MONTHLY BUSINESS
  const handleMonthlyBusiness = async (data) => {

    try{

      const res = await fetch(
        `${API_BASE}/admin/business/monthly?month=${data.month}&year=${data.year}`,{
        method:"GET",
        credentials:"include"
      });

      const result = await parseResponse(res);

      setResponse({monthlyBusiness:result});

    }catch(err){
      console.error(err);
    }

  };

  // DAILY BUSINESS
  const handleDailyBusiness = async (data) => {

    try{

      const res = await fetch(
        `${API_BASE}/admin/business/daily?date=${data.date}`,{
        method:"GET",
        credentials:"include"
      });

      const result = await parseResponse(res);

      setResponse({dailyBusiness:result});

    }catch(err){
      console.error(err);
    }

  };

  // YEARLY BUSINESS
  const handleYearlyBusiness = async (data) => {

    try{

      const res = await fetch(
        `${API_BASE}/admin/business/yearly?year=${data.year}`,{
        method:"GET",
        credentials:"include"
      });

      const result = await parseResponse(res);

      setResponse({yearlyBusiness:result});

    }catch(err){
      console.error(err);
    }

  };

  // OVERALL BUSINESS
  const handleOverallBusiness = async () => {

    try{

      const res = await fetch(`${API_BASE}/admin/business/overall`,{

        method:"GET",
        credentials:"include"

      });

      const result = await parseResponse(res);

      setResponse({overallBusiness:result});

    }catch(err){
      console.error(err);
    }

  };

  return (

    <div className="admin-dashboard">

      <header className="dashboard-header">
        <Logo/>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-content">

        <div className="cards-grid">

          {cardData.map((card,index)=>(
            <div
              key={index}
              className="card"
              onClick={()=>openModal(card.modalType)}
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}

        </div>

      </main>

      <Footer/>

      {modalType && (

        <CustomModal

          modalType={modalType}
          response={response}

          onClose={closeModal}

          onSubmit={(data)=>{

            switch(modalType){

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

          }}

        />

      )}

    </div>

  );

};

export default AdminDashboard;