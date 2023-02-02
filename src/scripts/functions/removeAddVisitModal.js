import { regFormCont, visit, visitModalForm } from "../modals/add_modal.js";

export function removeAddVisitModal() {
  regFormCont.classList.remove("active");
  visit.deleteSavedValues();
  if (visitModalForm.classList.contains("edit")) {
    visitModalForm.classList.remove("edit");
  }
}
