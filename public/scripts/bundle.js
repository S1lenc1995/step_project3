(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRequest = deleteRequest;
async function deleteRequest(token, cardId) {
  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(({
    status
  }) => {
    return status;
  });
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCardRequest = editCardRequest;
async function editCardRequest(token, newCard, cardId) {
  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newCard)
  });
  const data = await response.json();
  return data;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCards = getAllCards;
var _sendCard = require("./sendCard.js");
async function getAllCards(token) {
  const response = await fetch(_sendCard.URI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.text();
  return JSON.parse(data);
}

},{"./sendCard.js":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneCard = getOneCard;
async function getOneCard(token, cardId) {
  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.text();
  return data;
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URI = void 0;
exports.sendCard = sendCard;
const URI = "https://ajax.test-danit.com/api/v2/cards";
exports.URI = URI;
async function sendCard(token, card) {
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(card)
  });
  const data = await response.text();
  return data;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
var _registrarion = require("../modals/registrarion");
const POST_URI = "https://ajax.test-danit.com/api/v2/cards/login";
async function getToken(mail, pass) {
  const idIncorrect = document.querySelector("#Incorrect");
  if (idIncorrect) {
    idIncorrect.remove();
  }
  try {
    return fetch(POST_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: mail,
        password: pass
      })
    }).then(response => {
      if (response.status !== 200) {
        _registrarion.registrationForm.insertAdjacentHTML("beforeend", `<p id = 'Incorrect'>Incorrect username or password</p>`);
        throw new Error(`Incorrect username or password`);
      }
      return response.text();
    });
  } catch (e) {
    console.warn(e);
  }
}

},{"../modals/registrarion":27}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modal = void 0;
class Modal {
  constructor(token = "") {
    this.token = null;
    this.data = [];
    this.registrationMenu = document.querySelector("#registration-form");
  }
  render() {
    this.registrationMenu.classList.add("active");
  }
  setToken(val) {
    this.token = val;
  }
  setData(val) {
    this.data = val;
  }
  getNewToken() {
    return this.token;
  }
}
const modal = new Modal();
exports.modal = modal;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sendCard = require("../API/sendCard.js");
var _removeAddVisitModal = require("../functions/removeAddVisitModal");
var _deleteCard = require("../functions/deleteCard");
var _add_modal = require("../modals/add_modal");
var _dragenDrop = require("../functions/dragenDrop.js");
class Visit {
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
    const data = {
      ...this.savedValues
    };
    delete data[key];
    this.savedValues = data;
  }
  clearCard() {
    const cards = document.querySelectorAll(".cards__card");
    cards.forEach(el => el.remove());
  }
  renderCreateMode() {
    _add_modal.regFormCont.classList.add("active");
    this.btn.innerText = "Create";
  }
  renderEditMode() {
    _add_modal.regFormCont.classList.add("active");
    this.btn.innerText = "Update";
    _add_modal.visitModalForm.classList.add("edit");
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
    const {
      id,
      ...rest
    } = card;
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
    (0, _removeAddVisitModal.removeAddVisitModal)();
    (0, _deleteCard.deleteCard)();
    this.form.reset();
    (0, _dragenDrop.moveCards)();
  }
  setId(val) {
    this.id = val;
  }
  getId() {
    return this.id;
  }
}
exports.default = Visit;

},{"../API/sendCard.js":5,"../functions/deleteCard":16,"../functions/dragenDrop.js":17,"../functions/removeAddVisitModal":22,"../modals/add_modal":26}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Visit = _interopRequireDefault(require("../classes/Visit.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class VisitCardiologist extends _Visit.default {
  constructor(token) {
    super(token);
  }
  render(container) {
    container.insertAdjacentHTML("beforeend", `  
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
        </div>`);
  }
}
var _default = VisitCardiologist;
exports.default = _default;

},{"../classes/Visit.js":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Visit = _interopRequireDefault(require("../classes/Visit.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class VisitDentist extends _Visit.default {
  constructor(token) {
    super(token);
  }
  render(container) {
    container.insertAdjacentHTML("beforeend", `<div class="modal__dentist__wrapper">
          <label for="last_visit">Last visit: </label><input type="date" name="date" id="last_visit" class="last_visit_input" />
        </div>`);
  }
}
var _default = VisitDentist;
exports.default = _default;

},{"../classes/Visit.js":8}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Visit = _interopRequireDefault(require("../classes/Visit.js"));
var _removeAddVisitModal = require("../functions/removeAddVisitModal.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class VisitTherapist extends _Visit.default {
  constructor(token) {
    super(token);
  }
  render(container) {
    container.insertAdjacentHTML("beforeend", `<div class="modal__physician__wrapper">
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
                </div>`);
  }
}
var _default = VisitTherapist;
exports.default = _default;

},{"../classes/Visit.js":8,"../functions/removeAddVisitModal.js":22}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDefaultValues = void 0;
var _add_modal = require("../modals/add_modal");
const applyDefaultValues = data => {
  Object.entries(data).forEach(([key, val = ""]) => {
    if (key === "id") return;
    const [formEl] = document.getElementsByName(key);
    if (!formEl) return;
    formEl.value = val;
  });
  _add_modal.visit.removeKeyFormSavedValues("doctor");
};
exports.applyDefaultValues = applyDefaultValues;

},{"../modals/add_modal":26}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropDownMenu = exports.burgerButton = void 0;
// Header burger button

