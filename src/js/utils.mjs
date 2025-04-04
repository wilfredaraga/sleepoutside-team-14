// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
    if(clear) parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML(position, list.map(templateFn).join(""));
}

export function updateCartCount(cartItems) {
  // Get cart items from localStorage (or initialize an empty array if none exist)
 

  // Calculate the total number of items in the cart
  let totalItems = 0;
  cartItems.forEach(item => {
    totalItems += item.quantity || 1; // Add item quantity, default to 1 if not defined
  });

  // Select the <em> element
  const cartCountElement = document.querySelector(".cart em");

  // Update the <em> element's content with the total number of items
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

export function renderWithTemplate(templateFn, parentElement, data, callback){
  parentElement.innerHTML = templateFn;
  if(callback){
    callback(data)
  }
}

async function loadTemplate(path){
  const result = await fetch(path);
  const template = await result.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)
}

export function alertMessage(message, scroll=true, duration = 3000){
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function(e) {
    if (e.target.tagName == "SPAN"){
      main.removeChild(this);
    }
  })

  const main = document.querySelector("main")
  main.prepend(alert);

  if(scroll)
    window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}