// Select cart
const makeSaleBtn = document.querySelector("#make-sale");
let product = localStorage.getItem("cart");
const ui = new UI();
const sale = new Sale();

// Display product in cart
ui.showCart(product);

const calculateCartAmount = (price, e) => {
  // Select cart item
  const cartItem = e.target.parentElement.parentElement;
  // Remove item from cart
  cartItem.style.display = "none";
  let totalAmount =
    e.target.parentElement.parentElement.nextElementSibling.nextElementSibling
      .textContent;
  // Recalculate the total amount of the remaining cart items
  totalAmount = parseInt(totalAmount) - parseInt(price);
  total.textContent = totalAmount;
};

// Call function if cart is clicked
const removeItem = e => {
  // Execute the code if remove button is clicked
  if (e.target.classList.contains("remove-from-cart")) {
    // Select price of the cart item
    const price = e.target.parentElement.previousElementSibling.textContent;
    // Call function to calculate the total in cart
    calculateCartAmount(price, e);
  }
};

// Call function if cart changes
const updateCart = e => {
  // Execute code if quantity of a cart item changes
  if (e.target.classList.contains("quantity")) {
    // Execute code if value of quantity is less than 1
    if (e.target.value < 1) {
      // Select price of the cart item
      const price = e.target.parentElement.nextElementSibling.textContent;
      // Call function to calculate the total in cart
      calculateCartAmount(price, e);
    }
    // Execute code if value of quantity is greater than 1
    else {
      // Select the quantity of the cart item
      const currentQty = e.target.value;
      // Select the quantity value that has been changed from
      const previousQty = e.target.previousElementSibling;
      // Select price of the cart item
      const price = e.target.parentElement.nextElementSibling;
      // Get unit amount of the cart item
      const productAmount =
        parseInt(price.textContent) / parseInt(previousQty.value);
      // Calculate the amount of the cat item
      const cartItemAmount = parseInt(currentQty) * productAmount;
      // Calculate the total amount of all the cart items
      let totalAmount =
        e.target.parentElement.parentElement.nextElementSibling
          .nextElementSibling.textContent;
      totalAmount =
        parseInt(totalAmount) - parseInt(price.textContent) + cartItemAmount;
      price.textContent = cartItemAmount;
      previousQty.value = currentQty;
      total.textContent = totalAmount;
    }
  }
};

const makeSale = e => {
  e.preventDefault();
  const quantity = document.querySelector(".quantity").value;
  product = JSON.parse(product);
  const saleData = {
    product_id: parseInt(product.productId),
    quantity: parseInt(quantity)
  };
  // Make a sale
  sale.makeASale(saleData);
};

// Listen for a click on cart
cart.addEventListener("click", removeItem);
// List for a change on cart
cart.addEventListener("change", updateCart);
// Listen for click
makeSaleBtn.addEventListener("click", makeSale);
