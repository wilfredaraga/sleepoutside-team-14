// <<<<<<< HEAD
// import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// =======
import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";

// >>>>>>> main
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

// <<<<<<< HEAD
// function addProductToCart(product) {
// =======
// const product = new ProductDetails(productId, dataSource);

// product.init();

// }
// function addProductToCart(products) {
// >>>>>>> main
  // const cartItems = getLocalStorage("so-cart") || [];
  // cartItems.push(product);
  // setLocalStorage("so-cart", cartItems);
// }
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}