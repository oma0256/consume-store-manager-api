const handleUnauthorization = () => {
  localStorage.setItem("unauthorized", "true");
  const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin == "true") {
    window.location = "http://127.0.0.1:5500/UI/admin/login.html";
  } else {
    window.location = "http://127.0.0.1:5500/UI/attendant/login.html";
  }
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
