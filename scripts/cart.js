
//getData("https://dummyjson.com/products");
/*
async function getData(url) {
  let shop = document.getElementById("shop");
  shop.innerHTML = "<p>Loading products...</p>";
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    render(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    shop.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}
*/
/*
function render(data) {
  let shop = document.getElementById("shop");
  if (!shop) {
    console.error("Shop element not found");
    return;
  }

  const products = data.products;

  let output = "<div class='row row-cols-1 row-cols-md-3 g-4'>";

  products.forEach((product) => {
    output += `
    <div class="col">
      <div class="card h-100 text-center bg-light p-3">                 
          <img class="card-img-top" src="${product.images[0]}" alt="${product.title}" loading="lazy"/>
            
          <div class="card-body d-flex flex-column">
            <h2 class="card-title">${product.title}</h2>
            <p class="card-text">${product.description}</p>
          
            <div class="mt-auto">
              <p class="card-text">Price: ${product.price}$</p>
              <button type="button" class="btn btn-primary" data-action="buy" id="btn-${product.id}">Buy now</button>   
           </div>                
        </div>
      </div>
    </div>
    `;
  });

  output += "</div>";

  shop.innerHTML = output;

  products.forEach((product) => {
    const buyButton = document.getElementById(`btn-${product.id}`);

    if (buyButton) {
      buyButton.addEventListener("click", () => {
        addToCart(product);
      }
      );
    }
  });
}
*/

function addToCart(product) {
  let cart = getCart();

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // If the product is already in the cart, increase the quantity
    existingProduct.quantity += 1;
  } else {
    // If the product is not in the cart, add it as a new item
    cart.push({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  }

  // Save the updated cart back to localStorage
  saveCart(cart);

  //alert(`${product.title} added to cart!`);
}
/*
const cartBtn = document.getElementById("cart-button");
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}
*/

const emptyCartBtn = document.getElementById("empty-cart-button");
if (emptyCartBtn) {
  emptyCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  });
}

const clearCartBtn = document.getElementById("clear-cart-button");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    resetCart();
  });
}

function resetCart() {
  const form = document.querySelector("form");
  form.reset();

  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });

  localStorage.removeItem("cart"); // Clear localStorage when form is reset
  location.reload(); // Reload the page to reflect the cleared cart
}

/*
const shopBtn = document.getElementById("shop-button");
if (shopBtn) {
  shopBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
*/

// Get the existing cart from localStorage or initialize an empty array
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save the updated cart back to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("cart.html")) {
    renderCart();
  }
});

function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById("cart-container");
  let totalPrice = 0;

  console.log(cart.length);
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let output = `
  <div class='card'> 
    <ul class='list-group list-group-flush'>`;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    output += `
<li class="list-group-item d-flex align-item-center   ">
  <img src="${item.image}" alt="${item.name}" class=" m-3" style="width: 100px;" />
  
  <div class="">
    <h5 class="card-title h5">${item.name}</h5>
    <p class="card-text mb-0">Price: ${item.price}$</p>
    <p class="card-text mb-0">Quantity: 
      <button class="btn btn-primary btn-sm" id="add-btn-${item.id}">+</button>
      ${item.quantity}
      <button class="btn btn-primary btm-sm" id="subtract-btn-${item.id}">-</button>
      <button class="btn btn-primary btm-sm ms-2 btn-danger" id="remove-product-btn-${item.id}">Remove product</button>
      </p>
      <p class="card-text fw-bold">Total: ${itemTotal}$</p>
  </div>
</li>
    `;
  });

  output += `
    </ul>
  </div>
  `;

  output += `
      <div class="total-price mt-4 p-3 bg-secondary text-white rounded">
        <h2>Total Price: ${totalPrice.toFixed(2)}$</h2>
      </div>
    `;

  cartContainer.innerHTML = output;

  cart.forEach((item) => {
    let addButton = document.getElementById(`add-btn-${item.id}`);
    addButton.addEventListener("click", () =>
      updateQuantity(item.id, +1)
    );
    let subtractBtn = document.getElementById(`subtract-btn-${item.id}`);
    subtractBtn.addEventListener("click", () =>
      updateQuantity(item.id, -1)
    );
    let removeProductBtn = document.getElementById(`remove-product-btn-${item.id}`);
    removeProductBtn.addEventListener("click", () =>
      updateQuantity(item.id, -item.quantity)
    );
  });

}

function updateQuantity(productId, quantity) {
  let cart = getCart();

  const item = cart.find(product => product.id === productId)

  if (item) {
    item.quantity += quantity;
  }

  if (item && item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId)
  }

  saveCart(cart);

  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("cart.html")) {
    formValidation();
  }
});

function formValidation() {
  const form = document.querySelector("form");

  if (!form) {
    return; // Exit if form is not found
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const tel = document.querySelector("#tel");
    const streetAddress = document.querySelector("#street-address");
    const postalCode = document.querySelector("#postal-code");
    const city = document.querySelector("#city");

    let isValid = true; // Assume form is valid until proven otherwise

    // Name validation
    if (name.value.trim().length < 2 || name.value.trim().length > 50) {
      name.classList.add("is-invalid");
      name.classList.remove("is-valid");
      isValid = false;
    } else {
      name.classList.add("is-valid");
      name.classList.remove("is-invalid");
    }

    // Email validation
    if (
      !email.value.trim().includes("@") ||
      email.value.trim().length > 50 ||
      email.value.trim().length === 0
    ) {
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      isValid = false;
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
    }

    // Telephone validation
    const telRegex = /^[0-9\-\(\)]{1,20}$/;
    if (!telRegex.test(tel.value)) {
      tel.classList.add("is-invalid");
      tel.classList.remove("is-valid");
      isValid = false;
    } else {
      tel.classList.add("is-valid");
      tel.classList.remove("is-invalid");
    }

    // Street address validation
    if (
      streetAddress.value.trim().length < 2 ||
      streetAddress.value.trim().length > 50 ||
      streetAddress.value.trim().length === 0
    ) {
      streetAddress.classList.add("is-invalid");
      streetAddress.classList.remove("is-valid");
      isValid = false;
    } else {
      streetAddress.classList.add("is-valid");
      streetAddress.classList.remove("is-invalid");
    }

    // Postal code validation
    const postalCodeRegex = /^[0-9]{5}$/;
    if (!postalCodeRegex.test(postalCode.value)) {
      postalCode.classList.add("is-invalid");
      postalCode.classList.remove("is-valid");
      isValid = false;
    } else {
      postalCode.classList.add("is-valid");
      postalCode.classList.remove("is-invalid");
    }

    // City validation
    if (city.value.trim().length < 2 || city.value.trim().length > 20) {
      city.classList.add("is-invalid");
      city.classList.remove("is-valid");
      isValid = false;
    } else {
      city.classList.add("is-valid");
      city.classList.remove("is-invalid");
    }

    if (isValid) {
      alert(`
Your order has been placed successfully! 
${getReceipt()}
Email: ${email.value} 
Telephone: ${tel.value}
Street Address: ${streetAddress.value}
Postal Code: ${postalCode.value}
City: ${city.value}
        `);
      resetCart();
    }
    if (!isValid) {
      alert(`Please correct the errors in the form before submitting.`);
    }
  });
}

function getReceipt() {

  const cart = getCart();
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let output = "";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    output += `      
Product name: ${item.name}
Quantity: ${item.quantity}
Price: ${itemTotal.toFixed(2)} 
`;
  });

  output += `
Total: ${totalPrice.toFixed(2)}
  `
  return output;
}

//formValidation();
