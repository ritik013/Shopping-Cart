// Function to create a product card element
function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("item");
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}" />
    <div class="info">
      <div class="title">${product.title}</div>
      <div class="row">
        <div class="price">$${product.price}</div>
        <div class="sized">${product.category === "jewelery" ? "Size" : "S,M,L"}</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          ${product.category === "jewelery" ? "" : `
            <div class="circle" style="background-color: #000"></div>
            <div class="circle" style="background-color: #4938af"></div>
            <div class="circle" style="background-color: #203d3e"></div>
          `}
        </div>
      </div>
      <div class="row">Rating: ${product.rating.rate}</div>
    </div>
    <button class="add-to-cart-btn">Add to Cart</button>
  `;
  return productCard;
}

// Function to add a product to the cart
function addToCart(product, button) {
  // Get the existing cart items from local storage or create an empty array
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Add the product to the cart
  cartItems.push(product);

  // Save the updated cart items back to local storage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Update the button text to "Added to Cart"
  button.textContent = "Added to Cart";
  button.disabled = true;
}

// Function to populate a section with products
function populateSection(sectionId, products) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.innerHTML = ""; // Clear existing content
    products.forEach((product) => {
      const productCard = createProductCard(product);
      section.appendChild(productCard);
    });
  }
}

// Fetch the JSON data and populate sections
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Store the data in a global variable for later use
    window.data = data;

    const menClothing = data.filter(product => product.category === "men's clothing");
    const womenClothing = data.filter(product => product.category === "women's clothing");
    const jewellery = data.filter(product => product.category === "jewelery");
    const electronics = data.filter(product => product.category === "electronics");

    populateSection("menClothingItems", menClothing);
    populateSection("womenClothingItems", womenClothing);
    populateSection("jewelleryItems", jewellery);
    populateSection("electronicsItems", electronics);

    // Filter functionality
    const filters = document.querySelectorAll(".filter");
    filters.forEach(filter => {
      filter.addEventListener("click", () => {
        const category = filter.getAttribute("data-category");
        if (category === "all") {
          showAllSections();
        } else {
          hideSectionsExcept(category);
        }

        // Toggle active class on selected filter
        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");
      });
    });

    // Search functionality
    const searchInput = document.querySelector("input[type='text']");
    searchInput.addEventListener("input", () => {
      const searchText = searchInput.value.trim();
      if (searchText === "") {
        // If the search bar is cleared, reset the sections
        resetSections();
      } else {
        performSearch(searchText);
      }
    });
  })
  .catch((error) => console.log("Error fetching JSON data:", error));

// Function to hide all sections except the one specified by the category
function hideSectionsExcept(category) {
  const sections = document.querySelectorAll("main-content section");
  sections.forEach(section => {
    if (section.id === category + "Items") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Function to show all sections
function showAllSections() {
  const sections = document.querySelectorAll("main-content section");
  sections.forEach(section => {
    section.style.display = "block";
  });
}

// ...

// Add event listener for the "Add to Cart" button
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the product details from the card (you can customize this based on your product card structure)
    const productTitle = button.parentElement.querySelector('.title').textContent;
    const productPrice = parseFloat(button.parentElement.querySelector('.price').textContent.replace('$', ''));

    // Create an object representing the product
    const product = {
      title: productTitle,
      price: productPrice,
    };

    // Add the product to the cart and update the button text
    addToCart(product, button);
  });
});

// ...















































// Function to perform search and display matching products
function performSearch(searchText) {
  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );
  populateSection("menClothingItems", filteredProducts);
  populateSection("womenClothingItems", filteredProducts);
  populateSection("jewelleryItems", filteredProducts);
  populateSection("electronicsItems", filteredProducts);
}

// Function to reset all sections to their original state
function resetSections() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const menClothing = data.filter(product => product.category === "men's clothing");
      const womenClothing = data.filter(product => product.category === "women's clothing");
      const jewellery = data.filter(product => product.category === "jewelery");
      const electronics = data.filter(product => product.category === "electronics");

      populateSection("menClothingItems", menClothing);
      populateSection("womenClothingItems", womenClothing);
      populateSection("jewelleryItems", jewellery);
      populateSection("electronicsItems", electronics);
    })
    .catch((error) => console.log("Error fetching JSON data:", error));
}

// Fetch the JSON data and populate sections
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Store the data in a global variable for later use
    window.data = data;

    const menClothing = data.filter(product => product.category === "men's clothing");
    const womenClothing = data.filter(product => product.category === "women's clothing");
    const jewellery = data.filter(product => product.category === "jewelery");
    const electronics = data.filter(product => product.category === "electronics");

    populateSection("menClothingItems", menClothing);
    populateSection("womenClothingItems", womenClothing);
    populateSection("jewelleryItems", jewellery);
    populateSection("electronicsItems", electronics);

    // Filter functionality
    const filters = document.querySelectorAll(".filter");
    filters.forEach(filter => {
      filter.addEventListener("click", () => {
        const category = filter.getAttribute("data-category");
        if (category === "all") {
          showAllSections();
        } else {
          hideSectionsExcept(category);
        }

        // Toggle active class on selected filter
        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");
      });
    });

    // Search functionality
    const searchInput = document.querySelector("input[type='text']");
    searchInput.addEventListener("input", () => {
      const searchText = searchInput.value.trim();
      if (searchText === "") {
        // If the search bar is cleared, reset the sections
        resetSections();
      } else {
        performSearch(searchText);
      }
    });
  })
  .catch((error) => console.log("Error fetching JSON data:", error));

// ...














