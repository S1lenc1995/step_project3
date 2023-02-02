import { modal } from "../classes/Modal.js";
import { deleteRequest } from "../API/deleteRequest";
import { getCardIdOnDelete } from "./getCardId";

export function deleteCard() {
  let cards = document.querySelectorAll(".cards__card");
  cards.forEach((el) => {
    el.addEventListener("click", async (e) => {
      if (e.target.classList.contains("close__btn")) {
        const cardId = getCardIdOnDelete(e);
        const token = modal.getNewToken();
        await deleteRequest(token, cardId);
        modal.data = modal.data.filter((el) => el.id !== cardId);
        e.target.parentElement.remove();
        if (!document.querySelectorAll(".cards__card").length) {
          document.querySelector(".noItems").style.display = "block";
        }
      }
     
    });
  });
}
