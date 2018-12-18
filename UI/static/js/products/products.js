const http = new Http();
const ui = new UI();
const productMethod = new ProductMethod();
const isAdmin = localStorage.getItem("isAdmin");
const justLoggedIn = localStorage.getItem("justLoggedIn");
const productsArea = document.querySelector(".products");
const productsContainer = document.querySelector("#products-container-2");
const deleted = localStorage.getItem("deleted");
const productForm = document.querySelector("#product-form");

if (justLoggedIn == "true") {
  // Display message when user log's in
  ui.showAlert("Welcome", "msg-display success");
  localStorage.setItem("justLoggedIn", false);
}

if (deleted == "true") {
  // Display message if product was deleted
  ui.showAlert("Product deleted", "msg-display success");
  localStorage.setItem("deleted", false);
}

// Call function to make request to display all products
productMethod.displayProducts();

const addProduct = e => {
  e.preventDefault();
  const name = document.querySelector("#product-name").value;
  const unitCost = document.querySelector("#product-price").value;
  const quantity = document.querySelector("#product-quantity").value;
  const productData = {
    name: name,
    unit_cost: parseInt(unitCost),
    quantity: parseInt(quantity)
  };
  // Call function to make request to add product
  productMethod.addProductFunc(productData);
};

if (isAdmin == "true") {
  // Listen for from submission
  productForm.addEventListener("submit", addProduct);
}

// Function to store product id
const storeProductId = e => {
  e.preventDefault();
  if (e.target.className == "product-detail") {
    const productId = e.target.parentElement.nextElementSibling.value;
    localStorage.setItem("productId", productId);
    window.location = "product-detail.html";
  }
};

// Listen for click
productsContainer.addEventListener("click", storeProductId);

// Function to add product to cart
const addToCart = e => {
  e.preventDefault();
  if (e.target.className == "add-to-cart") {
    const productName =
      e.target.parentElement.parentElement.previousElementSibling.childNodes[0]
        .innerHTML;
    const productPrice =
      e.target.parentElement.parentElement.previousElementSibling.childNodes[1]
        .innerHTML;
    const productId = e.target.parentElement.previousElementSibling.value;
    const product = {
      productName: productName,
      productPrice: productPrice,
      productId: productId
    };
    localStorage.setItem("cart", JSON.stringify(product));
    window.location = "cart.html";
  }
};

// Listen for click
productsArea.addEventListener("click", addToCart);
