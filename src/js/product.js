import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);


product.init();


function addProductToCart(products) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(products);
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const products = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(products);
}

// add listener to Add to Cart button
const mainElement = document.querySelector("main");
 console.log(mainElement);
if (mainElement) {
  console.log(mainElement);
    const addToCartButton = mainElement.querySelector("h2");
    console.log(addToCartButton);
    // if(addToCartButton){
    //     addToCartButton.addEventListener("click", addToCartHandler);
    // }
}
