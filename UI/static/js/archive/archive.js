const productMethod = new ProductMethod();
const archiveBtn = document.querySelector("#archive");
const sale = new Sale();

productMethod.displayDeletedProducts();

const toggleArchieveHandler = e => {
  if (e.target.textContent == "Archived Sales") {
    sale.displayRevertedSales();
    e.target.textContent = "Archived Products";
  } else {
    productMethod.displayDeletedProducts();
    e.target.textContent = "Archived Sales";
  }
};

archiveBtn.addEventListener("click", toggleArchieveHandler);
