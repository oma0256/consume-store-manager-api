class UI {
  // Method to display notification on web page
  showAlert(msg, className) {
    this.clearAlert();
    const parent = document.querySelector(".parent-alert");
    const child = document.querySelector(".child-alert");
    const alertBox = document.createElement("div");
    alertBox.className = className;
    alertBox.textContent = msg;
    parent.insertBefore(alertBox, child);
    setTimeout(() => {
      this.clearAlert();
    }, 2500);
  }

  // Method to remove notification from web page
  clearAlert() {
    const alertBox = document.querySelector(".msg-display");
    if (alertBox) {
      alertBox.remove();
    }
  }

  // Method to display sale records to the web page
  showSales(saleRecords) {
    const salesArea = document.querySelector("#sale-records");
    let output = "";
    if (saleRecords.length < 1) {
      output += "<h2 class='center-head'>No sales have been made yet</h2>";
    } else {
      output += `<h1 class="center-head">Sales Records</h1><table class="table"><tbody><tr><th>Product</th><th>Quantity</th><th>Amount</th><th></th></tr>`;
      saleRecords.forEach(sale => {
        output += `<tr><td>${sale.product_name}</td><td>${
          sale.quantity
        }</td><td>${
          sale.total
        }</td><td><a href="sale-detail.html"><button class="sale-detail">View</button></a
      ><input type="hidden" value=${sale.id} id="sale-id"></td></tr>`;
      });
      output += `</tbody></table>`;
    }
    salesArea.innerHTML = output;
  }

  showRevertedSales(sales) {
    const salesArea = document.querySelector(".products-archive");
    let output = "";
    if (sales.length < 1) {
      output +=
        "<h2 class='center-head'>There are no sales in the archive yet</h2>";
    } else {
      output += `<h1 class="center-head">Archived Sales</h1><table class="table"><tbody><tr><th>Product</th><th>Quantity</th><th>Amount</th><th>Attendant</th></tr>`;
      sales.forEach(sale => {
        output += `<tr><td>${sale.product_name}</td><td>${
          sale.quantity
        }</td><td>${sale.total}</td><td>${sale.attendant}</td></tr>`;
      });
      output += `</tbody></table>`;
    }
    salesArea.innerHTML = output;
  }

  // Method to display a single sale record to the web page
  showSale(sale) {
    const saleDiv = document.querySelector("#sale-detail");
    const isAdmin = localStorage.getItem("isAdmin");
    let output = `<p>Product: ${sale.product_name}</p><p>Attendant: ${
      sale.attendant
    }</p><p>Quantity: ${sale.quantity}</p><p>Amount: ${sale.total}</p>`;
    if (isAdmin == "true" && sale.revert === false) {
      output += `<button class="revert-sale">Revert a Sale</button>`;
    }
    saleDiv.innerHTML = output;
  }

  // Method to display products to the web page
  showProducts(products) {
    const productsArea = document.querySelector(".products");
    const isAdmin = localStorage.getItem("isAdmin");
    let output = "";
    if (products.length < 1) {
      output += "<h2 class='center-head'>There are no products yet</h2>";
    } else {
      products.forEach(product => {
        output += `<div class="product"><div class="product-desc"><h2>${
          product.name
        }</h2><h3>${
          product.unit_cost
        }</h3></div><div class="product-buttons"><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value=${
          product.id
        } id="product-id">`;
        if (isAdmin == "false") {
          output += `<a href="cart.html"><button class="add-to-cart">Add to Cart</button></a>`;
        }
        output += `</div></div>`;
      });
    }
    productsArea.innerHTML = output;
  }

  // Method to display deleted products
  showDeletedProducts(products) {
    const productsArea = document.querySelector(".products-archive");
    let output = "";
    if (products.length < 1) {
      output +=
        "<h2 class='center-head'>There are no products in the archive yet</h2>";
    } else {
      output += `<h1 class="center-head">Archived Products</h1><table class="table"><tbody><tr><th>Product</th><th>Quantity</th><th>Amount</th></tr>`;
      products.forEach(product => {
        output += `<tr><td>${product.name}</td><td>${
          product.quantity
        }</td><td>${product.unit_cost}</td></tr>`;
      });
      output += `</tbody></table>`;
    }
    productsArea.innerHTML = output;
  }

  // Method to display single product to web page
  showProduct(product) {
    const isAdmin = localStorage.getItem("isAdmin");
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

  // Method that populates edit form with the product's details
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
    if (varPro.category_id) {
      output += `<label>Category</label><br><input type="text" id="product-category" value=${
        varPro.category_id
      }>`;
    }
    output += `<button type="submit" class="modal-btn">Submit</button>`;
    editForm.innerHTML = output;
  }

  // Method to display store attendants to web page
  showAttendants(attendants) {
    const attendantsTable = document.querySelector(".table");
    let output = "";
    if (attendants.length < 1) {
      output += "<h2 class='center-head'>There are no store attendants</h2>";
    } else {
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
    }
    attendantsTable.innerHTML = output;
  }

  // Method to display single store attendant to web page
  showAttendant(attendant, saleRecords) {
    const isAdmin = localStorage.getItem("isAdmin");
    const attendantProfile = document.querySelector("#attendant-profile");
    let output = `<p>Name: ${attendant.first_name} ${
      attendant.last_name
    }</p><p>Email: ${attendant.email}</p>`;
    if (isAdmin == "true") {
      if (attendant.is_admin) {
        output += `<button class="rights remove-admin">Remove Admin</button>`;
      } else {
        output += `<button class="rights make-admin">Make Admin</button>`;
      }
    }
    attendantProfile.innerHTML = output;
    this.showSales(saleRecords);
  }

  // Method to toggle button for changing attendant's rights
  editBtn(rightsBtn) {
    if (rightsBtn.textContent == "Make Admin") {
      rightsBtn.textContent = "Remove Admin";
      rightsBtn.style.backgroundColor = "#c82333";
    } else {
      rightsBtn.textContent = "Make Admin";
      rightsBtn.style.backgroundColor = "#4caf50";
    }
  }

  // Method to display cart items
  showCart(product) {
    const cart = document.querySelector("#cart");
    if (product == "empty") {
      cart.innerHTML = `<h2>Cart is empty, go to <a href="products.html" id="link-color">products</a> to make more sales</h2>`;
    } else {
      product = JSON.parse(product);
      cart.innerHTML = `<div class="cart-item"><div class="product-side"><h3>${
        product.productName
      }</h3></div><div class="quantity-side"><input type="hidden" value="1"><input type="number" value="1" class="quantity"></div><div class="price-side"><p>${
        product.productPrice
      }</p></div><div class="remove-side"><button class="remove-from-cart">Remove</button></div></div><strong>Total:</strong> <span id="total">${
        product.productPrice
      }</span>`;
    }
  }
}
