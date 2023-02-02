export let closeRegistrationBtn = document.querySelector(
    ".registration__close__btn"
  );

  closeRegistrationBtn.addEventListener('click',()=>{
    let registrationMenu = document.querySelector("#registration-form");
    registrationMenu.classList.remove('active')
  })