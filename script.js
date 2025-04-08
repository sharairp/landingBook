// Abrir modal
function abrirModal() {
    document.getElementById("modalPago").style.display = "flex";
}

// Cerrar modal
function cerrarModal() {
    document.getElementById("modalPago").style.display = "none";
}

// Funcionalidad para cambiar de tomo al hacer clic en los botones
document.querySelectorAll('.tomo-btn').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        // Quitar clase "active" de todos los botones
        document.querySelectorAll('.tomo-btn').forEach(btn => btn.classList.remove('active'));
        // Quitar clase "active" de todas las imágenes
        document.querySelectorAll('.tomo-img').forEach(img => img.classList.remove('active'));

        // Agregar clase "active" al botón clicado
        boton.classList.add('active');
        // Agregar clase "active" a la imagen correspondiente
        document.querySelectorAll('.tomo-img')[index].classList.add('active');

        // También actualiza el select de tomos si quieres sincronizarlo
        const selectTomos = document.getElementById("tomos");
        if (selectTomos) {
            selectTomos.value = boton.dataset.tomo;
            calcularTotal(); // Actualiza el precio si cambias de tomo
        }
    });
});


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
//seguir bajando
let scrollInterval;

function autoScroll() {
  if (scrollInterval) return; // Evitar múltiples scrolls

  let isUserInteracting = false;

  scrollInterval = setInterval(() => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    } else if (!isUserInteracting) {
      window.scrollBy(0, 5); // Velocidad del scroll
    }
  }, 10);

  const stopScroll = () => {
    isUserInteracting = true;
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    userEvents.forEach(event => {
      window.removeEventListener(event, stopScroll);
    });
  };

  const userEvents = ['wheel', 'mousedown', 'touchstart', 'keydown', 'mousemove'];
  userEvents.forEach(event => {
    window.addEventListener(event, stopScroll);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.querySelector('.btn-scroll');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', autoScroll);
  }
});

// Función para manejar la animación cuando el elemento está en vista
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Agregar la clase "active" cuando el elemento entra en la vista
            entry.target.classList.add('active');
            // Desactivar el observador después de que la animación se haya activado
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // Ajusta este valor según cuándo consideres que el elemento está en vista
});

const elementos = document.querySelectorAll('header, header h1, nav ul, .portadas, .sinopsis, .pricing, .reseñas, .footer');

elementos.forEach(element => {
    observer.observe(element);
});

// Abrir modal de login
function abrirModalLogin() {
    document.getElementById("modalLogin").style.display = "flex"; // Mostrar el modal
}

// Cerrar modal de login
function cerrarModalLogin() {
    document.getElementById("modalLogin").style.display = "none"; // Ocultar el modal
}

// Añadir el evento para abrir el modal de login
document.getElementById("abrirModal").addEventListener("click", abrirModalLogin);

// Añadir el evento para cerrar el modal de login cuando se hace clic en el "×"
document.getElementById("cerrarModal").addEventListener("click", cerrarModalLogin);

// También cerrar el modal de login si se hace clic fuera de él
window.addEventListener("click", function(event) {
    var modal = document.getElementById("modalLogin");
    if (event.target === modal) {
        cerrarModalLogin(); // Cerrar el modal si se hace clic fuera de él
    }
});