const burgerButton = document.querySelector(".menu__wrapper__burger");
exports.burgerButton = burgerButton;
const dropDownMenu = document.querySelector(".header__navigation");
exports.dropDownMenu = dropDownMenu;
burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("open");
  dropDownMenu.classList.toggle("absolute");
});

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearContainer = clearContainer;
function clearContainer(containerYouNeedToClear) {
  while (containerYouNeedToClear.firstChild) {
    containerYouNeedToClear.removeChild(containerYouNeedToClear.firstChild);
  }
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeRegistrationBtn = void 0;
let closeRegistrationBtn = document.querySelector(".registration__close__btn");
exports.closeRegistrationBtn = closeRegistrationBtn;
closeRegistrationBtn.addEventListener('click', () => {
  let registrationMenu = document.querySelector("#registration-form");
  registrationMenu.classList.remove('active');
});

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCard = deleteCard;
var _Modal = require("../classes/Modal.js");
var _deleteRequest = require("../API/deleteRequest");
var _getCardId = require("./getCardId");
function deleteCard() {
  let cards = document.querySelectorAll(".cards__card");
  cards.forEach(el => {
    el.addEventListener("click", async e => {
      if (e.target.classList.contains("close__btn")) {
        const cardId = (0, _getCardId.getCardIdOnDelete)(e);
        const token = _Modal.modal.getNewToken();
        await (0, _deleteRequest.deleteRequest)(token, cardId);
        _Modal.modal.data = _Modal.modal.data.filter(el => el.id !== cardId);
        e.target.parentElement.remove();
        if (!document.querySelectorAll(".cards__card").length) {
          document.querySelector(".noItems").style.display = "block";
        }
      }
    });
  });
}

},{"../API/deleteRequest":1,"../classes/Modal.js":7,"./getCardId":20}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveCards = moveCards;
function moveCards() {
  const dropItems = document.getElementById('drop-items');
  new Sortable(dropItems, {
    animation: 350,
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    store: {
      set: sortable => {
        const order = sortable.toArray();
        localStorage.setItem(sortable.options.group.name, order.join('|'));
      },
      get: sortable => {
        const order = localStorage.getItem(sortable.options.group.name);
        return order ? order.split('|') : [];
      }
    }
  });
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _showMoreInfo = require("./showMoreInfo");
var _getCardId = require("./getCardId.js");
var _add_modal = require("../modals/add_modal.js");
var _getOneCard = require("../API/getOneCard");
var _Modal = require("../classes/Modal.js");
var _VisitCardiologist = _interopRequireDefault(require("../classes/VisitCardiologist.js"));
var _VisitDentist = _interopRequireDefault(require("../classes/VisitDentist.js"));
var _VisitTherapist = _interopRequireDefault(require("../classes/VisitTherapist.js"));
var _editCardInfo = require("../functions/editCardInfo.js");
Object.keys(_editCardInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _editCardInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _editCardInfo[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//
_showMoreInfo.cardsContainer.addEventListener("click", editCardInfo);
//
async function editCardInfo(e) {
  if (e.target.className === "edit__btn") {
    const id = (0, _getCardId.getCardId)(e);
    _add_modal.visit.setId(id);
    const card = document.getElementById(id);
    const data = await (0, _getOneCard.getOneCard)(_Modal.modal.getNewToken(), id).then(data => {
      const parsed = JSON.parse(data);
      return parsed;
    });
    _add_modal.visit.renderEditMode();
    const {
      doctor
    } = data;
    _add_modal.visit.updateForm("doctor", doctor);
    _add_modal.visit.saveValues(data);
    (0, _add_modal.doctorToggleInputs)();
  }
}

},{"../API/getOneCard":4,"../classes/Modal.js":7,"../classes/VisitCardiologist.js":9,"../classes/VisitDentist.js":10,"../classes/VisitTherapist.js":11,"../functions/editCardInfo.js":18,"../modals/add_modal.js":26,"./getCardId.js":20,"./showMoreInfo":24}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _searchCard = require("../functions/searchCard.js");
var _Modal = require("../classes/Modal");
var _registrarion = require("../modals/registrarion");
var _filterCards = require("../functions/filterCards.js");
Object.keys(_filterCards).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _filterCards[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filterCards[key];
    }
  });
});
const title = document.getElementById("search");
const urgency = document.getElementById("filter_priority");
const dateVisit = document.getElementById("filter_done");
const searchBtn = document.getElementById("search__btn");
searchBtn.addEventListener("click", ev => {
  ev.stopPropagation();
  (0, _searchCard.searchCard)(_Modal.modal.data, title.value, dateVisit.value, urgency.value);
  if (!document.querySelectorAll(".cards__card").length) {
    document.querySelector(".noItems").style.display = "block";
  } else {
    document.querySelector(".noItems").style.display = "none";
  }
});

},{"../classes/Modal":7,"../functions/filterCards.js":19,"../functions/searchCard.js":23,"../modals/registrarion":27}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardId = getCardId;
exports.getCardIdOnDelete = getCardIdOnDelete;
function getCardId(e) {
  const id = e.composedPath()[2].id;
  return id;
}
function getCardIdOnDelete(e) {
  const id = e.composedPath()[1].id;
  return id;
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentDate = getCurrentDate;
function getCurrentDate(newDate) {
  let nowDate = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join("-");
  return nowDate;
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAddVisitModal = removeAddVisitModal;
var _add_modal = require("../modals/add_modal.js");
function removeAddVisitModal() {
  _add_modal.regFormCont.classList.remove("active");
  _add_modal.visit.deleteSavedValues();
  if (_add_modal.visitModalForm.classList.contains("edit")) {
    _add_modal.visitModalForm.classList.remove("edit");
  }
}

},{"../modals/add_modal.js":26}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchCard = exports.renderCard = void 0;
var _Visit = _interopRequireDefault(require("../classes/Visit.js"));
var _getCurrentDate = require("./getCurrentDate");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let getVisit = new _Visit.default();
const renderCard = data => {
  for (let item of data) {
    getVisit.showCard(item);
  }
};
exports.renderCard = renderCard;
const searchCard = (data, title, date, urgency) => {
  getVisit.clearCard();
  /*  let drogBox = document.querySelector("#drop-items");
   drogBox.innerHTML= ""; */
  const resData = data.filter(row => {
    const nowDate = (0, _getCurrentDate.getCurrentDate)(new Date());
    title = title.toLowerCase();
    if (title !== "" && !row.aim.toLowerCase().includes(title) && !row.description.toLowerCase().includes(title)) return false;
    if (urgency !== "all" && !row.urgency.includes(urgency)) return false;
    switch (date) {
      case "Open":
        return row.date_visit >= nowDate;
      case "Done":
        return row.date_visit < nowDate;
    }
    return true;
  });
  renderCard(resData);
};
exports.searchCard = searchCard;

},{"../classes/Visit.js":8,"./getCurrentDate":21}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardsContainer = void 0;
var _getOneCard = require("../API/getOneCard.js");
var _Modal = require("../classes/Modal.js");
var _add_modal = require("../modals/add_modal.js");
var _getCardId = require("./getCardId.js");
var _clearContainer = require("./clearContainer.js");
// Show more logic onclick

