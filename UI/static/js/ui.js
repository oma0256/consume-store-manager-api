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
      output += `<h1 class="center-head">Sales Records</h1><table class="table"><tr><th>Product</th><th>Quantity</th><th>Amount</th><th></th></tr>`;
      saleRecords.forEach(sale => {
        output += `<tr><td>${sale.product_name}</td><td>${
          sale.quantity
        }</td><td>${
          sale.total
        }</td><td><a href="sale-detail.html"><button class="sale-detail">View</button></a
      ><input type="hidden" value=${sale.id} id="sale-id"></td></tr>`;
      });
      output += `</table>`;
      salesArea.innerHTML = output;
    }
  }

  showSale(sale) {
    const saleDiv = document.querySelector("#sale-detail");
    let output = `<p>Product: ${sale.product_name}</p><p>Attendant: ${
      sale.attendant
    }</p><p>Quantity: ${sale.quantity}</p><p>Amount: ${sale.total}</p>`;
    saleDiv.innerHTML = output;
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

  showProduct(product) {
    let output = "";
    output += `<div id="desc-side"><p>Name: ${product.name}</p><p>Price: ${
      product.unit_cost
    }</p><p>Quantity: ${product.quantity}</p>`;
    if (product.category_id) {
      output += `<p>Category: ${product.category_id}</p>`;
    }
    if (isAdmin == "true") {
      output += `</div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
    } else {
      output += `</div><div id="btn-side"><a><button id="add-to-cart">Add to Cart</button></a></div>`;
    }
    const productArea = document.querySelector("#product-detail");
    productArea.innerHTML = output;
  }

  showEditProduct(varPro) {
    const editForm = document.querySelector("#product-edit");
    let output = "";
    output += `<label>Name</label><br><input type="text" id="product-name" value=${
      varPro.name
    }><label>Price</label><br><input type="number" id="product-price" value=${
      varPro.unit_cost
    }><label>Quantity</label><br><input type="number" id="product-quantity" value=${
      varPro.quantity
    }>`;
    if (varPro.category) {
      output += `><label>Category</label><br><input type="text" id="product-category" value=${
        varPro.category
      }>`;
    }
    output += `<button type="submit" class="modal-btn">Submit</button>`;
    editForm.innerHTML = output;
  }

  showAttendants(attendants) {
    const attendantsTable = document.querySelector(".table");
    let output = "";
    output += `<tr><th>Name</th><th>Email</th><th></th></tr>`;
    attendants.forEach(attendant => {
      output += `<tr><td>${attendant.first_name} ${
        attendant.last_name
      }</td><td>${
        attendant.email
      }</td><td><a href="attendant_profile.html"><button class="attendant-btn">View</button></a><input type="hidden" value=${
        attendant.id
      } id="attendant-id"></td></tr>`;
    });
    attendantsTable.innerHTML = output;
  }

  showAttendant(attendant) {
    const attendantProfile = document.querySelector("#attendant-profile");
    let output = `<p>Name: ${attendant.first_name} ${
      attendant.last_name
    }</p><p>Email: ${attendant.email}</p>`;
    if (attendant.is_admin) {
      output += `<button class="rights remove-admin">Remove Admin</button>`;
    } else {
      output += `<button class="rights make-admin">Make Admin</button>`;
    }
    attendantProfile.innerHTML = output;
  }

  editBtn(rightsBtn) {
    if (rightsBtn.textContent == "Make Admin") {
      rightsBtn.textContent = "Remove Admin";
      rightsBtn.style.backgroundColor = "#c82333";
    } else {
      rightsBtn.textContent = "Make Admin";
      rightsBtn.style.backgroundColor = "#4caf50";
    }
  }
}
