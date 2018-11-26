const http = new Http();
const ui = new UI();
const user = new User();
const attendantProfile = document.querySelector("#attendant-profile");

user.displayAttendant();

const toggleRights = e => {
  e.preventDefault();
  if (e.target.classList.contains("rights")) {
    user.toggleAttendantRights(e.target);
  }
};

attendantProfile.addEventListener("click", toggleRights);
