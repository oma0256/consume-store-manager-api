const http = new Http();
const ui = new UI();
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
    .then(res => {
      if (res.status == 201) {
        attendantForm.submit();
      } else if (res.status == 401 || res.status == 403) {
        localStorage.setItem("unauthorized", true);
        window.location = "http://127.0.0.1:5500/UI/admin/login.html";
      } else {
        ui.showAlert(res.data.error, "msg-display error");
      }
    });
};

attendantBtn.addEventListener("click", addAttendant);

http
  .get("https://oma-store-manager-api.herokuapp.com/api/v2/users")
  .then(res => {
    if (res.status == 200) {
      ui.showAttendants(res.data.attendants);
    } else {
      localStorage.setItem("unauthorized", true);
      window.location = "http://127.0.0.1:5500/UI/admin/login.html";
    }
  });

const storeAttendantId = e => {
  e.preventDefault();
  // Check if details button has been clicked
  if (e.target.className == "attendant-btn") {
    // Get the product's id
    const attendantId = e.target.parentElement.nextElementSibling.value;
    // Store the product's id
    localStorage.setItem("attendantId", attendantId);
    window.location = "http://127.0.0.1:5500/UI/admin/attendant_profile.html";
  }
};

const attendantsTable = document.querySelector(".table");
attendantsTable.addEventListener("click", storeAttendantId);
