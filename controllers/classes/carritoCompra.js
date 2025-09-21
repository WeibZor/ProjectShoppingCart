// Lista de productos (ejemplo con 4 de cada categoría)
const productos = {
  celulares: [
    { id: 1, nombre: "iPhone 14", precio: 1200 },
    { id: 2, nombre: "Samsung Galaxy S23", precio: 1100 },
    { id: 3, nombre: "Xiaomi 13", precio: 800 },
    { id: 4, nombre: "Motorola Edge", precio: 600 }
  ],
  laptops: [
    { id: 5, nombre: "MacBook Air", precio: 1500 },
    { id: 6, nombre: "Dell XPS 13", precio: 1400 },
    { id: 7, nombre: "HP Pavilion", precio: 900 },
    { id: 8, nombre: "Lenovo ThinkPad", precio: 1000 }
  ],
  consolas: [
    { id: 9, nombre: "PlayStation 5", precio: 700 },
    { id: 10, nombre: "Xbox Series X", precio: 650 },
    { id: 11, nombre: "Nintendo Switch", precio: 350 },
    { id: 12, nombre: "Steam Deck", precio: 500 }
  ]
};

// Guardar carrito en localStorage
function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}
function setCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  let carrito = getCarrito();
  let item = carrito.find(p => p.id === producto.id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  setCarrito(carrito);
  alert(`${producto.nombre} agregado al carrito!`);
}

// Renderizar productos en productos.html
function renderProductos() {
  if (document.getElementById("productos-celulares")) {
    productos.celulares.forEach(p => crearCard(p, "productos-celulares"));
    productos.laptops.forEach(p => crearCard(p, "productos-laptops"));
    productos.consolas.forEach(p => crearCard(p, "productos-consolas"));
  }
}

// Crear card
function crearCard(producto, contenedorId) {
  let container = document.getElementById(contenedorId);
  let div = document.createElement("div");
  div.className = "col-md-3";
  div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="img/${producto.id}.jpg" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Precio: $${producto.precio}</p>
        <button class="btn btn-primary" onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Agregar al carrito</button>
      </div>
    </div>
  `;
  container.appendChild(div);}

// Renderizar factura
function renderFactura() {
  if (document.getElementById("factura-body")) {
    let carrito = getCarrito();
    let facturaBody = document.getElementById("factura-body");
    let total = 0;
    carrito.forEach(p => {
      let subtotal = p.precio * p.cantidad;
      total += subtotal;
      facturaBody.innerHTML += `
        <tr>
          <td>${p.nombre}</td>
          <td>$${p.precio}</td>
          <td>${p.cantidad}</td>
          <td>$${subtotal}</td>
        </tr>
      `;
    });
    document.getElementById("factura-total").textContent = total;
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
  renderFactura();
});