import { visit } from "../modals/add_modal";

export const applyDefaultValues = (data) => {
  Object.entries(data).forEach(([key, val = ""]) => {
    if (key === "id") return;
    const [formEl] = document.getElementsByName(key);
    if (!formEl) return;
    formEl.value = val;
  });
  visit.removeKeyFormSavedValues("doctor");
};
