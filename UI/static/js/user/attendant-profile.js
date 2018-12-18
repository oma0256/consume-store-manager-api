const http = new Http();
const ui = new UI();
const user = new User();
const attendantProfile = document.querySelector("#attendant-profile");
const saleRecord = document.querySelector("#sale-records");

// Display attendant profile
user.displayAttendant();

const toggleRights = e => {
  e.preventDefault();
  if (e.target.classList.contains("rights")) {
    user.toggleAttendantRights(e.target);
  }
};

// Function to store sale record id
const storeSaleId = e => {
  e.preventDefault();
  handleStoreSaleId(e.target);
};

attendantProfile.addEventListener("click", toggleRights);
saleRecord.addEventListener("click", storeSaleId);
