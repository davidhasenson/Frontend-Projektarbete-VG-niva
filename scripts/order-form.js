function formValidation() {
  console.log("order-form.js loaded");
  const form = document.querySelector("form");

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
      alert(
        "Your order has been placed successfully! " +
          "\nProduct: " +
          savedProductName +
          "\nName: " +
          name.value +
          "\nEmail: " +
          email.value +
          "\nTelephone: " +
          tel.value +
          "\nStreet Address: " +
          streetAddress.value +
          "\nPostal Code: " +
          postalCode.value +
          "\nCity: " +
          city.value,
      );
      form.reset();
    }
    if (!isValid) {
      alert("Please correct the errors in the form before submitting.");
    }
  });
}

/*const savedProductId = localStorage.getItem("selectedProductId");
if (savedProductId) {
  document.getElementById("product").value = savedProductId;
}*/
const savedProductName = localStorage.getItem("selectedProductName") || "Unknown Product";
if (savedProductName) {
  document.getElementById("product-name").value = savedProductName;
}

formValidation();
