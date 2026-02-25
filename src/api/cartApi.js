const BASE_URL = "http://localhost:9092/api/cart";

// ✅ ADD TO CART
export const addToCart = async (data) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add to cart");
  }

  return res.text();
};

// ✅ GET CART COUNT
export const getCartCount = async (username) => {
  const res = await fetch(
    `${BASE_URL}/items/count?username=${username}`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cart count");
  }

  return res.json();
};

// ✅ GET CART ITEMS
export const getCartItems = async (username) => {
  const res = await fetch(
    `${BASE_URL}/items?username=${username}`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cart items");
  }

  return res.json();
};

// ✅ UPDATE CART
export const updateCart = async (data) => {
  const res = await fetch(`${BASE_URL}/update`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update cart");
  }

  return res.text();
};

// ✅ DELETE CART ITEM
export const deleteFromCart = async (data) => {
  const res = await fetch(`${BASE_URL}/delete`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to delete item");
  }

  return res.text();
};