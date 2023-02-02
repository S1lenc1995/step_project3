//IMPORTS
import { getToken } from "../API/token.js";
import { modal } from "../classes/Modal.js";
import { openVisitBtn } from "./add_modal";
import { getAllCards } from "../API/getAllCards.js";
import Visit from "../classes/Visit.js";
import { renderCard } from "../functions/searchCard.js";
//IMPORTS

//Constants
export const openRegistrationBtn = document.querySelector(
  ".menu__wrapper__logo__enter"
);
export let closeRegistrationBtn = document.querySelector(
  ".registration__close__btn"
);
const registrationMenu = document.querySelector("#registration-form");
export let token = null;
const openVisit = document.querySelector(".open__add__visit__modal-btn");
export const registrationForm = document.querySelector(".modal__login__form");
export const noCardsContainer = document.querySelector(".noItems");
//Constants

//OPEN LOGIN LOGIC
openRegistrationBtn.addEventListener("click", () => {
  modal.render();
});
//SUBMIT LOGIN LOGIC
registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const login = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  let data = await getToken(login.email, login.password);
  modal.setToken(data);
  e.target.style.display = "none";
  openRegistrationBtn.style.display = "none";
  openVisit.style.display = "block";
  registrationMenu.classList.remove("active");
  //Loading of all the cards after login and drawing them
  const allCards = await getAllCards(data);
  if (allCards.length) {
    noCardsContainer.style.display = "none";
  }
  modal.setData(allCards);
  renderCard(allCards);
});
