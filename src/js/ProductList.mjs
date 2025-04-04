
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img
            src="${product.Images.PrimaryMedium}"
            alt="${product.Name}"/>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p></a>
        </li>`;
}

export default class ProductList{
    constructor(category, dataSource, listElement){
        // You passed in this information to make the class as reusable as possible.
        // Being able to define these things when you use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
       try {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        // next, render the list – ** future **
        list.sort(function(a,b){
            let name1 = a.NameWithoutBrand.toLowerCase();
            let name2 = b.NameWithoutBrand.toLowerCase();
            if (name1 < name2) {return -1}
            if (name1 > name2) {return 1}
            return 0;
        })
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
       } catch (error) {
        console.log(error)
      // Handle error gracefully (e.g., display an error message to the user)
       }
    }
       renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
        };
};
