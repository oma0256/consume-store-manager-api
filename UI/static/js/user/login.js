const loginForm = document.querySelector("#login-form");
const unauthorized = localStorage.getItem("unauthorized");
const ui = new UI();
const user = new User();

if (unauthorized == "true") {
  ui.showAlert("Please login as a store owner", "msg-display error");
  localStorage.setItem("unauthorized", false);
}

const loginUser = e => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const loginData = {
    email: email,
    password: password
  };
  // Call funtion to make request to login user
  user.loginStoreUser(loginData);
};

loginForm.addEventListener("submit", loginUser);
