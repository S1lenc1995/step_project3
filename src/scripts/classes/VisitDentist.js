import Visit from "../classes/Visit.js";
class VisitDentist extends Visit {
  constructor(token) {
    super(token);
  }
  render(container) {
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="modal__dentist__wrapper">
          <label for="last_visit">Last visit: </label><input type="date" name="date" id="last_visit" class="last_visit_input" />
        </div>`
    );
  }
}

export default VisitDentist;
