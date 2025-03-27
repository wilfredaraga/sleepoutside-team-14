const baseURL = import.meta.env.VITE_SERVER_URL
import CheckoutProcess from "./CheckoutProcess.mjs";


 loadHeaderFooter();



 const order = new CheckoutProcess("so-cart","div");
 

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
   
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
  }
  async findProductById(id) {
   const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
   
    return data.Result;
  }

  async sendData(form){
    // http://wdd330-backend.onrender.com/checkout
      const url =`${baseURL}checkout`;
      order.init();
      order.checkout(form,url);
  }
}
