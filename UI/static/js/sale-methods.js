class Sale {
  constructor() {
    this.http = new Http();
    this.ui = new UI();
    this.saleId = localStorage.getItem("saleId");
    this.url = "https://oma-store-manager-api.herokuapp.com/api/v2/sales";
  }

  displaySales() {
    this.http.get(this.url).then(res => {
      if (res.status == 200) {
        const saleRecords = res.data.sale_records;
        this.ui.showSales(saleRecords);
      } else {
        handleUnauthorization();
      }
    });
  }

  displaySale() {
    // Make request to get a single product
    this.http.get(`${this.url}/${this.saleId}`).then(res => {
      // Check if product was fetched
      if (res.status === 200) {
        const sale = res.data.sale_record;
        this.ui.showSale(sale);
      } else {
        handleUnauthorization();
      }
    });
  }

  makeASale(sale) {
    this.http.post(this.url, sale).then(res => {
      if (res.status == 201) {
        this.ui.showCart("empty");
        this.ui.showAlert(res.data.message, "msg-display success");
        localStorage.setItem("cart", "empty");
      } else if (res.status == 400) {
        this.ui.showAlert(res.data.error, "msg-display error");
      } else {
        handleUnauthorization();
      }
    });
  }
}
