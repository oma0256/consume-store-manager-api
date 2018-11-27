const http = new Http();
const ui = new UI();
const salesContainer = document.querySelector("#sale-records");
const sale = new Sale();

sale.displaySales();

// Function to store product id
const storeSaleId = e => {
  e.preventDefault();
  handleStoreSaleId(e.target);
};

salesContainer.addEventListener("click", storeSaleId);
