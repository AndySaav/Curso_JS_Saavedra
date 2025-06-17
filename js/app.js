// Clase Usuario para futura escalabilidad
class Usuario {
    constructor(nombre, saldo, clave) {
        this.nombre = nombre;
        this.saldo = saldo;
        this.clave = clave;
        this.historial = [];
    }

    depositar(monto) {
        this.saldo += monto;
        this.historial.push(`Depósito: +$${monto}`);
    }

    retirar(monto) {
        this.saldo -= monto;
        this.historial.push(`Retiro: -$${monto}`);
    }
}

// Carga desde localStorage o crea usuario por defecto
const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
let usuario = usuarioGuardado
    ? Object.assign(new Usuario(), usuarioGuardado)
    : new Usuario("Andy", 50000, "1234");

// Referencias al DOM
const loginSection = document.getElementById("login-section");
const panelSection = document.getElementById("panel-section");
const usuarioInput = document.getElementById("usuarioInput");
const claveInput = document.getElementById("claveInput");
const loginMensaje = document.getElementById("loginMensaje");
const btnIngresar = document.getElementById("btnIngresar");

const nombreUsuario = document.getElementById("nombreUsuario");
const saldoActual = document.getElementById("saldoActual");
const montoInput = document.getElementById("montoInput");
const btnDepositar = document.getElementById("btnDepositar");
const btnRetirar = document.getElementById("btnRetirar");
const historialLista = document.getElementById("historialLista");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

// Variables de estado
let intentos = 3;

// Mostrar panel si ya está logueado (opcional)
if (usuarioGuardado && localStorage.getItem("logueado") === "true") {
    mostrarPanel();
}

// EVENTO: Ingreso con clave
btnIngresar.addEventListener("click", () => {
    const usuarioIngresado = usuarioInput.value.trim().toLowerCase();
    const claveIngresada = claveInput.value;

    if (usuarioIngresado === "andy" && claveIngresada === usuario.clave) {
        localStorage.setItem("logueado", "true");
        mostrarPanel();
    } else {
        intentos--;
        loginMensaje.textContent = `Usuario o clave incorrectos. Te quedan ${intentos} intento(s).`;
        if (intentos <= 0) {
        claveInput.disabled = true;
        usuarioInput.disabled = true;
        btnIngresar.disabled = true;
        loginMensaje.textContent = "Ingreso bloqueado por intentos fallidos.";
        }
    }
});


// Mostrar panel principal
function mostrarPanel() {
    loginSection.style.display = "none";
    panelSection.style.display = "block";

    nombreUsuario.textContent = usuario.nombre;
    actualizarSaldo();
    renderizarHistorial();
}

// Actualizar saldo en DOM
function actualizarSaldo() {
    saldoActual.textContent = usuario.saldo;
}

// Renderizar historial de movimientos
function renderizarHistorial() {
    historialLista.innerHTML = "";

    if (usuario.historial.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Sin movimientos.";
        historialLista.appendChild(li);
    } else {
    usuario.historial.forEach(mov => {
        const li = document.createElement("li");
        li.textContent = mov;
        historialLista.appendChild(li);
    });
    }
}

// EVENTO: Depositar
btnDepositar.addEventListener("click", () => {
    const monto = parseFloat(montoInput.value);
    if (isNaN(monto) || monto <= 0) return;

    usuario.depositar(monto);
    actualizarSaldo();
    renderizarHistorial();
    guardarUsuario();
    montoInput.value = "";
});

// EVENTO: Retirar
btnRetirar.addEventListener("click", () => {
    const monto = parseFloat(montoInput.value);
    if (isNaN(monto) || monto <= 0) return;

    if (monto > usuario.saldo) {
        alert("Fondos insuficientes."); // Podés cambiar esto por un mensaje en pantalla
        return;
    }

    usuario.retirar(monto);
    actualizarSaldo();
    renderizarHistorial();
    guardarUsuario();
    montoInput.value = "";
});

// EVENTO: Cerrar sesión
btnCerrarSesion.addEventListener("click", () => {
    localStorage.setItem("logueado", "false");
    loginSection.style.display = "block";
    panelSection.style.display = "none";
    claveInput.value = "";
    loginMensaje.textContent = "";
    montoInput.value = "";
});

// Guardar en localStorage
function guardarUsuario() {
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

/* PENDIENTE:
    - Agregar múltiples usuarios en versiones futuras
    - Transferencias entre cuentas (ya aparece botón)
    - Validación más detallada para inputs
*/
