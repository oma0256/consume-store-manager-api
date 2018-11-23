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

  showProducts(products) {
    const productsArea = document.querySelector(".products");
    const isAdmin = localStorage.getItem("isAdmin");
    let output = "";
    // Check if there are products
    if (products.length < 1) {
      output += "<h2 class='center-head'>There are no products yet</h2>";
    } else {
      products.forEach(product => {
        output += `<div class="product"><div class="product-desc"><h2>${
          product.name
        }</h2><h3>${
          product.unit_cost
        }</h3></div><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value=${
          product.id
        } id="product-id"></div>`;
        if (isAdmin == "false") {
          output += `<a href="cart.html"><button class="add-to-cart">Add to Cart</button></a>`;
        }
      });
    }
    // Add products to web page
    productsArea.innerHTML = output;
  }
}
