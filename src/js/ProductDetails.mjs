import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

    async init() {
         
    try {
      // Use the datasource to get the details for the current product.
      // findProductById will return a promise! use await or .then() to process it
      this.product = await this.dataSource.findProductById(this.productId);

     
      // The product details are needed before rendering the HTML
      this.renderProductDetails("main");

      // Once the HTML is rendered, add a listener to the Add to Cart button
      // Notice the .bind(this). This callback will not work if the bind(this) is missing.
      // Review the readings from this week on 'this' to understand why.
      document.getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
       //console.error(error);
      // Handle error gracefully (e.g., display an error message to the user)
    }
  }
        

    addToCart() {
       const cartItems = getLocalStorage("so-cart") || [];
    const existingProduct = cartItems.find(item => item.Id === this.product.Id);

    if (existingProduct) {

      // The find() method in JavaScript returns a reference to the found object. 
      // This means any changes made to the object returned by find() will modify the original object in the array. 
      existingProduct.quantity = (existingProduct.quantity || 1) + 1; // Increment quantity
    } else {
      cartItems.push(this.product); // Add new product with quantity 1
    }

    setLocalStorage("so-cart", cartItems);
    }

  renderProductDetails(selector) {
        const productContainer = document.querySelector(selector);

        const template = document.querySelector("#product-template");
        const clone = template.content.cloneNode(true);
        const productDetailsElement = clone.querySelector(".product-detail");

        // Populate the cloned template with product data
        clone.querySelector("h3").textContent = this.product.Brand.Name;
        clone.querySelector("h2").textContent = this.product.NameWithoutBrand;
        clone.querySelector("img").src = this.product.Image;
        clone.querySelector("img").alt = this.product.NameWithoutBrand;
        clone.querySelector(".product-card__price").textContent = `$${this.product.ListPrice}`;
        clone.querySelector(".product__color").textContent = this.product.Colors[0].ColorName;
        clone.querySelector(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
        clone.querySelector("#addToCart").dataset.id = this.product.Id;

        productContainer.appendChild(productDetailsElement);
}


}