function addToCart(product) {
  let cart = getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  }
  saveCart(cart);
}

const emptyCartBtn = document.getElementById("empty-cart-button");
if (emptyCartBtn) {
  emptyCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  });
}

const clearCartBtn = document.getElementById("clear-all-button");
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

  localStorage.removeItem("cart");
  location.reload();
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

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
<li class="list-group-item d-flex align-items-center   ">
  <img src="${item.image}" alt="${item.name}" class=" m-3" style="width: 100px;" />
  
  <div class="">
    <h5 class="card-title h5">${item.name}</h5>
    <p class="card-text mb-0">Price: ${item.price}$</p>
    <p class="card-text mb-0">Quantity: 
      <button class="btn btn-primary btn-sm" id="add-btn-${item.id}">+</button>
      ${item.quantity}
      <button class="btn btn-primary btn-sm" id="subtract-btn-${item.id}">-</button>
      <button class="btn btn-primary btn-sm ms-2 btn-danger" id="remove-product-btn-${item.id}">Remove product</button>
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
      <div class="card text-bg-secondary mt-3 mb-3">
        <div class="card-body">
          <h2 class="card-title">Total Price: ${totalPrice.toFixed(2)}$</h2>
        </div>
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

