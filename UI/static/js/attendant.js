const http = new Http();
const attendantBtn = document.querySelector(".modal-btn");
const attendantForm = document.querySelector("#attendant-form");

// Function to add store attendant
const addAttendant = e => {
  e.preventDefault();
  // Get attendant attribbutes
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;
  const regData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    confirm_password: confirmPassword
  };
  // Make a request to add store attendant
  http
    .post(
      "https://oma-store-manager-api.herokuapp.com/api/v2/auth/signup",
      regData
    )
    .then(function(res) {
      if (res.status == 201) {
        attendantForm.submit();
      }
    });
};

attendantBtn.addEventListener("click", addAttendant);
