import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

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
      this.renderProductDetails();

      // Once the HTML is rendered, add a listener to the Add to Cart button
      // Notice the .bind(this). This callback will not work if the bind(this) is missing.
      // Review the readings from this week on 'this' to understand why.
      document.getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
        
         alertMessage("Product successfully added");
       
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

  renderProductDetails() {
       productDetailsTemplate(this.product)
}


}

function productDetailsTemplate(product) {

   document.querySelector("h3").textContent = product.Brand.Name;
        document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
        document.querySelector("img").src = product.Images.PrimaryLarge;
        document.querySelector("img").alt = product.NameWithoutBrand;
        const euroPrice = new Intl.NumberFormat('de-DE',
          {
            style: 'currency', currency: 'EUR',
          }).format(Number(product.FinalPrice) * 0.85);
        document.querySelector(".product-card__price").textContent = `$${euroPrice}`;
        document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
        document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;
        document.querySelector("#addToCart").dataset.id = product.Id;
}