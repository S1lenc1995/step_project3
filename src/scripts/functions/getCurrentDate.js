export function getCurrentDate(newDate) {
  let nowDate = [
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate(),
  ].join("-");
  return nowDate;
}
