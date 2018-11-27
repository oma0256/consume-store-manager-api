class User {
  constructor() {
    this.http = new Http();
    this.ui = new UI();
    this.url = "https://oma-store-manager-api.herokuapp.com/api/v2";
    this.attendantId = localStorage.getItem("attendantId");
  }

  displayAttendants() {
    // Make request to get store attendants
    this.http.get(`${this.url}/users`).then(res => {
      if (res.status == 200) {
        // Call method to display store attendants
        this.ui.showAttendants(res.data.attendants);
      } else {
        localStorage.setItem("unauthorized", true);
        window.location = "login.html";
      }
    });
  }

  displayAttendant() {
    // Make request to fetch store attendant
    this.http.get(`${this.url}/users/${this.attendantId}`).then(res => {
      if (res.status == 200) {
        // Display store attendant details
        this.ui.showAttendant(res.data.attendant, res.data.sale_records);
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
        // Display message signaling product add
        this.ui.showAlert(res.data.message, "msg-display success");
      } else if (res.status == 401 || res.status == 403) {
        localStorage.setItem("unauthorized", true);
        // Redirect to login page
        window.location = "login.html";
      } else {
        modal.style.display = "none";
        // Display error signaling failure of product add
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  toggleAttendantRights(rightsBtn) {
    // Make request to toggle attendant's rights
    this.http
      .get(`${this.url}/user/${this.attendantId}/toggle-rights`)
      .then(res => {
        if (res.status == 200) {
          this.ui.editBtn(rightsBtn);
          this.ui.showAlert(res.data.message, "msg-display success");
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
          localStorage.setItem("attendantId", res.data.attendant_id);
        }
        // Store token in local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("justLoggedIn", true);
        // Submit form
        loginForm.submit();
      } else {
        // Display error message on login failure
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }
}
