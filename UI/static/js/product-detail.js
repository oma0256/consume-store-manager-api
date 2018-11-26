const http = new Http();
const ui = new UI();
const productMethod = new ProductMethod();
// Get product id
const productId = localStorage.getItem("productId");
const isAdmin = localStorage.getItem("isAdmin");
let output;
let varPro;

productMethod.displayProduct();

// Function to edit or delete product
const editDeleteProduct = e => {
  const editForm = document.querySelector("#product-edit");
  if (e.target.className == "modal-display") {
    ui.showEditProduct(varPro);
  }
  if (e.target.className == "modal-btn") {
    e.preventDefault();
    const productName = document.querySelector("#product-name").value;
    const productPrice = document.querySelector("#product-price").value;
    const productQuantity = document.querySelector("#product-quantity").value;
    const productData = {
      name: productName,
      unit_cost: parseInt(productPrice),
      quantity: parseInt(productQuantity)
    };
    productMethod.editProduct(productData);
  }
  if (e.target.className == "delete-btn") {
    productMethod.deleteProduct();
  }
};

window.addEventListener("click", editDeleteProduct);
