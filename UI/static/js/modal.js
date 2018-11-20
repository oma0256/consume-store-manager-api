// Select button to display modal
const modalDisplayBtn = document.querySelector(".modal-display");
// Select close symbol
const close = document.querySelector(".close");
// Select modal
const modal = document.querySelector(".modal");

// Listen for click on button to display modal
modalDisplayBtn.addEventListener("click", displayModal);
// Listen for click on close symbol
close.addEventListener("click", closeModal);
// Listen for click on browser window
window.addEventListener("click", closeModalAgain);

// Function to display modal
function displayModal(e){
  modal.style.display = "block";
}

// Function called to close modal when the close symbol is clicked
function closeModal(e){
  modal.style.display = "none";
}

// Function called to close modal when the browser window is clicked
function closeModalAgain(e){
  if(e.target == modal){
    modal.style.display = "none";
  }
}
