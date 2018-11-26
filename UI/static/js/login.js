// Select login form
const loginForm = document.querySelector("#login-form");
const unauthorized = localStorage.getItem("unauthorized");
const isAdmin = localStorage.getItem("isAdmin");
const ui = new UI();
const user = new User();

if (unauthorized == "true") {
  if (isAdmin == "true") {
    ui.showAlert("Please login as a store owner", "msg-display error");
  } else {
    ui.showAlert("Please login as a store attendant", "msg-display error");
  }
  localStorage.setItem("unauthorized", false);
}

// Function to handle user login
const loginUser = e => {
  e.preventDefault();
  // Get user login details
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const loginData = {
    email: email,
    password: password
  };
  user.loginStoreUser(loginData, loginForm);
};

// Listen for form submission
loginForm.addEventListener("submit", loginUser);
