import { getParam, loadHeaderFooter } from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";


loadHeaderFooter();
const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);


product.init();


// function addProductToCart(products) {
//   const cartItems = getLocalStorage("so-cart") || [];
//   cartItems.push(products);
//   setLocalStorage("so-cart", cartItems);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const products = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(products);
// }


