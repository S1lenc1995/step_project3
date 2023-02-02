//Open Add Visit Modal Logic
import Visit from "../classes/Visit.js";
import VisitCardiologist from "../classes/VisitCardiologist.js";
import VisitDentist from "../classes/VisitDentist.js";
import VisitTherapist from "../classes/VisitTherapist.js";
import { modal } from "../classes/Modal";
import { removeAddVisitModal } from "../functions/removeAddVisitModal.js";
import { sendCard } from "../API/sendCard.js";
import { getOneCard } from "../API/getOneCard.js";
import { deleteCard } from "../functions/deleteCard.js";
import { clearContainer } from "../functions/clearContainer.js";
import { applyDefaultValues } from "../functions/applyDefaultValues";
import { editCardRequest } from "../API/editCardRequest.js";
import { renderCard } from "../functions/searchCard.js";
import { getAllCards } from "../API/getAllCards.js";
import { cardsContainer } from "../functions/showMoreInfo";
//Constants
export const regFormCont = document.getElementById("registration__form");
export const visitModalForm = document.querySelector(".modal");

const doctorFields = document.getElementById("doctor");
export const openVisitBtn = document.querySelector(
  ".open__add__visit__modal-btn"
);
export const closeBtn = document.querySelector(
  ".add__visit__modal__close__btn"
);
export const containerForDoctorAddInputs = document.querySelector(
  ".doctors__container"
);
let token = null;
export const visit = new Visit();
let lastVisit = null;
//Constants

// Open a create visit modal by pressing "enter" btn
openVisitBtn.addEventListener("click", () => {
  visit.renderCreateMode();
});
// Toggling the input fields when you change doctor select
doctorFields.addEventListener("change", ({ target: { value } }) => {
  visit.updateForm("doctor", value);
  doctorToggleInputs();
});

export function doctorToggleInputs() {
  token = modal.getNewToken();
  const doctorSelectValue = visit.getValues("doctor");
  clearContainer(containerForDoctorAddInputs);
  if (!doctorSelectValue) return;
  if (doctorSelectValue === "Cardiologist") {
    lastVisit = new VisitCardiologist(token);
    lastVisit.render(containerForDoctorAddInputs);
  } else if (doctorSelectValue === "Dentist") {
    lastVisit = new VisitDentist(token);
    lastVisit.render(containerForDoctorAddInputs);
  } else {
    lastVisit = new VisitTherapist(token);
    lastVisit.render(containerForDoctorAddInputs);
  }
  const defaultValues = visit.getSavedValues();
  if (defaultValues) {
    applyDefaultValues(defaultValues);
  }
}
// Closing add visit modal
closeBtn.addEventListener("click", removeAddVisitModal);

//Creating visit or sending request to edit card info in the database

visitModalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let fd = new FormData(e.target);
  const values = {};
  for (let pair of fd.entries()) {
    values[pair[0]] = pair[1];
  }
  if (visitModalForm.classList.contains("edit")) {
    visit.deleteSavedValues();
    removeAddVisitModal();
    await editCardRequest(modal.getNewToken(), values, visit.getId()).then(
      (data) => data
    );
    let allCards = await getAllCards(modal.getNewToken());
    modal.setData(allCards);
    cardsContainer.innerHTML = "";
    renderCard(allCards);
    removeAddVisitModal();
  } else {
    sendCard(token, values).then((data) => {
      const parsed = JSON.parse(data);
      visit.addNewCard(parsed);
      visit.showCard(parsed);
      modal.data.push(parsed);
    });
    removeAddVisitModal();
  }
  document.querySelector(".noItems").style.display = "none";
});
