class Smartphone extends Producto {
    constructor(id, nombre, descripcion, precio, stock, sistemaOperativo, tamañoPantalla, camara, imagen) {
        super(id, nombre, descripcion, precio, stock, imagen);
        this.sistemaOperativo = sistemaOperativo;
        this.tamañoPantalla = tamañoPantalla;
        this.camara = camara;
    }

    mostrarInfo() {
        return `${this.nombre} (${this.sistemaOperativo}, ${this.tamañoPantalla}, ${this.camara}) - $${this.precio}`;
    }
}