//
const cardsContainer = document.querySelector(".cards");
//
exports.cardsContainer = cardsContainer;
cardsContainer.addEventListener("click", showMoreInfo);
//
function showMoreInfo(e) {
  if (e.target.className === "show__more__btn") {
    if (e.target.innerText === "Hide") {
      const basicData = e.composedPath()[2].children[3];
      const additionalData = e.composedPath()[2].children[4];
      (0, _clearContainer.clearContainer)(basicData);
      (0, _clearContainer.clearContainer)(additionalData);
      e.target.innerText = "Show more";
      return;
    }
    const HtmlId = (0, _getCardId.getCardId)(e);
    (0, _getOneCard.getOneCard)(_Modal.modal.getNewToken(), HtmlId).then(data => {
      const res = JSON.parse(data);
      const {
        doctor,
        urgency,
        aim,
        description,
        date_visit
      } = res;
      Array.from(document.getElementById(HtmlId).childNodes).find(({
        className
      }) => className === "basic__patients__data").insertAdjacentHTML("afterbegin", `<p>Urgency: ${urgency}</p>
    <p>Aim: ${aim}</p>
    <p>Description: ${description}</p>
<p>Date of visit: ${date_visit}</p>`);
      switchDoctors(doctor, res, HtmlId);
    });
    e.target.innerText = "Hide";
  }
}
function switchDoctors(doctor, res, id) {
  switch (doctor) {
    case "Dentist":
      const {
        date
      } = res;
      Array.from(document.getElementById(id).childNodes).find(({
        className
      }) => className === "additional__patients__data").insertAdjacentHTML("afterbegin", `<p>Last visit: ${date}</p>`);
      break;
    case "Cardiologist":
      const {
        pressure,
        bmi,
        illnesses,
        cardAge
      } = res;
      Array.from(document.getElementById(id).childNodes).find(({
        className
      }) => className === "additional__patients__data").insertAdjacentHTML("afterbegin", `<p>Blood pressure: ${pressure}</p>
    <p>Body mass index: ${bmi}</p>
    <p>Illnessed the patient's had: ${illnesses}</p>
    <p>Patient's age: ${cardAge}</p>`);
      break;
    default:
      const {
        therAge
      } = res;
      Array.from(document.getElementById(id).childNodes).find(({
        className
      }) => className === "additional__patients__data").insertAdjacentHTML("afterbegin", `<p>Patient's age: ${therAge}</p>`);
  }
}

},{"../API/getOneCard.js":4,"../classes/Modal.js":7,"../modals/add_modal.js":26,"./clearContainer.js":14,"./getCardId.js":20}],25:[function(require,module,exports){
"use strict";

var _registrarion = require("./modals/registrarion.js");
var _add_modal = require("./modals/add_modal.js");
var _Modal = require("./classes/Modal.js");
var _burger = require("./functions/burger.js");
var _showMoreInfo = require("./functions/showMoreInfo.js");
var editBtn = _interopRequireWildcard(require("./functions/editCardInfo"));
var _searchCard = require("./functions/searchCard.js");
var _closeRegistrationForm = require("./functions/closeRegistrationForm.js");
var filterBar = _interopRequireWildcard(require("./functions/filterCards"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

},{"./classes/Modal.js":7,"./functions/burger.js":13,"./functions/closeRegistrationForm.js":15,"./functions/editCardInfo":18,"./functions/filterCards":19,"./functions/searchCard.js":23,"./functions/showMoreInfo.js":24,"./modals/add_modal.js":26,"./modals/registrarion.js":27}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerForDoctorAddInputs = exports.closeBtn = void 0;
exports.doctorToggleInputs = doctorToggleInputs;
exports.visitModalForm = exports.visit = exports.regFormCont = exports.openVisitBtn = void 0;
var _Visit = _interopRequireDefault(require("../classes/Visit.js"));
var _VisitCardiologist = _interopRequireDefault(require("../classes/VisitCardiologist.js"));
var _VisitDentist = _interopRequireDefault(require("../classes/VisitDentist.js"));
var _VisitTherapist = _interopRequireDefault(require("../classes/VisitTherapist.js"));
var _Modal = require("../classes/Modal");
var _removeAddVisitModal = require("../functions/removeAddVisitModal.js");
var _sendCard = require("../API/sendCard.js");
var _getOneCard = require("../API/getOneCard.js");
var _deleteCard = require("../functions/deleteCard.js");
var _clearContainer = require("../functions/clearContainer.js");
var _applyDefaultValues = require("../functions/applyDefaultValues");
var _editCardRequest = require("../API/editCardRequest.js");
var _searchCard = require("../functions/searchCard.js");
var _getAllCards = require("../API/getAllCards.js");
var _showMoreInfo = require("../functions/showMoreInfo");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//Open Add Visit Modal Logic

//Constants
const regFormCont = document.getElementById("registration__form");
exports.regFormCont = regFormCont;
const visitModalForm = document.querySelector(".modal");
exports.visitModalForm = visitModalForm;
const doctorFields = document.getElementById("doctor");
const openVisitBtn = document.querySelector(".open__add__visit__modal-btn");
exports.openVisitBtn = openVisitBtn;
const closeBtn = document.querySelector(".add__visit__modal__close__btn");
exports.closeBtn = closeBtn;
const containerForDoctorAddInputs = document.querySelector(".doctors__container");
exports.containerForDoctorAddInputs = containerForDoctorAddInputs;
let token = null;
const visit = new _Visit.default();
exports.visit = visit;
let lastVisit = null;
//Constants

// Open a create visit modal by pressing "enter" btn
openVisitBtn.addEventListener("click", () => {
  visit.renderCreateMode();
});
// Toggling the input fields when you change doctor select
doctorFields.addEventListener("change", ({
  target: {
    value
  }
}) => {
  visit.updateForm("doctor", value);
  doctorToggleInputs();
});
function doctorToggleInputs() {
  token = _Modal.modal.getNewToken();
  const doctorSelectValue = visit.getValues("doctor");
  (0, _clearContainer.clearContainer)(containerForDoctorAddInputs);
  if (!doctorSelectValue) return;
  if (doctorSelectValue === "Cardiologist") {
    lastVisit = new _VisitCardiologist.default(token);
    lastVisit.render(containerForDoctorAddInputs);
  } else if (doctorSelectValue === "Dentist") {
    lastVisit = new _VisitDentist.default(token);
    lastVisit.render(containerForDoctorAddInputs);
  } else {
    lastVisit = new _VisitTherapist.default(token);
    lastVisit.render(containerForDoctorAddInputs);
  }
  const defaultValues = visit.getSavedValues();
  if (defaultValues) {
    (0, _applyDefaultValues.applyDefaultValues)(defaultValues);
  }
}
// Closing add visit modal
closeBtn.addEventListener("click", _removeAddVisitModal.removeAddVisitModal);

//Creating visit or sending request to edit card info in the database

visitModalForm.addEventListener("submit", async e => {
  e.preventDefault();
  let fd = new FormData(e.target);
  const values = {};
  for (let pair of fd.entries()) {
    values[pair[0]] = pair[1];
  }
  if (visitModalForm.classList.contains("edit")) {
    visit.deleteSavedValues();
    (0, _removeAddVisitModal.removeAddVisitModal)();
    await (0, _editCardRequest.editCardRequest)(_Modal.modal.getNewToken(), values, visit.getId()).then(data => data);
    let allCards = await (0, _getAllCards.getAllCards)(_Modal.modal.getNewToken());
    _Modal.modal.setData(allCards);
    _showMoreInfo.cardsContainer.innerHTML = "";
    (0, _searchCard.renderCard)(allCards);
    (0, _removeAddVisitModal.removeAddVisitModal)();
  } else {
    (0, _sendCard.sendCard)(token, values).then(data => {
      const parsed = JSON.parse(data);
      visit.addNewCard(parsed);
      visit.showCard(parsed);
      _Modal.modal.data.push(parsed);
    });
    (0, _removeAddVisitModal.removeAddVisitModal)();
  }
  document.querySelector(".noItems").style.display = "none";
});

},{"../API/editCardRequest.js":2,"../API/getAllCards.js":3,"../API/getOneCard.js":4,"../API/sendCard.js":5,"../classes/Modal":7,"../classes/Visit.js":8,"../classes/VisitCardiologist.js":9,"../classes/VisitDentist.js":10,"../classes/VisitTherapist.js":11,"../functions/applyDefaultValues":12,"../functions/clearContainer.js":14,"../functions/deleteCard.js":16,"../functions/removeAddVisitModal.js":22,"../functions/searchCard.js":23,"../functions/showMoreInfo":24}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = exports.registrationForm = exports.openRegistrationBtn = exports.noCardsContainer = exports.closeRegistrationBtn = void 0;
var _token = require("../API/token.js");
var _Modal = require("../classes/Modal.js");
var _add_modal = require("./add_modal");
var _getAllCards = require("../API/getAllCards.js");
var _Visit = _interopRequireDefault(require("../classes/Visit.js"));
var _searchCard = require("../functions/searchCard.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//IMPORTS

//IMPORTS

//Constants
const openRegistrationBtn = document.querySelector(".menu__wrapper__logo__enter");
exports.openRegistrationBtn = openRegistrationBtn;
let closeRegistrationBtn = document.querySelector(".registration__close__btn");
exports.closeRegistrationBtn = closeRegistrationBtn;
const registrationMenu = document.querySelector("#registration-form");
let token = null;
exports.token = token;
const openVisit = document.querySelector(".open__add__visit__modal-btn");
const registrationForm = document.querySelector(".modal__login__form");
exports.registrationForm = registrationForm;
const noCardsContainer = document.querySelector(".noItems");
//Constants

//OPEN LOGIN LOGIC
exports.noCardsContainer = noCardsContainer;
openRegistrationBtn.addEventListener("click", () => {
  _Modal.modal.render();
});
//SUBMIT LOGIN LOGIC
registrationForm.addEventListener("submit", async e => {
  e.preventDefault();
  const login = {
    email: e.target.email.value,
    password: e.target.password.value
  };
  let data = await (0, _token.getToken)(login.email, login.password);
  _Modal.modal.setToken(data);
  e.target.style.display = "none";
  openRegistrationBtn.style.display = "none";
  openVisit.style.display = "block";
  registrationMenu.classList.remove("active");
  //Loading of all the cards after login and drawing them
  const allCards = await (0, _getAllCards.getAllCards)(data);
  if (allCards.length) {
    noCardsContainer.style.display = "none";
  }
  _Modal.modal.setData(allCards);
  (0, _searchCard.renderCard)(allCards);
});

},{"../API/getAllCards.js":3,"../API/token.js":6,"../classes/Modal.js":7,"../classes/Visit.js":8,"../functions/searchCard.js":23,"./add_modal":26}]},{},[25]);
