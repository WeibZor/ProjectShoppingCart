class Orden {
    constructor(numeroOrden, cliente, listaProductos, total) {
        this.numeroOrden = numeroOrden;
        this.cliente = cliente;
        this.listaProductos = listaProductos;
        this.total = total;
        this.fecha = new Date().toLocaleString();
        this.estado = "Confirmada";
    }

    generarOrden() {
        return {
            numero: this.numeroOrden,
            cliente: this.cliente.usuario,
            total: this.total,
            fecha: this.fecha,
            estado: this.estado
        };
    }

    mostrarResumen() {
        return `Orden #${this.numeroOrden} - Cliente: ${this.cliente.nombre} - Total: $${this.total}`;
    }
}
