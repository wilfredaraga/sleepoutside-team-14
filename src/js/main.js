import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./AlertMessage.mjs";

import {  loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ExternalServices("tents");

const info = new Alert("../json/alert.json", "main");


info.displayAlerts();
const listElement = document.querySelector(".product-list") || document.createElement("ul");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();




