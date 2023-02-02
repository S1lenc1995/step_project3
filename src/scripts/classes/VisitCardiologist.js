import Visit from "../classes/Visit.js";

class VisitCardiologist extends Visit {
  constructor(token) {
    super(token);
  }
  render(container) {  
    container.insertAdjacentHTML(
      "beforeend",
      `  
        <div class='cardiologist-wrapper'>
        <div class="modal__cardiologist__wrapper">
        <div class="pressure__wrapper">
          <label for="pressure">A normal blood pressure: </label
          ><input
            name="pressure"
            required
            minlength="2"
            maxlength="7"
            id="pressure"
            class="pressure_input"
            placeholder="A patient's normal pressure in **/** format"
          />
        </div>
        <div class="bmi__wrapper">
          <label for="bmi">Body mass index: </label
          ><input
            type="number"
            name="bmi"
            min="0"
            max="10"
            id="bmi"
            class="bmi_input"
            placeholder="Body mass index"
          />
        </div>
        <div class="illness__wrapper">
          <label for="illnesses">Cardio-vascular illnesses: </label
          ><input
            type="text"
            name="illnesses"
            required
            minlength="2"
            maxlength="15"
            id="illnesses"
            class="illnesses_input"
            placeholder="State cardio-vascular illnesses that the patient have previously had"
          />
        </div>
        <div class="age_wrapper">
          <label for="cardAge">Age: </label
          ><input
            type="number"
            name="cardAge"
            min="0"
            max="120"
            id="cardAge"
            class="age_input"
            placeholder="Patient's age"
          />
        </div>
        </div>`
    );
  }
}

export default VisitCardiologist;
