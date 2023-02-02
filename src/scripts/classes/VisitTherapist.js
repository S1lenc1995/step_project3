import Visit from "../classes/Visit.js";
import { removeAddVisitModal } from "../functions/removeAddVisitModal.js";
class VisitTherapist extends Visit {
  constructor(token) {
    super(token);
  }
  render(container) {
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="modal__physician__wrapper">
                  <label for="therAge">Age: </label
                  ><label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      name="therAge"
                      id="therAge"
                      class="age_input"
                      placeholder="Patient's age"
                    />
                  </label>
                </div>`
    );
  }
}

export default VisitTherapist;
