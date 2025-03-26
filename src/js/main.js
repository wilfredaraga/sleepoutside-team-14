import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./AlertMessage.mjs";

import {  loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");

const info = new Alert("./alert.json", "main");


const listElement = document.querySelector(".product-list") || document.createElement("ul");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();


info.displayAlerts();

