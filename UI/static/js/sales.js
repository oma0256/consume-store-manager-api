const http = new Http();
const ui = new UI();
const salesContainer = document.querySelector("#sale-records");
const sale = new Sale();

sale.displaySales();

// Function to store product id
const storeSaleId = e => {
  e.preventDefault();
  // Check if details button has been clicked
  if (e.target.className == "sale-detail") {
    // Get the product's id
    const saleId = e.target.parentElement.nextElementSibling.value;
    // Store the product's id
    localStorage.setItem("saleId", saleId);
    window.location = "sale-detail.html";
  }
};

salesContainer.addEventListener("click", storeSaleId);
