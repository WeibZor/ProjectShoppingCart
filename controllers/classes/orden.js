// Clase principal de la aplicación
class FacturaApp {
    constructor() {
        this.productos = [];
        this.historial = [];
        this.subtotal = 0;
        this.descuento = 0;
        this.iva = 0;
        this.total = 0;
        this.applyDiscount = false;
        
        this.inicializarElementos();
        this.inicializarEventos();
    }
    
    // Inicializar referencias a elementos DOM
    inicializarElementos() {
        // Formularios
        this.productForm = document.getElementById('product-form');
        this.editForm = document.getElementById('edit-form');
        
        // Inputs del formulario principal
        this.productNameInput = document.getElementById('product-name');
        this.productPriceInput = document.getElementById('product-price');
        this.productQuantityInput = document.getElementById('product-quantity');
        
        // Inputs del formulario de edición
        this.editIndexInput = document.getElementById('edit-index');
        this.editNameInput = document.getElementById('edit-name');
        this.editPriceInput = document.getElementById('edit-price');
        this.editQuantityInput = document.getElementById('edit-quantity');
        
        // Tabla y cuerpo de tabla
        this.productsTable = document.getElementById('products-table');
        this.tableBody = this.productsTable.querySelector('tbody');
        
        // Elementos de totales
        this.subtotalElement = document.getElementById('subtotal');
        this.discountElement = document.getElementById('discount');
        this.ivaElement = document.getElementById('iva');
        this.totalElement = document.getElementById('total');
        this.applyDiscountCheckbox = document.getElementById('apply-discount');
        
        // Botones
        this.generateBtn = document.getElementById('btn-generate');
        this.clearBtn = document.getElementById('btn-clear');
        this.historyBtn = document.getElementById('btn-history');
        
        // Modales
        this.editModal = document.getElementById('edit-modal');
        this.historyModal = document.getElementById('history-modal');
        this.historyContainer = document.getElementById('history-container');
        
        // Botones de cerrar modales
        this.closeButtons = document.querySelectorAll('.close');
    }
    
