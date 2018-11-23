// Select login form
const loginForm = document.querySelector("#login-form");
const http = new Http();
const ui = new UI();
const unauthorized = localStorage.getItem("unauthorized");

if (unauthorized == "true") {
  ui.showAlert("Please login", "msg-display error");
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

  // Send login details to api
  http
    .post(
      "https://oma-store-manager-api.herokuapp.com/api/v2/auth/login",
      loginData
    )
    .then(res => {
      // Check if the request was successful
      if (res.status === 200) {
        // Check if it's store owner
        if (res.data.message == "Store owner logged in successfully") {
          localStorage.setItem("isAdmin", true);
        } else {
          localStorage.setItem("isAdmin", false);
        }
        // Store token in local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("justLoggedIn", true);
        loginForm.submit();
      } else {
        ui.showAlert(res.data.error, "msg-display error");
      }
    });
};

// Listen for form submission
loginForm.addEventListener("submit", loginUser);
