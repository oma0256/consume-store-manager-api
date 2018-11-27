const http = new Http();
const ui = new UI();
const user = new User();
const attendantProfile = document.querySelector("#attendant-profile");
const saleRecord = document.querySelector("#sale-records");

user.displayAttendant();

const toggleRights = e => {
  e.preventDefault();
  if (e.target.classList.contains("rights")) {
    user.toggleAttendantRights(e.target);
  }
};

const storeSaleId = e => {
  e.preventDefault();
  handleStoreSaleId(e.target);
};

attendantProfile.addEventListener("click", toggleRights);
saleRecord.addEventListener("click", storeSaleId);
