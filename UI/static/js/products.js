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
  ui.showAlert("Welcome", "msg-display success");
  localStorage.setItem("justLoggedIn", false);
}

if (deleted == "true") {
  ui.showAlert("Product deleted", "msg-display success");
  localStorage.setItem("deleted", false);
}

productMethod.displayProducts();

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
  productMethod.addProductFunc(productData);
};

if (isAdmin == "true") {
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
    // Store the product's id
    localStorage.setItem("productId", productId);
    if (isAdmin == "true") {
      window.location = "product-detail.html";
    } else {
      window.location = "product-detail.html";
    }
  }
};

productsContainer.addEventListener("click", storeProductId);

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
    window.location = "http://127.0.0.1:5500/UI/attendant/cart.html";
  }
};

productsArea.addEventListener("click", addToCart);
