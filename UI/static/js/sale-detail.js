const http = new Http();
const ui = new UI();
// Get product id
const saleId = localStorage.getItem("saleId");

// Make request to get a single product
http
  .get(`https://oma-store-manager-api.herokuapp.com/api/v2/sales/${saleId}`)
  .then(res => {
    // Check if product was fetched
    if (res.status === 200) {
      sale = res.data.sale;
      ui.showSale(sale);
    } else {
      handleUnauthorization();
    }
  });
