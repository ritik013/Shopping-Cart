// Function to create a cart item element
function createCartItem(product) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <div class="info">
      <div class="title">${product.title}</div>
      <div class="price">$${product.price}</div>
      <button class="remove-btn">Remove</button>
    </div>
  `;
  return cartItem;
}

// Function to populate the cart items
function populateCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = ""; // Clear existing content
  cartItems.forEach((product) => {
    const cartItem = createCartItem(product);
    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listener for the "Remove" button
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemTitle = button.parentElement.querySelector('.title').textContent;
      removeItemFromCart(itemTitle);
      populateCart(); // Update cart items after removal
      updateTotalAmount(); // Update total amount after removal
    });
  });

  // Update the total amount when the cart is populated
  updateTotalAmount();
}

// Function to remove an item from the cart
function removeItemFromCart(itemTitle) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCartItems = cartItems.filter(product => product.title !== itemTitle);
  localStorage.setItem('cart', JSON.stringify(updatedCartItems));
}

// Function to calculate the total amount of all products in the cart
function calculateTotal(cartItems) {
  let totalAmount = 0;
  cartItems.forEach((product) => {
    totalAmount += product.price;
  });
  return totalAmount.toFixed(2);
}

// Function to update the total amount in the checkout window
function updateTotalAmount() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const totalAmountSpan = document.getElementById('totalAmount');
  totalAmountSpan.textContent = calculateTotal(cartItems);
}

// Function to handle the click to checkout button
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
  //const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  var options = {
    key: "https://api.razorpay.com/v1", // Enter the Key ID generated from the Dashboard
    amount: 300 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
});
  // Your logic to handle the checkout process goes here
  // For example, redirect to a checkout page or display a confirmation message
   
  
  // Clear the cart after checkout

 /* localStorage.removeItem('cart');
  alert('Thank you for your purchase! Checkout functionality is not implemented in this demo.');

  // Update the cart content and total amount in the checkout window
  const cartItemsDiv = document.getElementById('cartItems');
  const totalAmountSpan = document.getElementById('totalAmount');
  cartItemsDiv.innerHTML = "";
  totalAmountSpan.textContent = "0";*/

  // Optionally, you can reset the filters and search in the shop to start a new shopping session
  // For example:
  // resetFilters();
  // performSearch('');
;

// Populate cart items when the page loads
document.addEventListener('DOMContentLoaded', () => {
  populateCart();
});
