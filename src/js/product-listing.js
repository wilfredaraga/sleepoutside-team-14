import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

import {  loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
// first create an instance of the ExternalServices class.
const dataSource = new ExternalServices();
const category = getParam("category");
const title = document.querySelector("#highlight");

title.textContent = category;
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list") || document.createElement("ul");
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, listElement);

// finally call the init method to show the products
productList.init();




