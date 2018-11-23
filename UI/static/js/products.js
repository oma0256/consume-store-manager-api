const http = new Http();
const ui = new UI();
const isAdmin = localStorage.getItem("isAdmin");
const justLoggedIn = localStorage.getItem("justLoggedIn");

if (justLoggedIn == "true") {
  ui.showAlert("Welcome", "msg-display success");
  localStorage.setItem("justLoggedIn", false);
}

// Make a request to get all products
http
  .get("https://oma-store-manager-api.herokuapp.com/api/v2/products")
  .then(res => {
    // Check if request was successful
    if (res.status === 200) {
      const products = res.data.products;
      ui.showProducts(products);
      // Run if products weren't fetched
    } else {
      localStorage.setItem("unauthorized", "true");
      if (isAdmin == "true") {
        window.location = "http://127.0.0.1:5500/UI/admin/login.html";
      } else {
        window.location = "http://127.0.0.1:5500/UI/attendant/login.html";
      }
    }
  });

// Function to add a product
const addProduct = e => {
  e.preventDefault();
  // Select product attributes
  const name = document.querySelector("#product-name").value;
  const unitCost = document.querySelector("#product-price").value;
  const quantity = document.querySelector("#product-quantity").value;
  const category = document.querySelector("#product-category").value;
  const productData = {
    name: name,
    unit_cost: parseInt(unitCost),
    quantity: parseInt(quantity),
    category_id: category
  };
  // Make a request to add a product
  http
    .post(
      "https://oma-store-manager-api.herokuapp.com/api/v2/products",
      productData
    )
    .then(function(res) {
      if (res.status === 201) {
        productForm.submit();
      }
    });
};

if (isAdmin == "true") {
  const productForm = document.querySelector("#product-form");
  // Listen for from submission
  productForm.addEventListener("submit", addProduct);
}

// Function to store product id
const storeProductId = e => {
  e.preventDefault();
  // Check if details button has been clicked
  if (e.target.className == "product-detail") {
    // Get the product's id
    const productId = e.target.parentElement.nextElementSibling.value;
    console.log(productId);
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

window.addEventListener("click", storeProductId);

const addToCart = e => {
  e.preventDefault();
  if (e.target.className == "add-to-cart") {
    const productName =
      e.target.parentElement.previousElementSibling.childNodes[0].innerHTML;
    const productPrice =
      e.target.parentElement.previousElementSibling.childNodes[1].innerHTML;
    const productId =
      e.target.parentElement.nextElementSibling.nextElementSibling.value;
    const product = {
      productName: productName,
      productPrice: productPrice,
      productId: productId
    };
    localStorage.setItem("cart", JSON.stringify(product));
  }
};

productsArea.addEventListener("click", addToCart);
