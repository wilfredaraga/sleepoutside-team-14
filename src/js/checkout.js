import { loadHeaderFooter } from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";
 
External = new ExternalServices();

 loadHeaderFooter();

form = document.querySelector("#form-order");
External.sendData(form);
 