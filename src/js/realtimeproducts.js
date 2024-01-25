const socket = io();

socket.on("updateProducts", (updatedProducts) => {
  updateProductList(updatedProducts);
});

// Evento para agregar producto
document.getElementById("addProduct").addEventListener("submit", () => {
});


function updateProductList() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.code} - ${product.title} - ${product.description} - ${product.price} - ${product.stock}`;

    productList.appendChild(listItem);
  });
}
