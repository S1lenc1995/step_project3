import { searchCard } from "../functions/searchCard.js";
import { modal } from "../classes/Modal";
import { noCardsContainer } from "../modals/registrarion";

const title = document.getElementById("search");
const urgency = document.getElementById("filter_priority");
const dateVisit = document.getElementById("filter_done");
const searchBtn = document.getElementById("search__btn");
searchBtn.addEventListener("click", (ev) => {
  ev.stopPropagation();
  searchCard(modal.data, title.value, dateVisit.value, urgency.value);
  if (!document.querySelectorAll(".cards__card").length) {
    document.querySelector(".noItems").style.display = "block";
  } else {
    document.querySelector(".noItems").style.display = "none";
  }
});
export * from "../functions/filterCards.js";
