// Abrir modal
function abrirModal() {
    document.getElementById("modalPago").style.display = "flex";
}

// Cerrar modal
function cerrarModal() {
    document.getElementById("modalPago").style.display = "none";
}

// Definir precios de los tomos
const precios = {
    1: 15,  // Tomo 1: $15
    2: 18,  // Tomo 2: $18
    3: 20   // Tomo 3: $20
};

// Función para calcular el total
function calcularTotal() {
    const tomo = parseInt(document.getElementById("tomos").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const total = precios[tomo] * cantidad;
    document.getElementById("totalPrecio").textContent = total;
}

// Actualizar total cuando el usuario cambia el tomo o la cantidad
document.getElementById("tomos").addEventListener("change", calcularTotal);
document.getElementById("cantidad").addEventListener("input", calcularTotal);

// Manejo del formulario de pago
document.getElementById("formPago").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const metodoPago = document.getElementById("metodoPago").value;
    const tomo = document.getElementById("tomos").value;
    const cantidad = document.getElementById("cantidad").value;
    
    if (!nombre || !correo || !metodoPago || !tomo || !cantidad) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    alert(`Pago procesado con éxito. Gracias por tu compra de ${cantidad} Tomo(s) ${tomo}!`);
    cerrarModal();
});

// Calcular el total al cargar el modal
calcularTotal();

// Mostrar el botón de PayPal solo cuando se seleccione PayPal
document.getElementById("metodoPago").addEventListener("change", function() {
    var metodoSeleccionado = this.value;
    var paypalButtonContainer = document.getElementById("paypal-button-container");

    if (metodoSeleccionado === "paypal") {
        paypalButtonContainer.style.display = "block";  // Mostrar el botón de PayPal
        renderPayPalButton();  // Llamar a la función para renderizar el botón de PayPal
    } else {
        paypalButtonContainer.style.display = "none";  // Ocultar el botón de PayPal
    }
});

// Función para renderizar el botón de PayPal
function renderPayPalButton() {
    // Si ya existe un botón de PayPal, destrúyelo
    if (document.querySelector('#paypal-button-container').childElementCount > 0) {
        document.querySelector('#paypal-button-container').innerHTML = ''; // Eliminar el botón anterior
    }

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: document.getElementById("totalPrecio").textContent  // Usar el precio calculado
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Pago procesado con éxito. Gracias por tu compra!');
                cerrarModal();  // Cerrar el modal después de la compra
            });
        }
    }).render('#paypal-button-container');  // Renderiza el botón en el contenedor
}

// Modal de WhatsApp
function abrirModalWhatsApp() {
    document.getElementById("modalWhatsApp").style.display = "flex";
}

function cerrarModalWhatsApp() {
    document.getElementById("modalWhatsApp").style.display = "none";
}

function enviarWhatsApp() {
    let nombre = document.getElementById("nombreWA").value.trim();
    let telefono = document.getElementById("telefonoWA").value.trim();

    if (nombre === "" || telefono === "") {
        alert("Por favor, completa ambos campos.");
        return;
    }

    let mensaje = `Hola, mi nombre es ${nombre} y quiero más información sobre la compra de los tomos de Exsurgens Revenant.`;
    let url = `https://wa.me/51914056817?text=${encodeURIComponent(mensaje)}`;

    cerrarModalWhatsApp();  // Cierra el modal antes de abrir el chat
    setTimeout(() => {
        window.open(url, "_blank");
    }, 300);
}
