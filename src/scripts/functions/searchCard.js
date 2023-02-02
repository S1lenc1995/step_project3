import Visit from "../classes/Visit.js";
import { getCurrentDate } from "./getCurrentDate";
let getVisit = new Visit();
export const renderCard = (data) => {
  for (let item of data) {
    getVisit.showCard(item);
  }
};

export const searchCard = (data, title, date, urgency) => {
  getVisit.clearCard();
 /*  let drogBox = document.querySelector("#drop-items");
  drogBox.innerHTML= ""; */
  const resData = data.filter((row) => {
    const nowDate = getCurrentDate(new Date());
    title = title.toLowerCase();
    if (
      title !== "" &&
      !row.aim.toLowerCase().includes(title) &&
      !row.description.toLowerCase().includes(title)
    )
      return false;

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
