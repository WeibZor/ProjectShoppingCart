class Cliente {
    constructor(nombre, correo, direccionEnvio, usuario, contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.direccionEnvio = direccionEnvio;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.intentosFallidos = 0;
    }

    registrar(clientes) {
        clientes.push(this);
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    iniciarSesion(password) {
        if (this.intentosFallidos >= 3) {
            return { exito: false, mensaje: "Cuenta bloqueada por intentos fallidos" };
        }
        if (this.contrasena === password) {
            this.intentosFallidos = 0;
            localStorage.setItem("clienteActual", JSON.stringify(this));
            return { exito: true, mensaje: `Bienvenido ${this.nombre}` };
        } else {
            this.intentosFallidos++;
            return { exito: false, mensaje: "Contraseña incorrecta" };
        }
    }

    modificarDatos(nuevosDatos) {
        this.nombre = nuevosDatos.nombre || this.nombre;
        this.correo = nuevosDatos.correo || this.correo;
        this.direccionEnvio = nuevosDatos.direccionEnvio || this.direccionEnvio;
        localStorage.setItem("clienteActual", JSON.stringify(this));
    }
}
