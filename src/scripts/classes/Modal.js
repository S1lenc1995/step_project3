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
export const modal = new Modal();
