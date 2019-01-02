class ProductMethod {
  constructor() {
    this.http = new Http();
    this.ui = new UI();
    this.url = "https://oma-store-manager-api.herokuapp.com/api/v2/products";
    this.productId = localStorage.getItem("productId");
  }

  // Make a request to get all products
  displayProducts() {
    this.http.get(this.url).then(res => {
      if (res.status === 200) {
        const products = res.data.products;
        this.ui.showProducts(products);
      } else {
        handleUnauthorization();
      }
    });
  }

  // Make a request to get all deleted products
  displayDeletedProducts() {
    this.http.get(this.url).then(res => {
      if (res.status === 200) {
        const products = res.data.products_deleted;
        this.ui.showDeletedProducts(products);
      } else {
        handleUnauthorization();
      }
    });
  }

  // Make request to get a single product
  displayProduct() {
    this.http.get(`${this.url}/${this.productId}`).then(res => {
      if (res.status === 200) {
        const product = res.data.product;
        this.ui.showProduct(product);
        varPro = product;
      } else {
        handleUnauthorization();
      }
    });
  }

  // Make a request to add a product
  addProductFunc(productData) {
    this.http.post(this.url, productData).then(res => {
      if (res.status === 201) {
        modal.style.display = "none";
        this.displayProducts();
        this.ui.showAlert(res.data.message, "msg-display success");
      } else if (res.status == 401) {
        handleUnauthorization();
      } else {
        modal.style.display = "none";
        this.ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  // Make request to modify a product
  editProduct(productData) {
    this.http.put(`${this.url}/${this.productId}`, productData).then(res => {
      if (res.status == 200) {
        modal.style.display = "none";
        this.displayProduct();
        this.ui.showAlert(res.data.message, "msg-display success");
      } else if (res.status == 401) {
        handleUnauthorization();
      } else {
        modal.style.display = "none";
        ui.showAlert(res.data.error, "msg-display error");
      }
    });
  }

  // Make request to delete a product
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
