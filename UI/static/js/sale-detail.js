const http = new Http();
const ui = new UI();
const saleId = localStorage.getItem("saleId");
const sale = new Sale();

// Display a single sale
sale.displaySale();
