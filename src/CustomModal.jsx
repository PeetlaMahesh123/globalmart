import React, { useEffect, useState } from "react";
import "./styles/CustomModal.css";

const CustomModal = ({ modalType, onClose, onSubmit, response }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const [inputValue, setInputValue] = useState(""); // Generalized input for all cases

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneralInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (modalType) {
      case "addProduct": {
        const processedData = {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock, 10),
          categoryId: parseInt(formData.categoryId, 10),
        };
        onSubmit(processedData);
        break;
      }
      case "deleteProduct": {
        const productId = parseInt(inputValue, 10);
        onSubmit({ productId });
        break;
      }
      case "viewUser": {
        const userId = parseInt(inputValue, 10);
        onSubmit({ userId });
        break;
      }
      case "modifyUser": {
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const role = formData.get("role");
        const userId = parseInt(inputValue, 10);
        const data = {
          username,
        };
        onSubmit(userId);
        break;
      }
      case "monthlyBusiness": {
        const month = formData.month;
        const year = formData.year;
        onSubmit({ month, year });
        break;
      }
      case "dailyBusiness": {
        const date = formData.date;
        onSubmit({ date });
        break;
      }

      case "yearlyBusiness": {
        const year = formData.year;
        onSubmit({ year });
        break;
      }

      case "overallBusiness": {
        onSubmit();
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Add Product Form */}
        {modalType === "addProduct" &&
          (!response ? (
            <>
              <h2>Add Product</h2>
              <form className="modal-form">
                <div className="modal-form-item">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-form-item">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-form-item">
                  <label htmlFor="stock">Stock:</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-form-item">
                  <label htmlFor="categoryId">Category ID:</label>
                  <input
                    type="number"
                    id="categoryId"
                    name="categoryId"
                    placeholder="Category ID"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-form-item">
                  <label htmlFor="imageUrl">Image URL:</label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-form-item">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>

              <button onClick={handleSubmit}>Submit</button>
              <button onClick={onClose}>Cancel</button>
            </>
          ) : (
            <>
              <h2>Product Details</h2>
              <div className="full-products">
                <div className="product-details img">
                  <img src={response.product.imageUrl} />
                </div>
                <div className="product-details-info">
                  <div className="product-details">
                    <div className="">Name :</div>
                    <div className="">{response?.product?.product?.name}</div>
                  </div>
                  <div className="product-details">
                    <div className="">Description :</div>
                    <div className="">
                      {response?.product?.product?.description}
                    </div>
                  </div>
                  <div className="product-details">
                    <div className="">price :</div>
                    <div className="">{response?.product?.product?.price}</div>
                  </div>
                  <div className="product-details">
                    <div className="">Stock :</div>
                    <div className="">{response?.product?.product?.stock}</div>
                  </div>
                  <div className="product-details">
                    <div className="">Category :</div>
                    <div className="">
                      {response?.product?.product?.category.categoryName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-details">
                <button onClick={onClose}>Close</button>
              </div>
            </>
          ))}

        {/* Delete Product Form */}
        {modalType === "deleteProduct" &&
          (!response ? (
            <>
              <h2>Delete Product</h2>
              <form>
                <input
                  type="number"
                  placeholder="Enter Product ID"
                  value={inputValue}
                  onChange={handleGeneralInputChange}
                />
              </form>
              <button onClick={handleSubmit}>Delete</button>
              <button onClick={onClose}>Cancel</button>
            </>
          ) : (
            <div>
              <h2>Product Deleted Successfully</h2>
              <button onClick={onClose}>Close</button>
            </div>
          ))}

        {/* View User Details Form */}
        {modalType === "viewUser" && (
          <>
            <h2>View User Details</h2>
            <form>
              <input
                type="number"
                placeholder="Enter User ID"
                value={inputValue}
                onChange={handleGeneralInputChange}
              />
            </form>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}

        {/* Response Display */}
        {modalType === "response" && response && (
          <>
            {response.user ? (
              <>
                <h2>User Details</h2>
                <div className="user-details">
                  <p>
                    <strong>User ID:</strong> {response.user.userId}
                  </p>
                  <p>
                    <strong>Username:</strong> {response.user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {response.user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {response.user.role}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(response.user.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(response.user.updatedAt).toLocaleString()}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2>Error 1</h2>
                <p>Something went wrong.</p>
              </>
            )}
            <button onClick={onClose}>Back to Dashboard</button>
          </>
        )}
        {modalType === "monthlyBusiness" && (
          <>
            <form className="modal-form">
              {!response && (
                <>
                  <div className="modal-form-item">
                    <label htmlFor="name">Month:</label>
                    <input
                      type="number"
                      id="month"
                      name="month"
                      placeholder="10"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="modal-form-item">
                    <label htmlFor="name">Year:</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      placeholder="2025"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button onClick={handleSubmit}>Sumbit</button>
                </>
              )}
              {response && (
                <div>
                  <div className="business-response-item">
                    <div>Total Business: ₹ </div>
                    <div>
                      {response?.dailyBusiness?.totalBusiness?.toFixed(2)}
                    </div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.monthlyBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.monthlyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose}>Cancel</button>
            </form>
          </>
        )}

        {modalType === "dailyBusiness" && (
          <>
            <form className="modal-form">
              {!response && (
                <>
                  <div className="modal-form-item">
                    <label htmlFor="date">Date:</label>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      placeholder="2025-12-31"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button onClick={handleSubmit}>Sumbit</button>
                </>
              )}
              {response && (
                <div>
                  <div className="business-response-item">
                    <div>Total Business: ₹ </div>
                    <div>
                      {response?.dailyBusiness?.totalBusiness?.toFixed(2)}
                    </div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.dailyBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.dailyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose}>Cancel</button>
            </form>
          </>
        )}

        {modalType === "yearlyBusiness" && (
          <>
            <form className="modal-form">
              {!response && (
                <>
                  <div className="modal-form-item">
                    <label htmlFor="year">Year:</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      placeholder="2025"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button onClick={handleSubmit}>Sumbit</button>
                </>
              )}
              {response && (
                <div>
                  <div className="business-response-item">
                    <div>Total Business: ₹ </div>
                    <div>
                      {response?.yearlyBusiness?.totalBusiness?.toFixed(2)}
                    </div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.yearlyBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.yearlyBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose}>Cancel</button>
            </form>
          </>
        )}

        {modalType === "overallBusiness" && (
          <>
            <form className="modal-form">
              {!response && (
                <>
                  <button onClick={handleSubmit}>Get Overall Business </button>
                </>
              )}
              {response && (
                <div>
                  <div className="business-response-item">
                    <div>Total Business: ₹ </div>
                    <div>
                      {response?.overallBusiness?.totalBusiness?.toFixed(2)}
                    </div>
                  </div>
                  <div className="business-response-item">
                    <h5>Category Sales</h5>
                  </div>
                  {Object.keys(response?.overallBusiness?.categorySales)?.map(
                    (key) => {
                      return (
                        <div key={key} className="business-response-item">
                          <div>{key}</div>
                          <div>
                            {response?.overallBusiness?.categorySales[key]}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              <button onClick={onClose}>Cancel</button>
            </form>
          </>
        )}

        {/* ModifyUser */}
        {modalType === "modifyUser" && (
          <ModifyUserFormComponent onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default CustomModal;

const ModifyUserFormComponent = ({ onClose }) => {
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [updated, setUpdated] = useState(false);

  const handleFetchUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userid = formData.get("user-id");

      if (!userid) return;

      const response = await fetch("https://globalmart-backend-rktj.onrender.com/admin/user/getbyid", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userid }), // Ensure userId is correctly passed
      });

      if (response.ok) {
        const user = await response.json();
        console.log("userDetails2==>", user);

        setUserDetails(user);
        setUserId(userid);
      }
    } catch (error) {
      console.log("Error fetching user details", error);
    }
  };

  useEffect(() => {
    console.log("userDetails==>", userDetails);
  }, [userDetails]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const role = formData.get("role");

    const response = await fetch("https://globalmart-backend-rktj.onrender.com/admin/user/modify", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: +userId,
        username: username,
        email: email,
        role: role,
      }),
    });

    if (response.ok) {
      const user = await response.json();
      console.log("userDetails2==>", user);

      setUpdated(true);
      setUserDetails(user);
    }
  };

  if (!userDetails) {
    return (
      <form onSubmit={handleFetchUser}>
        <div className="modal-form-item">
          <label for="user-id">User ID:</label>
          <input
            type="text"
            id="user-id"
            name="user-id"
            value={userId}
            onChange={(e) => userId(e.target.value)}
          />
        </div>
        <button type="submit">Get User</button>
      </form>
    );
  }

  if (userDetails && !updated) {
    return (
      <div>
        <form onSubmit={handleUpdateUser} className="modal-form">
          <div className="modal-form-item">
            <label for="user-id">User ID:</label>
            <input
              type="text"
              id="user-id"
              name="user-id"
              value="17"
              readonly
            />
          </div>
          <div className="modal-form-item">
            <label for="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={userDetails?.username}
            />
          </div>

          <div className="modal-form-item">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={userDetails?.email}
            />
          </div>
          <div className="modal-form-item">
            <label for="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              defaultValue={userDetails.role}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  if (updated) {
    return (
      <div>
        <h2>Updated User Details</h2>
        <div className="user-details">
          <p>
            <strong>User ID:</strong> {userDetails.userId}
          </p>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Role:</strong> {userDetails.role}
          </p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }
  return <></>;
};