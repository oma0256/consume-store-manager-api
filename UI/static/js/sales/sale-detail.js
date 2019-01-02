const http = new Http();
const ui = new UI();
const saleId = localStorage.getItem("saleId");
const sale = new Sale();
const saleArea = document.querySelector("#sale-detail");

// Display a single sale
sale.displaySale();

const revertSaleHandler = e => {
  sale.revertSale();
};

saleArea.addEventListener("click", revertSaleHandler);
