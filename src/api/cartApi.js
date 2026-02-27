// ============================================
// CART API SERVICE - FINAL WORKING VERSION
// ============================================

const BASE_URL = "http://localhost:9093/api/cart";


// ============================================
// SAFE RESPONSE PARSER
// Handles JSON and plain number responses
// ============================================
async function parseResponse(response) {

  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return Number(text);
  }

}


// ============================================
// ADD TO CART
// ============================================
export async function addToCart({ username, productId, quantity }) {

  console.log("API → addToCart called:", {
    username,
    productId,
    quantity
  });

  const response = await fetch(`${BASE_URL}/add`, {

    method: "POST",

    credentials: "include",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      username: username,
      productId: productId,
      quantity: quantity
    })

  });

  console.log("API → addToCart status:", response.status);

  if (!response.ok) {

    const errorText = await response.text();

    console.error("API ERROR:", errorText);

    throw new Error("Failed to add to cart");

  }

  const data = await parseResponse(response);

  console.log("API → addToCart success:", data);

  return data;
}


// ============================================
// GET CART COUNT (IMPORTANT FIX)
// ============================================
export async function getCartCount(username) {

  console.log("API → getCartCount called:", username);

  const response = await fetch(
    `${BASE_URL}/items?username=${username}`,
    {
      method: "GET",
      credentials: "include"
    }
  );

  console.log("API → getCartCount status:", response.status);

  if (!response.ok) {

    throw new Error("Failed to fetch cart count");

  }

  const data = await parseResponse(response);

  console.log("API → full cart response:", data);

  let count = 0;

  // CASE 1: Spring Boot returns { cart: { products: [] } }
  if (data?.cart?.products) {

    count = data.cart.products.length;

  }

  // CASE 2: returns { products: [] }
  else if (data?.products) {

    count = data.products.length;

  }

  // CASE 3: returns array directly
  else if (Array.isArray(data)) {

    count = data.length;

  }

  // CASE 4: returns number
  else if (typeof data === "number") {

    count = data;

  }

  console.log("API → final count:", count);

  return { count };
}


// ============================================
// GET CART ITEMS
// ============================================
export async function getCartItems(username) {

  const response = await fetch(
    `${BASE_URL}/items?username=${username}`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) {

    throw new Error("Failed to fetch cart items");

  }

  return await parseResponse(response);
}


// ============================================
// UPDATE CART ITEM
// ============================================
export async function updateCart({ username, productId, quantity }) {

  const response = await fetch(`${BASE_URL}/update`, {

    method: "PUT",

    credentials: "include",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      username,
      productId,
      quantity
    })

  });

  if (!response.ok) {

    throw new Error("Failed to update cart");

  }

  return await parseResponse(response);
}


// ============================================
// DELETE CART ITEM
// ============================================
export async function deleteFromCart(productId, username) {

  const response = await fetch(
    `${BASE_URL}/${productId}?username=${username}`,
    {
      method: "DELETE",
      credentials: "include"
    }
  );

  if (!response.ok) {

    throw new Error("Failed to delete cart item");

  }

  return await parseResponse(response);
}