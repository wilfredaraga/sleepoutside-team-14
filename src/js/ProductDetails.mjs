import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="amount_discounted">$</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

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
      
      //Add discount amount
      const retailPrice = this.product.SuggestedRetailPrice
      const finalPrice = this.product.FinalPrice

      if (retailPrice > finalPrice){
        const discount = document.querySelector(".amount_discounted");
        const amountOfDiscount = retailPrice-finalPrice;

        discount.innerHTML = amountOfDiscount;
      }
      console.log(this.renderProductDetails("main"));
      document
        .getElementById("addToCart")
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
    const element = document.querySelector(selector);
        element.insertAdjacentHTML(
          "afterBegin",
    productDetailsTemplate(this.product));
}
}