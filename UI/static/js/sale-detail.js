const http = new Http();
const ui = new UI();
// Get product id
const saleId = localStorage.getItem("saleId");
const sale = new Sale();

sale.displaySale();
