const handleUnauthorization = () => {
  localStorage.setItem("unauthorized", "true");
  window.location = "login.html";
};

// Function to store a sale's id
const handleStoreSaleId = saleDetail => {
  if (saleDetail.className == "sale-detail") {
    const saleId = saleDetail.parentElement.nextElementSibling.value;
    localStorage.setItem("saleId", saleId);
    window.location = "sale-detail.html";
  }
};
