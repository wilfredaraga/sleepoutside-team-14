import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img
            src="${product.Image}"
            alt="${product.NameWithoutBrand}"/>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p></a>
        </li>`;
}

// export default class ProductList{
//     constructor(category, dataSource, listElement){
//         // You passed in this information to make the class as reusable as possible.
//         // Being able to define these things when you use the class will make it very flexible
//         this.category = category;
//         this.dataSource = dataSource;
//         this.listElement = listElement;
//     }

//     async init() {
//        try {
//         // the dataSource will return a Promise...so you can use await to resolve it.
//         const list = await this.dataSource.getData();
//         // next, render the list – ** future **
//         this.renderList(list);
//        } catch (error) {
//         console.log(error)
//        }
//     }
//        renderList(list) {
//         renderListWithTemplate(productCardTemplate, this.listElement, list)
//         };
// };
// =======
// function productCardTemplate(product) {
//   return `<li class="product-card">
//     <a href="product_pages/?product=${product.Id}">
//       <img src="${product.Image}" alt="${product.NameWithoutBrand} ">
//       <h2 class="card__brand">${product.Brand.Name}11</h2>
//       <h3 class="card__name">${product.NameWithoutBrand}000</h3>
//       <p class="product-card__price">$${product.ListPrice}</p>
//     </a>
//   </li>`
// }

// import { renderListWithTemplate } from "./utils.mjs";

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
