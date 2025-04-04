// ShoppingCart.mjs

import { getLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key)
    this.calculateListTotal(list);
    this.renderCartItems(list);
  }

  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }

  renderCartItems() {
    this.container.innerHTML = ""; // Clear existing content

    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.forEach(item => {
        const clone = this.template.content.cloneNode(true);

        // Populate template with item data
        const image = clone.querySelector(".cart-card__image img");
        const name = clone.querySelector(".card__name");
        const color = clone.querySelector(".cart-card__color");
        const quantity = clone.querySelector(".cart-card__quantity");
        const price = clone.querySelector(".cart-card__price");

        image.src = item.Image;
        image.alt = item.Name;
        name.textContent = item.Name;
        color.textContent = item.Colors[0].ColorName;
        quantity.textContent = `qty: 1`;
        price.textContent = `$${(item.FinalPrice).toFixed(2)}`;

        this.container.appendChild(clone);
      });
    } else {
      this.container.innerHTML = "<p>Your cart is empty.</p>";
    }

    this.updateTotal(); // Update the total price
  }

  updateTotal() {
    const cartTotal = document.querySelector(".cart-footer");
    const totalElement = document.querySelector(".cart-total");
    if (totalElement){
        let total = 0;
        if(this.cartItems && this.cartItems.length > 0){
            this.cartItems.forEach(item => {
                total += item.FinalPrice * item.quantity;
            });
        }
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
     cartTotal.style.display = "block";
  }

  updateCart(newCartItems){
    this.cartItems = newCartItems;
    this.renderCartItems();
  }
}