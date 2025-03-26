
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class AlertMessage {
  constructor(alertsFilePath, mainElementSelector) {
    this.alertsFilePath = alertsFilePath;
    this.mainElement = document.querySelector(mainElementSelector);
  }

  
  async displayAlerts() {
    try {
        const alerts = await this.getData();
       
        const alertListSection = document.createElement("section");
        alertListSection.classList.add("alert-list");

        alerts.forEach(alert => {
          const alertParagraph = document.createElement("p");
          alertParagraph.textContent = alert.message;
          alertParagraph.style.backgroundColor = alert.background;
          alertParagraph.style.color = alert.color;

          alertListSection.appendChild(alertParagraph);
        });

        this.mainElement.appendChild(alertListSection);
      
    } catch (error) {
       throw new Error("Bad Response", error);
    }
  }

 getData() {
    return fetch(this.alertsFilePath)
      .then(convertToJson)
      .then((data) => data);
  }

  
}