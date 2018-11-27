const handleUnauthorization = () => {
  localStorage.setItem("unauthorized", "true");
  window.location = "login.html";
};

const handleStoreSaleId = saleDetail => {
  // Check if details button has been clicked
  if (saleDetail.className == "sale-detail") {
    // Get the product's id
    const saleId = saleDetail.parentElement.nextElementSibling.value;
    // Store the product's id
    localStorage.setItem("saleId", saleId);
    window.location = "sale-detail.html";
  }
};
