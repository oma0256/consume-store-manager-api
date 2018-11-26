class User {
  constructor() {
    this.http = new Http();
    this.ui = new UI();
    this.url = "https://oma-store-manager-api.herokuapp.com/api/v2";
    this.attendantId = localStorage.getItem("attendantId");
  }

  displayAttendants() {
    this.http.get(`${this.url}/users`).then(res => {
      if (res.status == 200) {
        this.ui.showAttendants(res.data.attendants);
      } else {
        localStorage.setItem("unauthorized", true);
        window.location = "login.html";
      }
    });
  }

  displayAttendant() {
    this.http.get(`${this.url}/users/${this.attendantId}`).then(res => {
      if (res.status == 200) {
        ui.showAttendant(res.data.attendant);
      } else {
        handleUnauthorization();
      }
    });
  }

  addAttendantFunc(regData) {
    // Make a request to add store attendant
    this.http.post(`${this.url}/auth/signup`, regData).then(res => {
      if (res.status == 201) {
        modal.style.display = "none";
        this.displayAttendants();
        this.ui.showAlert(res.data.message, "msg-display success");
      } else if (res.status == 401 || res.status == 403) {
        localStorage.setItem("unauthorized", true);
        window.location = "login.html";
      } else {
        modal.style.display = "none";
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  toggleAttendantRights(rightsBtn) {
    this.http
      .get(`${this.url}/user/${this.attendantId}/toggle-rights`)
      .then(res => {
        if (res.status == 200) {
          ui.editBtn(rightsBtn);
          ui.showAlert(res.data.message, "msg-display success");
        } else {
          localStorage.setItem("unauthorized", true);
          window.location = "login.html";
        }
      });
  }

  loginStoreUser(loginData, loginForm) {
    // Send login details to api
    this.http.post(`${this.url}/auth/login`, loginData).then(res => {
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
        localStorage.setItem("justLoggedIn", true);
        loginForm.submit();
      } else {
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }
}
