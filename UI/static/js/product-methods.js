class ProductMethod {
  constructor() {
    this.http = new Http();
    this.ui = new UI();
    this.url = "https://oma-store-manager-api.herokuapp.com/api/v2/products";
  }

  displayProducts() {
    // Make a request to get all products
    this.http.get(this.url).then(res => {
      // Check if request was successful
      if (res.status === 200) {
        const products = res.data.products;
        this.ui.showProducts(products);
        // Run if products weren't fetched
      } else {
        handleUnauthorization();
      }
    });
  }

  displayProduct() {
    // Make request to get a single product
    this.http.get(`${this.url}/${productId}`).then(res => {
      // Check if product was fetched
      if (res.status === 200) {
        const product = res.data.product;
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
      if (res.status === 201) {
        modal.style.display = "none";
        this.displayProducts();
        this.ui.showAlert("Product added", "msg-display success");
      } else if (res.status == 401) {
        handleUnauthorization();
      } else {
        modal.style.display = "none";
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  editProduct(productData) {
    this.http.put(`${this.url}/${productId}`, productData).then(res => {
      if (res.status == 200) {
        modal.style.display = "none";
        this.displayProduct();
        this.ui.showAlert("Product modified", "msg-display success");
      } else if (res.status == 401) {
        handleUnauthorization();
      } else {
        modal.style.display = "none";
        ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  deleteProduct() {
    this.http.delete(`${this.url}/${productId}`).then(res => {
      if (res.status == 200) {
        localStorage.setItem("deleted", true);
        window.location = "products.html";
      } else {
        handleUnauthorization();
      }
    });
  }
}
