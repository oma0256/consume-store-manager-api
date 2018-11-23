const handleUnauthorization = () => {
  localStorage.setItem("unauthorized", "true");
  if (isAdmin == "true") {
    window.location = "http://127.0.0.1:5500/UI/admin/login.html";
  } else {
    window.location = "http://127.0.0.1:5500/UI/attendant/login.html";
  }
};
