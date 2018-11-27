class ProductMethod {
  constructor() {
    this.http = new Http();
    this.ui = new UI();
    this.url = "https://oma-store-manager-api.herokuapp.com/api/v2/products";
    this.productId = localStorage.getItem("productId");
  }

  displayProducts() {
    // Make a request to get all products
    this.http.get(this.url).then(res => {
      // Check if request was successful
      if (res.status === 200) {
        const products = res.data.products;
        // Call funtion to render products on the web page
        this.ui.showProducts(products);
      } else {
        // Call function for unauthorized user
        handleUnauthorization();
      }
    });
  }

  displayProduct() {
    // Make request to get a single product
    this.http.get(`${this.url}/${this.productId}`).then(res => {
      // Check if product was fetched
      if (res.status === 200) {
        const product = res.data.product;
        // Display product on web page
        this.ui.showProduct(product);
        varPro = product;
      } else {
        handleUnauthorization();
      }
    });
  }

  addProductFunc(productData) {
    // Make a request to add a product
    this.http.post(this.url, productData).then(res => {
      // Check if product was added
      if (res.status === 201) {
        modal.style.display = "none";
        this.displayProducts();
        // Display message on success
        this.ui.showAlert(res.data.message, "msg-display success");
      } else if (res.status == 401) {
        handleUnauthorization();
      } else {
        modal.style.display = "none";
        // Display message on error
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  editProduct(productData) {
    // Make request to modify a product
    this.http.put(`${this.url}/${this.productId}`, productData).then(res => {
      if (res.status == 200) {
        modal.style.display = "none";
        this.displayProduct();
        // Display success message
        this.ui.showAlert(res.data.message, "msg-display success");
      } else if (res.status == 401) {
        handleUnauthorization();
      } else {
        modal.style.display = "none";
        // Display error message
        ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  deleteProduct() {
    this.http.delete(`${this.url}/${this.productId}`).then(res => {
      if (res.status == 200) {
        localStorage.setItem("deleted", true);
        window.location = "products.html";
      } else {
        handleUnauthorization();
      }
    });
  }
}
