class UI {
  showSales(saleRecords) {
    const salesArea = document.querySelector("#sale-records");
    let output = "";
    if (saleRecords.length < 1) {
      salesArea.innerHTML = "No sales have been made yet";
    } else {
      output += `<h1 class="center-head">Sales Records</h1><table class="table"><tr><th>Product</th><th>Quantity</th><th>Amount</th></tr>`;
      saleRecords.forEach(sale => {
        output += `<tr><td>${sale.product_name}</td><td>${
          sale.quantity
        }</td><td>${sale.total}</td></tr>`;
      });
      output += `</table>`;
      salesArea.innerHTML = output;
    }
  }
}
