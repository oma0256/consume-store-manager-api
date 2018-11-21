// Select login form
const loginForm = document.querySelector("#login-form");
http = new Http();
// Listen for form submission
loginForm.addEventListener("submit", loginUser);

// Function to handle user login
function loginUser(e) {
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
    .then(function(res) {
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
        localStorage.setItem("jsutLoggedIn", true);
        loginForm.submit();
      } else {
        const loginCard = document.querySelector("#login-card");
        const loginContainer = document.querySelector("#login-container");
        // Create error message div
        const msg = document.createElement("div");
        msg.className = "error";
        msg.appendChild(document.createTextNode(res.data.error));
        // Append error message to web page
        loginContainer.insertBefore(msg, loginCard);
      }
    });
}
