import { registrationForm } from "../modals/registrarion";
const POST_URI = "https://ajax.test-danit.com/api/v2/cards/login";
export async function getToken(mail, pass) {
  const idIncorrect = document.querySelector("#Incorrect");
  if (idIncorrect) {
    idIncorrect.remove();
  }
  try {
    return fetch(POST_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: mail, password: pass }),
    }).then((response) => {
      if (response.status !== 200) {
        registrationForm.insertAdjacentHTML(
          "beforeend",
          `<p id = 'Incorrect'>Incorrect username or password</p>`
        );
        throw new Error(`Incorrect username or password`);
      }
      return response.text();
    });
  } catch (e) {
    console.warn(e);
  }
}
