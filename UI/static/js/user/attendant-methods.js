class User {
  constructor() {
    this.http = new Http();
    this.ui = new UI();
    this.url = "https://oma-store-manager-api.herokuapp.com/api/v2";
    this.attendantId = localStorage.getItem("attendantId");
  }

  // Make request to get store attendants
  displayAttendants() {
    this.http.get(`${this.url}/users`).then(res => {
      if (res.status === 200) {
        this.ui.showAttendants(res.data.attendants);
      } else {
        handleUnauthorization();
      }
    });
  }

  // Make request to fetch store attendant
  displayAttendant() {
    this.http.get(`${this.url}/users/${this.attendantId}`).then(res => {
      if (res.status === 200) {
        this.ui.showAttendant(res.data.attendant, res.data.sale_records);
      } else {
        handleUnauthorization();
      }
    });
  }

  // Make a request to add store attendant
  addAttendantFunc(regData) {
    this.http.post(`${this.url}/auth/signup`, regData).then(res => {
      if (res.status === 401 || res.status === 403) {
        handleUnauthorization();
      }
      modal.style.display = "none";
      if (res.status === 201) {
        this.displayAttendants();
        this.ui.showAlert(res.data.message, "msg-display success");
      } else {
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  // Make request to toggle attendant's rights
  toggleAttendantRights(rightsBtn) {
    this.http
      .get(`${this.url}/user/${this.attendantId}/toggle-rights`)
      .then(res => {
        if (res.status === 200) {
          this.ui.editBtn(rightsBtn);
          this.ui.showAlert(res.data.message, "msg-display success");
        } else {
          handleUnauthorization();
        }
      });
  }

  // Make a request to login user
  loginStoreUser(loginData) {
    this.http.post(`${this.url}/auth/login`, loginData).then(res => {
      if (res.status === 200) {
        let productsPage;
        if (res.data.message == "Store owner logged in successfully") {
          localStorage.setItem("isAdmin", true);
          productsPage = "../../UI/admin/products.html";
        } else if (
          res.data.message == "Store attendant logged in successfully"
        ) {
          localStorage.setItem("isAdmin", false);
          localStorage.setItem("attendantId", res.data.attendant_id);
          productsPage = "../../UI/attendant/products.html";
        } else {
          localStorage.setItem("isAdmin", true);
          productsPage = "products.html";
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("justLoggedIn", true);
        window.location = productsPage;
      } else {
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }
}