    // Configurar event listeners
    inicializarEventos() {
        // Formulario para agregar producto
        this.productForm.addEventListener('submit', (e) => this.agregarProducto(e));
        
        // Formulario para editar producto
        this.editForm.addEventListener('submit', (e) => this.guardarEdicion(e));
        
        // Checkbox de descuento
        this.applyDiscountCheckbox.addEventListener('change', () => {
            this.applyDiscount = this.applyDiscountCheckbox.checked;
            this.calcularTotales();
        });
        
        // Botones principales
        this.generateBtn.addEventListener('click', () => this.generarFactura());
        this.clearBtn.addEventListener('click', () => this.limpiarTodo());
        this.historyBtn.addEventListener('click', () => this.mostrarHistorial());
        
        // Cerrar modales
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.editModal.style.display = 'none';
                this.historyModal.style.display = 'none';
            });
        });
        
        // Cerrar modales al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.editModal.style.display = 'none';
            }
            if (e.target === this.historyModal) {
                this.historyModal.style.display = 'none';
            }
        });
    }
    
    // Agregar producto a la factura
    agregarProducto(e) {
        e.preventDefault();
        
        const nombre = this.productNameInput.value.trim();
        const precio = parseFloat(this.productPriceInput.value);
        const cantidad = parseInt(this.productQuantityInput.value);
        
        if (!nombre || isNaN(precio) || precio <= 0 || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
        
        const producto = {
            nombre,
            precio,
            cantidad,
            subtotal: precio * cantidad
        };
        
        this.productos.push(producto);
        this.mostrarProductos();
        this.calcularTotales();
        
        // Limpiar formulario
        this.productForm.reset();
        this.productQuantityInput.value = 1;
    }
    
    // Mostrar productos en la tabla
    mostrarProductos() {
        this.tableBody.innerHTML = '';
        
        this.productos.forEach((producto, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-edit" data-index="${index}">Editar</button>
                    <button class="btn btn-delete" data-index="${index}">Eliminar</button>
                </td>
            `;
            
            this.tableBody.appendChild(row);
        });
        
        // Agregar event listeners a los botones de editar y eliminar
        this.tableBody.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => this.editarProducto(e));
        });
        
        this.tableBody.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.eliminarProducto(e));
        });
    }
    
    // Editar producto
    editarProducto(e) {
        const index = e.target.getAttribute('data-index');
        const producto = this.productos[index];
        
        this.editIndexInput.value = index;
        this.editNameInput.value = producto.nombre;
        this.editPriceInput.value = producto.precio;
        this.editQuantityInput.value = producto.cantidad;
        
        this.editModal.style.display = 'block';
    }
    
    // Guardar edición de producto
    guardarEdicion(e) {
        e.preventDefault();
        
        const index = parseInt(this.editIndexInput.value);
        const nombre = this.editNameInput.value.trim();
        const precio = parseFloat(this.editPriceInput.value);
        const cantidad = parseInt(this.editQuantityInput.value);
        
        if (!nombre || isNaN(precio) || precio <= 0 || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
        
        this.productos[index] = {
            nombre,
            precio,
            cantidad,
            subtotal: precio * cantidad
        };
        
        this.mostrarProductos();
        this.calcularTotales();
        this.editModal.style.display = 'none';
    }
    
    // Eliminar producto
    eliminarProducto(e) {
        const index = e.target.getAttribute('data-index');
        this.productos.splice(index, 1);
        this.mostrarProductos();
        this.calcularTotales();
    }
    
    // Calcular totales de la factura
    calcularTotales() {
        this.subtotal = this.productos.reduce((sum, producto) => sum + producto.subtotal, 0);
        
        // Aplicar descuento del 5% si está seleccionado
        this.descuento = this.applyDiscount ? this.subtotal * 0.05 : 0;
        
        // Calcular base para IVA (subtotal - descuento)
        const baseIVA = this.subtotal - this.descuento;
        
        // Calcular IVA (19%)
        this.iva = baseIVA * 0.19;
        
        // Calcular total
        this.total = baseIVA + this.iva;
        
        // Actualizar UI
        this.subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;
        this.discountElement.textContent = `$${this.descuento.toFixed(2)}`;
        this.ivaElement.textContent = `$${this.iva.toFixed(2)}`;
        this.totalElement.textContent = `$${this.total.toFixed(2)}`;
    }
    
    // Generar factura y agregar al historial
    generarFactura() {
        if (this.productos.length === 0) {
            alert('No hay productos en la factura.');
            return;
        }
        
        const factura = {
            fecha: new Date().toLocaleString(),
            productos: [...this.productos],
            subtotal: this.subtotal,
            descuento: this.descuento,
            iva: this.iva,
            total: this.total
        };
        
        this.historial.push(factura);
        alert('Factura generada correctamente y agregada al historial.');
        
        // Limpiar factura actual
        this.limpiarFactura();
    }
    
    // Mostrar historial de facturas
    mostrarHistorial() {
        this.historyContainer.innerHTML = '';
        
        if (this.historial.length === 0) {
            this.historyContainer.innerHTML = '<p>No hay facturas en el historial.</p>';
            this.historyModal.style.display = 'block';
            return;
        }
        
        // Mostrar las facturas en orden inverso (la más reciente primero)
        this.historial.slice().reverse().forEach((factura, index) => {
            const facturaElement = document.createElement('div');
            facturaElement.className = 'invoice-history';
            
            let productosHTML = '';
            factura.productos.forEach(producto => {
                productosHTML += `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${producto.nombre} (x${producto.cantidad})</span>
                        <span>$${producto.subtotal.toFixed(2)}</span>
                    </div>
                `;
            });
            
            facturaElement.innerHTML = `
                <div class="invoice-header">
                    <span>Factura #${this.historial.length - index}</span>
                    <span>${factura.fecha}</span>
                </div>
                <div class="invoice-products">
                    ${productosHTML}
                </div>
                <div style="margin-top: 10px; border-top: 1px solid #444; padding-top: 10px;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>Subtotal:</span>
                        <span>$${factura.subtotal.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Descuento (5%):</span>
                        <span>$${factura.descuento.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>IVA (19%):</span>
                        <span>$${factura.iva.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 5px;">
                        <span>Total:</span>
                        <span class="invoice-total">$${factura.total.toFixed(2)}</span>
                    </div>
                </div>
            `;
            
            this.historyContainer.appendChild(facturaElement);
        });
        
        this.historyModal.style.display = 'block';
    }
    
    // Limpiar factura actual
    limpiarFactura() {
        this.productos = [];
        this.mostrarProductos();
        this.calcularTotales();
        this.applyDiscountCheckbox.checked = false;
        this.applyDiscount = false;
    }
    
    // Limpiar todo (factura actual e historial)
    limpiarTodo() {
        if (confirm('¿Está seguro de que desea limpiar toda la información? Esto incluye el historial de facturas.')) {
            this.productos = [];
            this.historial = [];
            this.mostrarProductos();
            this.calcularTotales();
            this.applyDiscountCheckbox.checked = false;
            this.applyDiscount = false;
            alert('Toda la información ha sido eliminada.');
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FacturaApp();
});