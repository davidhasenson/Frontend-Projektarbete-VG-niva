fetch('https://dummyjson.com/products?limit=21')
  .then((response) => response.json())
  .then((data) => {
    
    const products = data.products;
    console.log(products);
    const container = document.getElementById("products");

    products.forEach((product) => {
      const div = document.createElement("div");
      div.className = "col";
      div.innerHTML = `
       <div class="card h-100 text-center bg-light">
       <img src="${product.images[0]}" class="card-img-top p-3 product-img"  style="height: 200px; object-fit: contain;
       transition: transform 0.3s;">
       <div class="card-body d-flex flex-column"> 
       <h5 class ="card-title"> ${product.title}</h5>
       <p class = "card-description"> ${product.description}</p>
    
        <p class ="card-text mt-auto">${product.price} USD</p>
        <button class="btn btn-primary order-button">Add to cart</button>
        </div>
        </div>

      `;

      // image hover effect
      const img = div.querySelector(".product-img");
      img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.1)";
      });
      img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)";
      });

      // order button hover effect
      const orderButton = div.querySelector(".order-button");
      orderButton.addEventListener("mouseover", () => {
        orderButton.style.backgroundColor = "#0056b3";
        orderButton.style.transform = "scale(1.05)";
      });
      orderButton.addEventListener("mouseout", () => {
        orderButton.style.backgroundColor = "#007bff";
        orderButton.style.transform = "scale(1)";
      });

      orderButton.addEventListener("click", () => {
        addToCart(product);
      });

      container.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });

  

