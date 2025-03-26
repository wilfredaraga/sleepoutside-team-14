import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

import {  loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
// first create an instance of the ProductData class.
const dataSource = new ProductData();
const category = getParam("category");
const title = document.querySelector("#highlight");
console.log(title);
title.textContent = category;
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list") || document.createElement("ul");
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, listElement);

// finally call the init method to show the products
productList.init();




