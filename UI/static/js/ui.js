class UI {
  showAlert(msg, className) {
    this.clearAlert();
    const parent = document.querySelector(".parent-alert");
    const child = document.querySelector(".child-alert");
    // Create error message div
    const alertBox = document.createElement("div");
    alertBox.className = className;
    alertBox.appendChild(document.createTextNode(msg));
    // Append error message to web page
    parent.insertBefore(alertBox, child);
    // Notification should disappear after 2.5s
    setTimeout(() => {
      this.clearAlert();
    }, 2500);
  }

  clearAlert() {
    const alertBox = document.querySelector(".msg-display");
    if (alertBox) {
      alertBox.remove();
    }
  }

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
