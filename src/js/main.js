import ProductData from "../js/ProductData.mjs";
import ProductList from "../js/ProductList.mjs";

const dataSource = new ProductData("tents.json");
const listElement = document.getElementById("product-list");

const tentList = new ProductList("tents", dataSource, listElement);
tentList.init();
