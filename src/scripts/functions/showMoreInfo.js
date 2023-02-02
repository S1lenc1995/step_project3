// Show more logic onclick
import { getOneCard } from "../API/getOneCard.js";
import { modal } from "../classes/Modal.js";
import { containerForDoctorAddInputs, visit } from "../modals/add_modal.js";
import { getCardId } from "./getCardId.js";
import { clearContainer } from "./clearContainer.js";
//
export const cardsContainer = document.querySelector(".cards");
//
cardsContainer.addEventListener("click", showMoreInfo);
//
function showMoreInfo(e) {
  if (e.target.className === "show__more__btn") {
    if (e.target.innerText === "Hide") {
      const basicData = e.composedPath()[2].children[3];
      const additionalData = e.composedPath()[2].children[4];
      clearContainer(basicData);
      clearContainer(additionalData);
      e.target.innerText = "Show more";
      return;
    }
    const HtmlId = getCardId(e);
    getOneCard(modal.getNewToken(), HtmlId).then((data) => {
      const res = JSON.parse(data);
      const { doctor, urgency, aim, description, date_visit } = res;
      Array.from(document.getElementById(HtmlId).childNodes)
        .find(({ className }) => className === "basic__patients__data")
        .insertAdjacentHTML(
          "afterbegin",
          `<p>Urgency: ${urgency}</p>
    <p>Aim: ${aim}</p>
    <p>Description: ${description}</p>
<p>Date of visit: ${date_visit}</p>`
        );
      switchDoctors(doctor, res, HtmlId);
    });
    e.target.innerText = "Hide";
  }
}
function switchDoctors(doctor, res, id) {
  switch (doctor) {
    case "Dentist":
      const { date } = res;
      Array.from(document.getElementById(id).childNodes)
        .find(({ className }) => className === "additional__patients__data")
        .insertAdjacentHTML("afterbegin", `<p>Last visit: ${date}</p>`);
      break;
    case "Cardiologist":
      const { pressure, bmi, illnesses, cardAge } = res;
      Array.from(document.getElementById(id).childNodes)
        .find(({ className }) => className === "additional__patients__data")
        .insertAdjacentHTML(
          "afterbegin",
          `<p>Blood pressure: ${pressure}</p>
    <p>Body mass index: ${bmi}</p>
    <p>Illnessed the patient's had: ${illnesses}</p>
    <p>Patient's age: ${cardAge}</p>`
        );
      break;
    default:
      const { therAge } = res;
      Array.from(document.getElementById(id).childNodes)
        .find(({ className }) => className === "additional__patients__data")
        .insertAdjacentHTML("afterbegin", `<p>Patient's age: ${therAge}</p>`);
  }
}
