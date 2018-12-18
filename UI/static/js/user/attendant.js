const http = new Http();
const ui = new UI();
const user = new User();
const attendantBtn = document.querySelector(".modal-btn");
const attendantForm = document.querySelector("#attendant-form");

const addAttendant = e => {
  e.preventDefault();
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

// Function to store attendant's id
const storeAttendantId = e => {
  e.preventDefault();
  if (e.target.className == "attendant-btn") {
    const attendantId = e.target.parentElement.nextElementSibling.value;
    localStorage.setItem("attendantId", attendantId);
    window.location = "attendant_profile.html";
  }
};

const attendantsTable = document.querySelector(".table");
attendantsTable.addEventListener("click", storeAttendantId);
