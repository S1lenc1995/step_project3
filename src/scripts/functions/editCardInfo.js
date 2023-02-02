import { cardsContainer } from "./showMoreInfo";
import { getCardId } from "./getCardId.js";
import { doctorToggleInputs, visit } from "../modals/add_modal.js";
import { getOneCard } from "../API/getOneCard";
import { modal } from "../classes/Modal.js";
import VisitCardiologist from "../classes/VisitCardiologist.js";
import VisitDentist from "../classes/VisitDentist.js";
import VisitTherapist from "../classes/VisitTherapist.js";
//
cardsContainer.addEventListener("click", editCardInfo);
//
async function editCardInfo(e) {
  if (e.target.className === "edit__btn") {
    const id = getCardId(e);
    visit.setId(id);
    const card = document.getElementById(id);
    const data = await getOneCard(modal.getNewToken(), id).then((data) => {
      const parsed = JSON.parse(data);
      return parsed;
    });
    visit.renderEditMode();
    const { doctor } = data;
    visit.updateForm("doctor", doctor);
    visit.saveValues(data);
    doctorToggleInputs();
  }
}

export * from "../functions/editCardInfo.js";
