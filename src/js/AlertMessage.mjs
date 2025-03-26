// Alert.js

export default class AlertMessage {
  constructor(alertsFilePath, mainElementSelector) {
    this.alertsFilePath = alertsFilePath;
    this.mainElement = document.querySelector(mainElementSelector);
  }

  async displayAlerts() {
    try {
      const response = await fetch(this.alertsFilePath);
      const alerts = await response.json();

      console.log(alerts);

    
      if (alerts && alerts.length > 0) {
        const alertListSection = document.createElement("section");
        alertListSection.classList.add("alert-list");

        alerts.forEach(alert => {
          const alertParagraph = document.createElement("p");
          alertParagraph.textContent = alert.message;
          alertParagraph.style.backgroundColor = alert.background;
          alertParagraph.style.color = alert.color;

          alertListSection.appendChild(alertParagraph);
        });

        this.mainElement.prepend(alertListSection);
      }
    } catch (error) {
       return error;
    }
  }
}