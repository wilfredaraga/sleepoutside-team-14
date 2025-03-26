import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

import ShoppingCart from "./shoppingCart.mjs";


const cartItems = getLocalStorage("so-cart");
console.log(cartItems);

const shoppingCart = new ShoppingCart(
  cartItems,
  "#cart-item-template",
  ".product-list"
);

shoppingCart.renderCartItems();


// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");

//   totalInCart(cartItems);
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// function totalInCart(itemsInCart) {
//   let sum = 0;
//   const cartTotal = document.querySelector(".cart-footer");
//   const totalPrice = document.querySelector(".cart-total");
//   for (let i = 0; i < itemsInCart.length; i++) {
//     sum += itemsInCart[i].FinalPrice;
//   }
//   if (itemsInCart.length > 0) {
//     cartTotal.style.display = "block";
//     totalPrice.innerHTML = `Total: ${sum.toFixed(2)}`;
//   }
// }

// renderCartContents();