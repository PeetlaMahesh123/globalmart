import React, { useState } from "react";
import "./styles/CustomModal.css";

const CustomModal = ({ modalType, onClose, onSubmit, response }) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
    month: "",
    year: "",
    date: "",
    userId: "",
    username: "",
    email: "",
    password: ""
  });

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (modalType) {

      case "addProduct":
        onSubmit({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          categoryId: parseInt(formData.categoryId)
        });
        break;

      case "deleteProduct":
        onSubmit({ productId: parseInt(inputValue) });
        break;

      case "viewUser":
        onSubmit({ userId: parseInt(inputValue) });
        break;

      case "modifyUser":
        onSubmit({
          userId: parseInt(formData.userId),
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        break;

      case "monthlyBusiness":
        onSubmit({
          month: formData.month,
          year: formData.year
        });
        break;

      case "dailyBusiness":
        onSubmit({ date: formData.date });
        break;

      case "yearlyBusiness":
        onSubmit({ year: formData.year });
        break;

      case "overallBusiness":
        onSubmit();
        break;

      default:
        break;
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-content">

{/* ================= ADD PRODUCT ================= */}

{modalType === "addProduct" && !response && (
<>
<h2>Add Product</h2>

<form onSubmit={handleSubmit} className="modal-form">

<div className="modal-form-item">
<label>Product Name</label>
<input name="name" placeholder="Enter product name"
value={formData.name} onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Price</label>
<input name="price" type="number"
placeholder="Enter price"
value={formData.price} onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Stock</label>
<input name="stock" type="number"
placeholder="Enter stock"
value={formData.stock} onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Category ID</label>
<input name="categoryId" type="number"
placeholder="Enter category ID"
value={formData.categoryId}
onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Image URL</label>
<input name="imageUrl"
placeholder="Enter image URL"
value={formData.imageUrl}
onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Description</label>
<textarea name="description"
placeholder="Enter product description"
value={formData.description}
onChange={handleInputChange}/>
</div>

<button type="submit">Add Product</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{modalType === "addProduct" && response?.product && (
<>
<h2>Product Added</h2>
<p>Name: {response.product.product?.name}</p>
<p>Price: ₹{response.product.product?.price}</p>
<p>Stock: {response.product.product?.stock}</p>
<button onClick={onClose}>Close</button>
</>
)}

{/* ================= DELETE PRODUCT ================= */}

{modalType === "deleteProduct" && !response && (
<>
<h2>Delete Product</h2>

<form onSubmit={handleSubmit} className="modal-form">

<div className="modal-form-item">
<label>Product ID</label>
<input type="number"
placeholder="Enter product ID"
value={inputValue}
onChange={(e)=>setInputValue(e.target.value)}/>
</div>

<button type="submit">Delete</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{modalType === "deleteProduct" && response && (
<>
<h2>{response.message}</h2>
<button onClick={onClose}>Close</button>
</>
)}

{/* ================= VIEW USER ================= */}

{modalType === "viewUser" && !response && (
<>
<h2>View User</h2>

<form onSubmit={handleSubmit} className="modal-form">

<div className="modal-form-item">
<label>User ID</label>
<input type="number"
placeholder="Enter user ID"
value={inputValue}
onChange={(e)=>setInputValue(e.target.value)}/>
</div>

<button type="submit">Fetch User</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{response?.user && modalType==="viewUser" && (
<>
<h2>User Details</h2>
<p>ID: {response.user.userId}</p>
<p>Name: {response.user.username}</p>
<p>Email: {response.user.email}</p>
<p>Role: {response.user.role}</p>
<button onClick={onClose}>Close</button>
</>
)}

{/* ================= MODIFY USER ================= */}

{modalType === "modifyUser" && !response && (
<>
<h2>Modify User</h2>

<form onSubmit={handleSubmit} className="modal-form">

<div className="modal-form-item">
<label>User ID</label>
<input name="userId" type="number"
value={formData.userId}
onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Username</label>
<input name="username"
value={formData.username}
onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Email</label>
<input name="email"
value={formData.email}
onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Password</label>
<input name="password" type="password"
value={formData.password}
onChange={handleInputChange}/>
</div>

<button type="submit">Update User</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{modalType==="modifyUser" && response?.user &&(
<>
<h2>User Updated</h2>
<p>ID: {response.user.userId}</p>
<p>Name: {response.user.username}</p>
<p>Email: {response.user.email}</p>
<button onClick={onClose}>Close</button>
</>
)}

{/* ================= MONTHLY BUSINESS ================= */}

{modalType==="monthlyBusiness" && !response &&(
<>
<h2>Monthly Business</h2>

<form onSubmit={handleSubmit} className="modal-form">

<div className="modal-form-item">
<label>Month</label>
<input name="month" type="number"
value={formData.month}
onChange={handleInputChange}/>
</div>

<div className="modal-form-item">
<label>Year</label>
<input name="year" type="number"
value={formData.year}
onChange={handleInputChange}/>
</div>

<button type="submit">Get Report</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{response?.monthlyBusiness &&(
<>
<h2>Monthly Business</h2>
<p>₹ {response.monthlyBusiness.totalBusiness}</p>
<button onClick={onClose}>Close</button>
</>
)}

{/* ================= DAILY BUSINESS ================= */}

{modalType==="dailyBusiness" && !response &&(
<>
<h2>Daily Business</h2>

<form onSubmit={handleSubmit} className="modal-form">

<div className="modal-form-item">
<label>Date</label>
<input name="date" type="date"
value={formData.date}
onChange={handleInputChange}/>
</div>

<button type="submit">Get Report</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{response?.dailyBusiness &&(
<>
<h2>Daily Business</h2>
<p>₹ {response.dailyBusiness.totalBusiness}</p>
<button onClick={onClose}>Close</button>
</>
)}

{/* ================= YEARLY BUSINESS ================= */}

{modalType==="yearlyBusiness" && !response &&(
<>
<h2>Yearly Business</h2>

<form onSubmit={handleSubmit} className="modal-form">

<div className="modal-form-item">
<label>Year</label>
<input name="year" type="number"
value={formData.year}
onChange={handleInputChange}/>
</div>

<button type="submit">Get Report</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{response?.yearlyBusiness &&(
<>
<h2>Yearly Business</h2>
<p>₹ {response.yearlyBusiness.totalBusiness}</p>
<button onClick={onClose}>Close</button>
</>
)}

{/* ================= OVERALL BUSINESS ================= */}

{modalType==="overallBusiness" && !response &&(
<>
<h2>Overall Business</h2>

<form onSubmit={handleSubmit} className="modal-form">

<button type="submit">Get Overall Business</button>
<button type="button" onClick={onClose}>Cancel</button>

</form>
</>
)}

{response?.overallBusiness &&(
<>
<h2>Total Business</h2>
<p>₹ {response.overallBusiness.totalBusiness}</p>
<button onClick={onClose}>Close</button>
</>
)}

      </div>
    </div>
  );
};

export default CustomModal;