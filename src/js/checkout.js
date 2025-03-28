import { loadHeaderFooter,alertMessage  } from "./utils.mjs";

import  CheckoutProcess  from "./CheckoutProcess.mjs";

 loadHeaderFooter();

 const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button

const send = document.querySelector("#checkoutSubmit");
send.addEventListener("click", (e) => {
  e.preventDefault();
   const formElement = document.forms["checkout"];
   const status = formElement.checkValidity();
   formElement.reportValidity();
   if(status){
        order.checkout();
        send.textContent = "";
        const spinner = document.createElement("span");
        send.classList.add("spin-element");
               spinner.setAttribute("role", "status");
              spinner.textContent = "Processing...";
               send.appendChild(spinner);
               
               
        localStorage.clear();
        setTimeout(() => { 
              window.location.href = "/checkout/success.html";
            }, 5000);
              
               
   }else{
       
          const invalidFields = [];

          // Iterate through all input elements in the form
          for (const input of formElement.elements) {
          if (input.tagName === "INPUT" || input.tagName === "SELECT" || input.tagName === "TEXTAREA") {
               if (!input.validity.valid) {
               // Construct a message based on input's name and validity
               invalidFields.push(`${input.name}: ${input.validationMessage || "Invalid value"}`);
               }
          }
          }

          if (invalidFields.length > 0) {
               alertMessage("Please correct the following fields:\n" + invalidFields.join("\n"));
          } else {
          // If reportValidity did not return a message, but checkValidity returned false,
          // then there are other issues.
               alertMessage("There are errors in the form. Please check the fields.");
          }
     }
  
});

 