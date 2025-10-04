// =========================
//   GESTIÓN DE CLIENTES
// =========================
function cargarClientes() {
    return JSON.parse(localStorage.getItem("clientes")) || [];
}
function guardarClientes(clientes) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}
function guardarClienteActual(cliente) {
    localStorage.setItem("clienteActual", JSON.stringify(cliente));
}
function obtenerClienteActual() {
    return JSON.parse(localStorage.getItem("clienteActual")) || null;
}
function cerrarSesion() {
    localStorage.removeItem("clienteActual");
    Swal.fire({
        icon: "info",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente"
    }).then(() => window.location.href = "index.html");
}

let clientes = cargarClientes();
let clienteActual = obtenerClienteActual();

// =========================
//   REGISTRO DE USUARIO
// =========================
document.getElementById("formRegistro")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const usuario = document.getElementById("newUsuario").value.trim();
    const contrasena = document.getElementById("newPassword").value.trim();

    if (clientes.some(c => c.usuario === usuario)) {
        Swal.fire({ icon: "error", title: "Usuario existente", text: "Elige otro nombre de usuario" });
        return;
    }

    const nuevo = new Cliente(nombre, correo, direccion, usuario, contrasena);
    nuevo.registrar(clientes);
    guardarClientes(clientes);
    guardarClienteActual(nuevo);

    Swal.fire({ icon: "success", title: "Registro exitoso", text: `Bienvenido ${nombre}` })
        .then(() => window.location.href = "catalogo.html");
});

// =========================
//   LOGIN CON 3 INTENTOS
// =========================
document.getElementById("formLogin")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    let cliente = clientes.find(c => c.usuario === usuario);

    if (!cliente) {
        Swal.fire({ icon: "error", title: "Error", text: "Usuario no encontrado" });
        return;
    }

    cliente = Object.assign(new Cliente(), cliente);
    const resultado = cliente.iniciarSesion(password);

    if (resultado.exito) {
        guardarClienteActual(cliente);
        guardarClientes(clientes);
        Swal.fire({ icon: "success", title: "Bienvenido", text: resultado.mensaje })
            .then(() => window.location.href = "catalogo.html");
    } else {
        guardarClientes(clientes);
        Swal.fire({ icon: "error", title: "Acceso denegado", text: resultado.mensaje });
    }
});

// =========================
//   MODIFICAR DATOS
// =========================
function modificarDatosCliente(nuevosDatos) {
    if (!clienteActual) return;
    clienteActual = Object.assign(new Cliente(), clienteActual);
    clienteActual.modificarDatos(nuevosDatos);

    clientes = clientes.map(c => c.usuario === clienteActual.usuario ? clienteActual : c);
    guardarClientes(clientes);
    guardarClienteActual(clienteActual);

    Swal.fire({ icon: "success", title: "Datos actualizados", text: "Tu perfil fue modificado correctamente" });
}

// =========================
//   PROTEGER PÁGINAS INTERNAS
// =========================
function protegerPagina() {
    if (!obtenerClienteActual()) {
        Swal.fire({ icon: "warning", title: "Acceso denegado", text: "Primero inicia sesión" })
            .then(() => window.location.href = "index.html");
    }
}

// =========================
//   PRODUCTOS
// =========================
const productos = [
    { id: 1, nombre: "Laptop Acer Aspire", descripcion: "Ligera y rápida, ideal para estudiantes", detalle: "Intel i5 · 8GB RAM · 512GB SSD", precio: 1200, imagen: "laptop-acer.jpg" },
    { id: 2, nombre: "MacBook Pro 14", descripcion: "Potente y profesional para diseño y desarrollo", detalle: "M2 Pro · 16GB RAM · 1TB SSD", precio: 2500, imagen: "macbook-pro.jpg" },
    { id: 3, nombre: "iPhone 14", descripcion: "Última generación Apple", detalle: "iOS · Pantalla 6.1\" · Cámara 12MP", precio: 999, imagen: "iphone14.jpg" },
    { id: 4, nombre: "Samsung Galaxy S23", descripcion: "Tope de gama Android, gran rendimiento y cámara", detalle: "Android · Pantalla 6.8\" · Cámara 50MP", precio: 850, imagen: "samsung-s23.jpg" },
    { id: 5, nombre: "Teclado Mecánico RGB",descripcion: "Resistente, ergonómico y retroiluminado.",detalle: "Switches azules - Cable USB",precio: 80,imagen: "keyboard-mechanical.jpg"},
    { id: 6, nombre: "Audífonos Gamer", descripcion: "Sonido envolvente con cancelación de ruido", detalle: "Auriculares Bluetooth", precio: 150, imagen: "headphones-black.jpg" },
    { id: 7, nombre: "Mouse Logitech", descripcion: "Mouse inalámbrico ergonómico", detalle: "Tipo: Mouse", precio: 50, imagen: "mouse-wireless.jpg" },
    { id: 8, nombre: "Monitor 27\"",descripcion: "Resolución 4K UHD con gran calidad de color.",detalle: "Panel IPS - 144Hz",precio: 400,imagen: "monitor-27.jpg"},
    { id: 9, nombre: "Smartwatch Pro",descripcion: "Controla tu salud y recibe notificaciones.",detalle: "Pantalla AMOLED - GPS - Resistente al agua",precio: 220,imagen: "smartwatch.jpg"}
];

