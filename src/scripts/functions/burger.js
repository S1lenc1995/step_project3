// Header burger button

export const burgerButton = document.querySelector(".menu__wrapper__burger");
export const dropDownMenu = document.querySelector(".header__navigation");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("open");
  dropDownMenu.classList.toggle("absolute");
});
