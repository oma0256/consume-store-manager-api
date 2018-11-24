const http = new Http();
const ui = new UI();
const salesContainer = document.querySelector("#sale-records");
http
  .get("https://oma-store-manager-api.herokuapp.com/api/v2/sales")
  .then(res => {
    if (res.status == 200) {
      const saleRecords = res.data.sale_records;
      ui.showSales(saleRecords);
    } else {
      handleUnauthorization();
    }
  });

// Function to store product id
const storeSaleId = e => {
  e.preventDefault();
  // Check if details button has been clicked
  if (e.target.className == "sale-detail") {
    // Get the product's id
    const saleId = e.target.parentElement.nextElementSibling.value;
    // Store the product's id
    localStorage.setItem("saleId", saleId);
    window.location = "http://127.0.0.1:5500/UI/admin/sale-detail.html";
  }
};

salesContainer.addEventListener("click", storeSaleId);
