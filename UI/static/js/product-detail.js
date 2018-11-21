const http = new Http();
// Get product id
const productId = localStorage.getItem("productId");
const isAdmin = localStorage.getItem("isAdmin");
let output;
let varPro;

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
      varPro = product;
    } else {
      if (isAdmin == "true") {
        window.location = "http://127.0.0.1:5500/UI/admin/login.html";
      } else {
        window.location = "http://127.0.0.1:5500/UI/attendant/login.html";
      }
    }
  });

// Function to edit or delete product
const editDeleteProduct = e => {
  const editForm = document.querySelector("#product-edit");
  if (e.target.className == "modal-display") {
    if (varPro.category) {
      output = `<label>Name</label><br><input type="text" id="product-name" value=${
        varPro.name
      }><label>Price</label><br><input type="number" id="product-price" value=${
        varPro.unit_cost
      }><label>Quantity</label><br><input type="number" id="product-quantity" value=${
        varPro.quantity
      }><label>Category</label><br><input type="text" id="product-category" value=${
        varPro.category
      }><button type="submit" class="modal-btn">Submit</button>`;
    }
    output = `<label>Name</label><br><input type="text" id="product-name" value=${
      varPro.name
    }><label>Price</label><br><input type="number" id="product-price" value=${
      varPro.unit_cost
    }><label>Quantity</label><br><input type="number" id="product-quantity" value=${
      varPro.quantity
    }><label>Category</label><br><input type="text" id="product-category" value="Select a Category"><button type="submit" class="modal-btn">Submit</button>`;
    editForm.innerHTML = output;
  }
  if (e.target.className == "modal-btn") {
    e.preventDefault();
    const productName = document.querySelector("#product-name").value;
    const productPrice = document.querySelector("#product-price").value;
    const productQuantity = document.querySelector("#product-quantity").value;
    const productCategory = document.querySelector("#product-category").value;
    const productData = {
      name: productName,
      unit_cost: parseInt(productPrice),
      quantity: parseInt(productQuantity)
    };
    if (productCategory != "Select a Category") {
      productData["category"] = productCategory;
    }
    http
      .put(
        `https://oma-store-manager-api.herokuapp.com/api/v2/products/${productId}`,
        productData
      )
      .then(res => {
        if (res.status == 200) {
          editForm.submit();
        }
      });
  }
  if (e.target.className == "delete-btn") {
    http
      .delete(
        `https://oma-store-manager-api.herokuapp.com/api/v2/products/${productId}`
      )
      .then(res => {
        if (res.status == 200) {
          window.location = "http://127.0.0.1:5500/UI/admin/products.html";
        }
      });
  }
};

window.addEventListener("click", editDeleteProduct);
