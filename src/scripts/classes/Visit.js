import { sendCard } from "../API/sendCard.js";
import { removeAddVisitModal } from "../functions/removeAddVisitModal";
import { deleteCard } from "../functions/deleteCard";
import { regFormCont, visitModalForm } from "../modals/add_modal";
import { moveCards } from "../functions/dragenDrop.js";
export default class Visit {
  constructor(token = "") {
    this.token = token;
    this.form = document.querySelector(".modal");
    this.event = null;
    this.cardsContainer = document.querySelector("#drop-items");
    this.btn = document.querySelector(".add-visit__modal__btn");
    this.data = [];
    this.id = null;
    this.savedValues = null;
  }
  saveValues(data) {
    this.savedValues = data;
  }
  deleteSavedValues() {
    this.savedValues = null;
  }
  getSavedValues() {
    return this.savedValues;
  }
  removeKeyFormSavedValues(key) {
    const data = { ...this.savedValues };
    delete data[key];
    this.savedValues = data;
  }
  clearCard() {
    const cards = document.querySelectorAll(".cards__card");
    cards.forEach(el=> el.remove());
  }
  renderCreateMode() {
    regFormCont.classList.add("active");
    this.btn.innerText = "Create";
  }
  renderEditMode() {
    regFormCont.classList.add("active");
    this.btn.innerText = "Update";
    visitModalForm.classList.add("edit");
  }
  addNewCard(card) {
    this.data = [...this.data, card];
  }
  updateForm(key, value) {
    this[key] = value;
  }
  getValues(key) {
    return this[key];
  }
  showCard(card) {
    const { id, ...rest } = card;
    this.cardsContainer.innerHTML += `
        <div class="cards__card" id="${id}">
                <span class="close__btn">X</span>
                <h3>Patient's name: ${rest.name}</h3>
                <p>Doctor: ${rest.doctor}</p>
                <div class="basic__patients__data"></div>
                <div class="additional__patients__data"></div>
                <div class="btn_container">
                  <button class="show__more__btn">Show more</button>
                  <button class="edit__btn">Edit</button>
                </div>
              </div>
      
        `;
    removeAddVisitModal();
    deleteCard();
    this.form.reset();
    moveCards()
  }
  setId(val) {
    this.id = val;
  }
  getId() {
    return this.id;
  }
}
