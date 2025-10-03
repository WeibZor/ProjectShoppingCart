class Producto {
    constructor(idProducto, nombre, descripcion, precio, stock, imagen="placeholder.jpg") {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }

    mostrarInfo() {
        return `${this.nombre} - ${this.descripcion} - $${this.precio}`;
    }

    actualizarStock(cantidad) {
        this.stock -= cantidad;
    }
}
