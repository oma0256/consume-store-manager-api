const http = new Http();
const ui = new UI();
const user = new User();
const attendantBtn = document.querySelector(".modal-btn");
const attendantForm = document.querySelector("#attendant-form");

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
  // Add store attendant
  user.addAttendantFunc(regData);
};

attendantBtn.addEventListener("click", addAttendant);

// Display store attendants
user.displayAttendants();

const storeAttendantId = e => {
  e.preventDefault();
  // Check if details button has been clicked
  if (e.target.className == "attendant-btn") {
    // Get the attendant's id
    const attendantId = e.target.parentElement.nextElementSibling.value;
    // Store the attendant's id
    localStorage.setItem("attendantId", attendantId);
    window.location = "attendant_profile.html";
  }
};

const attendantsTable = document.querySelector(".table");
attendantsTable.addEventListener("click", storeAttendantId);
