const http = new Http();
// Get product id
const productId = localStorage.getItem("productId");
const isAdmin = localStorage.getItem("isAdmin");
let output;

// Make request to get a single product
http
  .get(
    `https://oma-store-manager-api.herokuapp.com/api/v2/products/${productId}`
  )
  .then(res => {
    // Check if product was fetched
    if (res.status === 200) {
      product = res.data.product;
      if (isAdmin == "true") {
        output = `<div id="desc-side"><p>Name: ${product.name}</p><p>Price: ${
          product.unit_cost
        }</p><p>Quantity: ${
          product.quantity
        }</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
        if (product.category) {
          output = "";
          output = `<div id="desc-side"><p>Name: ${product.name}</p><p>Price: ${
            product.unit_cost
          }</p><p>Quantity: ${product.quantity}</p><p>Category: ${
            product.category
          }</p></div><div id="btn-side"><button id="edit-btn" class="modal-display">Edit</button><a><button class="delete-btn">Delete</button></a></div>`;
        }
      } else {
        output = `<div id="desc-side"><p>Name: ${product.name}</p><p>Price: ${
          product.unit_cost
        }</p><p>Quantity: ${
          product.quantity
        }</p></div><div id="btn-side"><button id="add-to-cart">Add to Cart</button></div>`;
        if (product.category) {
          output = "";
          output = `<div id="desc-side"><p>Name: ${product.name}</p><p>Price: ${
            product.unit_cost
          }</p><p>Quantity: ${product.quantity}</p><p>Category: ${
            product.category
          }</p></div><div id="btn-side"><button id="add-to-cart">Add to Cart</button><a></div>`;
        }
      }
      const productArea = document.querySelector("#product-detail");
      productArea.innerHTML = output;
    } else {
      if (isAdmin == "true") {
        window.location = "http://127.0.0.1:5500/UI/admin/login.html";
      } else {
        window.location = "http://127.0.0.1:5500/UI/attendant/login.html";
      }
    }
  });
