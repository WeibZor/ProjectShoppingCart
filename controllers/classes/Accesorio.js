class Accesorio extends Producto {
    constructor(id, nombre, descripcion, precio, stock, tipoAccesorio, imagen) {
        super(id, nombre, descripcion, precio, stock, imagen);
        this.tipoAccesorio = tipoAccesorio;
    }

    mostrarInfo() {
        return `${this.nombre} (${this.tipoAccesorio}) - $${this.precio}`;
    }
}
