let usuario = {
    nombre: "Andy",
    saldo: 50000,
    clave: "1234",
    historial: []
};

// Función para ingresar
function ingresarSistema() {
    let intentos = 3;
    while (intentos > 0) {
        let ingreso = prompt("Ingrese su clave. Te quedan " + intentos + " intentos (Max. 3). Default Andy: 1234):");
        if (ingreso === usuario.clave) {
        alert("¡Bienvenido, " + usuario.nombre + "!");
        return true;
        } else {
        intentos= intentos - 1;
        alert("Clave incorrecta. Te quedan " + intentos + " intentos.");
        }
    }
    alert("Demasiados intentos. Ingreso bloqueado.");
    return false;
}

// Función para mostrar el menu
function mostrarMenu() {
    let opcion;
    do {
        opcion = prompt(`
        ¿Qué desea hacer?
        1. Consultar saldo
        2. Depositar dinero
        3. Retirar dinero
        4. Ver historial
        5. Salir
        `);

        switch (opcion) {
        case "1":
            consultarSaldo();
            break;
        case "2":
            depositarDinero();
            break;
        case "3":
            retirarDinero();
            break;
        case "4":
            mostrarHistorial();
            break;
        case "5":
            alert("Gracias por usar nuestro servicio, ¡hasta luego!");
            break;
        default:
            alert("Opción inválida. Intente nuevamente.");
        }
    } while (opcion !== "5");
}

// Función para consultar el saldo
const consultarSaldo = () => {
    alert("Tu saldo actual es: $" + usuario.saldo);
};

// Función para depositar
const depositarDinero = () => {
    let monto = parseFloat(prompt("Ingrese el monto a depositar:"));
    if (isNaN(monto) || monto <= 0) {
        alert("Monto inválido.");
    } else {
        usuario.saldo += monto;
        usuario.historial.push("Depósito: +$" + monto);
        alert("Depósito exitoso. Nuevo saldo: $" + usuario.saldo);
    }
};

// Función para retirar
const retirarDinero = () => {
    let monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    if (isNaN(monto) || monto <= 0) {
        alert("Monto inválido.");
    } else if (monto > usuario.saldo) {
        alert("Fondos insuficientes.");
    } else {
        usuario.saldo -= monto;
        usuario.historial.push("Retiro: -$" + monto);
        alert("Retiro exitoso. Nuevo saldo: $" + usuario.saldo);
    }
};

// Función para mostrar el historial
const mostrarHistorial = () => {
    if (usuario.historial.length === 0) {
        alert("No hay movimientos registrados.");
    } else {
        alert("Historial de movimientos:\n" + usuario.historial.join("\n"));
    }
};

// Ejecutar el programa
if (ingresarSistema()) {
    mostrarMenu();
}