// =========================
//   CARRITO
// =========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();

    Swal.fire({
        icon: "success",
        title: "Agregado al carrito",
        text: `${producto.nombre} fue agregado.`,
        timer: 1500,
        showConfirmButton: false
    });
}

// =========================
//   MOSTRAR CARRITO
// =========================
function mostrarCarrito() {
    const contenedor = document.getElementById("contenidoCarrito");
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
        document.getElementById("totalCarrito").innerText = "Total: $0";
        return;
    }

    let html = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
    `;

    let total = 0;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        html += `
          <tr>
            <td><img src="../assets/img/${item.imagen}" width="60"></td>
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
              <input type="number" value="${item.cantidad}" min="1" 
                onchange="actualizarCantidad(${item.id}, this.value)" 
                style="width:60px;">
            </td>
            <td>$${subtotal}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${item.id})">Eliminar</button>
            </td>
          </tr>
        `;
    });

    html += "</tbody></table>";
    contenedor.innerHTML = html;
    document.getElementById("totalCarrito").innerText = `Total: $${total}`;
}

// =========================
//   ACTUALIZAR CANTIDAD
// =========================
function actualizarCantidad(id, nuevaCantidad) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad = parseInt(nuevaCantidad);
        guardarCarrito();
        mostrarCarrito();
    }
}

// =========================
//   ELIMINAR PRODUCTO
// =========================
function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

// =========================
//   CONFIRMAR COMPRA
// =========================
function confirmarCompra() {
    if (carrito.length === 0) {
        Swal.fire({ icon: "info", title: "Carrito vacío" });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Compra confirmada",
        text: "Gracias por tu compra",
    }).then(() => {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    });
}

// =========================
//   MOSTRAR CARRITO (MEJORADO, CENTRADO)
// =========================
function mostrarCarrito() {
    const contenedor = document.getElementById("contenidoCarrito");
    if (!contenedor) return;

    if (!carrito || carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-muted'>No hay productos en el carrito.</p>";
        const totalEl = document.getElementById("totalCarrito");
        if (totalEl) totalEl.innerText = "Total: $0";
        return;
    }

    let total = 0;
    let html = `
      <table class="table align-middle">
        <thead class="table-dark">
          <tr>
            <th class="text-center" style="width:90px;">Imagen</th>
            <th>Producto</th>
            <th class="text-center" style="width:120px;">Precio</th>
            <th class="text-center" style="width:160px;">Cantidad</th>
            <th class="text-center" style="width:120px;">Subtotal</th>
            <th class="text-center" style="width:110px;">Acción</th>
          </tr>
        </thead>
        <tbody>
    `;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        html += `
          <tr>
            <td class="text-center">
              <img src="../assets/img/${item.imagen}" alt="${item.nombre}" class="rounded">
            </td>
            <td class="text-start">
              <strong>${item.nombre}</strong><br>
              <small class="text-muted">${item.detalle || ""}</small>
            </td>
            <td class="text-center">$${item.precio.toFixed(2)}</td>
            <td class="text-center">
              <div class="cantidad-control" role="group" aria-label="Control cantidad">
                <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, -1)" aria-label="Disminuir">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="fw-bold" id="cantidad-${item.id}">${item.cantidad}</span>
                <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, 1)" aria-label="Aumentar">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </td>
            <td class="text-center">$${subtotal.toFixed(2)}</td>
            <td class="text-center">
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${item.id})">
                <i class="bi bi-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        `;
    });

    html += `
        </tbody>
      </table>
    `;

    contenedor.innerHTML = html;

    const totalEl = document.getElementById("totalCarrito");
    if (totalEl) totalEl.innerText = `Total: $${total.toFixed(2)}`;
}

// =========================
//   CAMBIAR CANTIDAD (+/-)
// =========================
function cambiarCantidad(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        // eliminar si llega a 0 o menos
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
}

function mostrarCarrito() {
  const contenedor = document.getElementById("contenidoCarrito");
  if (!contenedor) return;

  if (!carrito || carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-muted text-center'>No hay productos en el carrito.</p>";
    document.getElementById("totalCarrito").innerText = "Total: $0";
    return;
  }

  let total = 0;
  contenedor.innerHTML = "";

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const card = `
      <div class="col-md-4">
        <div class="card h-100 text-center shadow-sm">
          <img src="../assets/img/${item.imagen}" alt="${item.nombre}" class="card-img-top product-img">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="text-muted mb-1">${item.detalle || ""}</p>
            <p class="fw-bold">$${item.precio.toFixed(2)}</p>
            <div class="cantidad-control my-2">
              <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, -1)">
                <i class="bi bi-dash"></i>
              </button>
              <span class="mx-2 fw-bold">${item.cantidad}</span>
              <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${item.id}, 1)">
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <p class="fw-bold">Subtotal: $${subtotal.toFixed(2)}</p>
          </div>
          <div class="card-footer bg-white border-0">
            <button class="btn btn-danger w-100 btn-sm" onclick="eliminarProducto(${item.id})">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += card;
  });

  document.getElementById("totalCarrito").innerText = `Total: $${total.toFixed(2)}`;
}



