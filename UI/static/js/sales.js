const http = new Http();
const ui = new UI();
const salesContainer = document.querySelector("#sale-records");
const sale = new Sale();

// Display sales
sale.displaySales();

const storeSaleId = e => {
  e.preventDefault();
  // Function to store sale id
  handleStoreSaleId(e.target);
};

// Listen for a click
salesContainer.addEventListener("click", storeSaleId);
