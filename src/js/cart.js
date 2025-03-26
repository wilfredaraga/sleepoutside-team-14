import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  totalInCart(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button id = "clear">X</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function totalInCart(itemsInCart) {
  let sum = 0;
  const cartTotal = document.querySelector(".cart-footer");
  const totalPrice = document.querySelector(".cart-total");
  for (let i = 0; i < itemsInCart.length; i++) {
    sum += itemsInCart[i].FinalPrice;
  }
  if (itemsInCart.length > 0) {
    cartTotal.style.display = "block";
    totalPrice.innerHTML = `Total: ${sum.toFixed(2)}`;
  }
}

renderCartContents();

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

/*function deleteProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  const toDelete = cartItems.indexOf(product);
  delete cartItems[toDelete];
  setLocalStorage("so-cart", cartItems);
}

// add listener to Delete to Cart button
document
  .getElementById("clear")
  .addEventListener("click", this.deleteProductToCart.bind(this));*/