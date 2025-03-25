
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.NameWithoutBrand} ">
      <h2 class="card__brand">${product.Brand.Name}11</h2>
      <h3 class="card__name">${product.NameWithoutBrand}000</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`
}

import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {

    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
      
      }

      async init() {
         
    try {
        
       const list = await this.dataSource.getData();
         this.renderList(list);
    } catch (error) {
       //console.error(error);
      // Handle error gracefully (e.g., display an error message to the user)
    }
  }

    renderList(list) {

        renderListWithTemplate(productCardTemplate,this.listElement,list);
       
    }

    


  

}