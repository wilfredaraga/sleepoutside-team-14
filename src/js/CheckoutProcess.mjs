import { alertMessage, getLocalStorage, setLocalStorage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach((key, value) => {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1
        };
    });

    return simplifiedItems;
}

export default class CheckoutProcess{
    constructor(key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const summaryElement = document.querySelector(this.outputSelector + "#cartTotal");
        const itemNumElement = document.querySelector(this.outputSelector + "#num-items");

        itemNumElement.innerText = this.list.length;

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `$${this.itemTotal}`;
    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.shipping = 10 + (this.list.length - 1) *2;
        this.orderTotal = (
            parseFloat(this.itemTotal) + 
            parseFloat(this.tax) + 
            parseFloat(this.shipping)
        )

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`)
        const shipping = document.querySelector(`${this.outputSelector} #shipping`)
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`)

        
        tax.innerText = `${this.tax.toFixed(2)}`;
        shipping.innerText = `${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        try {
            const response = await services.checkout(order);
            console.log(response);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html")
        } catch (error) {
            removeAllAlerts();
            for (let message in error.message){
                alertMessage(error.message[message])
            }

            console.log.error;
        }

        document.querySelector("#checkoutSubmit")
            .addEventListener("click", (e) => {
                e.preventDefault()
                const myForm = document.forms[0];
                const chk_status = myForm.checkValidity();
                myForm.reportValidity();
            if (chk_status)
                myCheckout.checkout();
            });
    }
};