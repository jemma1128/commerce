function enterStore() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
}

const products = [
    { name: "CELLPHONE", price: 5000, brand: "VIVO", image: "cp.png" },
    { name: "IPAD", price: 8000, brand: "Apple", image: "Ipad.png" },
    { name: "LAPTOP", price: 20000, brand: "Dell", image: "lap.png" },
    { name: "KEYBOARD", price: 5000, brand: "Logitech", image: "key.png" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price} - <strong>${product.brand}</strong></p>
            <img src="${product.image}" alt="${product.name}" width="250">
            <br>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(index) {
    const product = products[index];
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            ${item.name} (x${item.quantity}) - $${item.price * item.quantity} 
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPriceEl.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

displayProducts();
updateCart();
