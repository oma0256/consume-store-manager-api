const http = new Http();
const salesArea = document.querySelector("#sale-records");
let output = "";
http
  .get("https://oma-store-manager-api.herokuapp.com/api/v2/sales")
  .then(res => {
    if (res.status == 200) {
      const saleRecords = res.data.sale_records;
      if (saleRecords.length < 1) {
        salesArea.innerHTML = "No sales have been made yet";
      } else {
        output += `<h1 class="center-head">Sales Records</h1><table class="table"><tr><th>Product</th><th>Quantity</th><th>Amount</th></tr>`;
        saleRecords.forEach(sale => {
          http
            .get(
              `https://oma-store-manager-api.herokuapp.com/api/v2/products/${
                sale.product_id
              }`
            )
            .then(res => {
              output += `<tr><td>${res.data.product.name}</td><td>${
                sale.quantity
              }</td><td>${sale.total}</td></tr>`;
              salesArea.innerHTML = output;
            });
        });
      }
    }
  });
