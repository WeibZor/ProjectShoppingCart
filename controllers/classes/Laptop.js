class Laptop extends Producto {
    constructor(id, nombre, descripcion, precio, stock, procesador, memoriaRAM, almacenamiento, imagen) {
        super(id, nombre, descripcion, precio, stock, imagen);
        this.procesador = procesador;
        this.memoriaRAM = memoriaRAM;
        this.almacenamiento = almacenamiento;
    }

    mostrarInfo() {
        return `${this.nombre} (${this.procesador}, ${this.memoriaRAM} RAM, ${this.almacenamiento}) - $${this.precio}`;
    }
}
