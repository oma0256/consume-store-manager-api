// Select button to display modal
const modalDisplayBtn = document.querySelector(".modal-display");
// Select close symbol
const close = document.querySelector(".close");
// Select modal
const modal = document.querySelector(".modal");

// Function called to close or display modal
const toggleModal = e => {
  if (e.target == modal || e.target == close) {
    modal.style.display = "none";
  }
  if (e.target.className == "modal-display") {
    modal.style.display = "block";
  }
};

// Listen for click on browser window
window.addEventListener("click", toggleModal);
