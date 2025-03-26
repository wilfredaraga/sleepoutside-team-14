import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");


const listElement = document.querySelector(".product-list") || document.createElement("ul");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();


  // Update the <em> element's content with the total number of items
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

updateCartCount();
loadHeaderFooter();
