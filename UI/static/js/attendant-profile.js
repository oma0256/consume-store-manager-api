const http = new Http();
const ui = new UI();
const attendantId = localStorage.getItem("attendantId");

http
  .get(
    `https://oma-store-manager-api.herokuapp.com/api/v2/users/${attendantId}`
  )
  .then(res => {
    if (res.status == 200) {
      ui.showAttendant(res.data.attendant);
    }
  });
