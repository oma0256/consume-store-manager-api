const http = new Http();
const isAdmin = localStorage.getItem("isAdmin");

// Make a request to get all products
http
  .get("https://oma-store-manager-api.herokuapp.com/api/v2/products")
  .then(res => {
    // Check if request was successful
    if (res.status === 200) {
      const products = res.data.products;
      const productsArea = document.querySelector(".products");
      let output = "";
      // Check if there are products
      if (products.length < 1) {
        output += "<h2 class='center-head'>There are no products yet</h2>";
      } else {
        products.forEach(product => {
          if (isAdmin == "true") {
            output += `<div class="product"><div class="product-desc"><h2>${
              product.name
            }</h2><h3>Price: UGX ${
              product.unit_cost
            }</h3></div><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value=${
              product.id
            } id="product-id"></div>`;
          } else {
            output += `<div class="product"><div class="product-desc"><h2>${
              product.name
            }</h2><h3>Price: UGX ${
              product.unit_cost
            }</h3></div><a href="cart.html"><button class="add-to-cart">Add to Cart</button></a><a href="product-detail.html"><button class="product-detail">Details</button></a><input type="hidden" value=${
              product.id
            } id="product-id"></div>`;
          }
        });
      }
      // Add products to web page
      productsArea.innerHTML = output;
      // Run if products weren't fetched
    } else {
      if (isAdmin == "true") {
        window.location = "http://127.0.0.1:5500/UI/admin/login.html";
      } else {
        window.location = "http://127.0.0.1:5500/UI/attendant/login.html";
      }
    }
  });

// Function to store product id
const storeProductId = e => {
  e.preventDefault();
  // Check if details button has been clicked
  if (e.target.className == "product-detail") {
    // Get the product's id
    const productId = e.target.parentElement.nextElementSibling.value;
    // Store the product's id
    localStorage.setItem("productId", productId);
    if (isAdmin == "true") {
      window.location = "http://127.0.0.1:5500/UI/admin/product-detail.html";
    } else {
      window.location =
        "http://127.0.0.1:5500/UI/attendant/product-detail.html";
    }
  }
};

windows.addEventListener("click", storeProductId);
