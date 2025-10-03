class CarritoCompra {
    constructor() {
        this.listaProductos = [];
        this.total = 0;
    }

    agregarProducto(producto, cantidad = 1) {
        const existente = this.listaProductos.find(item => item.producto.idProducto === producto.idProducto);
        if (existente) {
            existente.cantidad += cantidad;
        } else {
            this.listaProductos.push({ producto, cantidad });
        }
        this.calcularTotal();
    }

    eliminarProducto(id) {
        this.listaProductos = this.listaProductos.filter(item => item.producto.idProducto !== id);
        this.calcularTotal();
    }

    actualizarCantidad(id, nuevaCantidad) {
        const item = this.listaProductos.find(p => p.producto.idProducto === id);
        if (item) {
            item.cantidad = nuevaCantidad;
            this.calcularTotal();
        }
    }

    calcularTotal() {
        this.total = this.listaProductos.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    }
}
