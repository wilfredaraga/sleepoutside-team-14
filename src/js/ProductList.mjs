export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        try {
            this.products = await this.dataSource.getData();
            this.renderList();
        }  catch (error) {
            console.error("Error loading product list:", error)
        } 
    }

    renderList() {
        const filteredProducts = this.products.filter(product => product.category === this.category);

            this.listElement.innerHTML = "";

            filteredProducts.forEach(product => {
                const productCard = this.createProductCard(product);
                this.listElement.appendChild(productCard);
            });
        }
        
    createProductCard(product) {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="product.name">
            <p>${product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            `;

        return card;
    }
}