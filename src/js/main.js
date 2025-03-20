import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

import { getLocalStorage } from "./utils.mjs";

const dataSource = new ProductData("tents");


const listElement = document.querySelector(".product-list") || document.createElement("ul");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

function updateCartCount() {
  // Get cart items from localStorage (or initialize an empty array if none exist)
  const cartItems = getLocalStorage("so-cart") || [];

  // Calculate the total number of items in the cart
  let totalItems = 0;
  cartItems.forEach(item => {
    totalItems += item.quantity || 1; // Add item quantity, default to 1 if not defined
  });

  // Select the <em> element
  const cartCountElement = document.querySelector(".cart em");

  // Update the <em> element's content with the total number of items
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

updateCartCount();
