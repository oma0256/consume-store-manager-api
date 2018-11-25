const http = new Http();
const ui = new UI();
const attendantId = localStorage.getItem("attendantId");
const attendantProfile = document.querySelector("#attendant-profile");

http
  .get(
    `https://oma-store-manager-api.herokuapp.com/api/v2/users/${attendantId}`
  )
  .then(res => {
    if (res.status == 200) {
      ui.showAttendant(res.data.attendant);
    } else {
      handleUnauthorization();
    }
  });

const toggleRights = e => {
  e.preventDefault();
  if (e.target.classList.contains("rights")) {
    console.log("okay");
    http
      .get(
        `https://oma-store-manager-api.herokuapp.com/api/v2/user/${attendantId}/toggle-rights`
      )
      .then(res => {
        if (res.status == 200) {
          const rightsBtn = e.target;
          if (rightsBtn.textContent == "Make Admin") {
            rightsBtn.textContent = "Remove Admin";
            rightsBtn.style.backgroundColor = "#c82333";
          } else {
            rightsBtn.textContent = "Make Admin";
            rightsBtn.style.backgroundColor = "#4caf50";
          }
          ui.showAlert(res.data.message, "msg-display success");
        } else {
          localStorage.setItem("unauthorized", true);
          window.location = "http://127.0.0.1:5500/UI/admin/login.html";
        }
      });
  }
};

attendantProfile.addEventListener("click", toggleRights);
