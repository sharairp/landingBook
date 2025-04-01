// Abrir modal
function abrirModal() {
    document.getElementById("modalPago").style.display = "flex";
}

// Cerrar modal
function cerrarModal() {
    document.getElementById("modalPago").style.display = "none";
}

// Manejo del formulario de pago
document.getElementById("formPago").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Pago procesado con éxito. Gracias por tu compra!");
    cerrarModal();
});


//portadas

document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll(".tomo-btn");
    const imagenes = document.querySelectorAll(".tomo-img");

    botones.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            document.querySelector(".tomo-btn.active").classList.remove("active");
            boton.classList.add("active");

            document.querySelector(".tomo-img.active").classList.remove("active");
            imagenes[index].classList.add("active");
        });
    });
});
//modal wsp
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

    let mensaje = `Hola, mi nombre es ${nombre} y quiero más información.`;
    let url = `https://wa.me/51914056817?text=${encodeURIComponent(mensaje)}`; // Aquí pones tu número

    cerrarModalWhatsApp();  // Cierra el modal antes de abrir el chat
    setTimeout(() => { // Pequeña pausa para que el cierre del modal sea visible
        window.open(url, "_blank");
    }, 300);
}
//scroll

document.querySelector(".btn-scroll").addEventListener("click", function() {
    let scrollInterval = setInterval(function() {
        let scrollPos = window.scrollY;
        let scrollHeight = document.body.scrollHeight;
        
        if (scrollPos + window.innerHeight >= scrollHeight) {
            clearInterval(scrollInterval); // Detiene el scroll al llegar abajo
        } else {
            window.scrollBy(0, 2); // Ajusta este valor para cambiar la velocidad
        }
    }, 15); // Cuanto menor el número, más rápido el scroll
});
