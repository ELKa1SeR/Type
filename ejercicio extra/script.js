document.addEventListener('DOMContentLoaded', function () {
    const textoInput = document.getElementById("texto");
    const botonSubmit = document.querySelector("button");
    const contenedor = document.getElementById("contenedor");

    textoInput.addEventListener("input", function () {
        botonSubmit.disabled = textoInput.value.length === 0;
    });

    botonSubmit.addEventListener("click", function () {
        crearCaja();
    });

    function crearCaja() {
        const texto = textoInput.value;
        const nuevaCaja = document.createElement("div");
        nuevaCaja.className = "caja";

        // Asignar color de borde según el texto introducido
        switch (texto.toLowerCase()) {
            case "azul":
                nuevaCaja.style.borderColor = "blue";
                break;
            case "amarillo":
                nuevaCaja.style.borderColor = "yellow";
                break;
            case "rojo":
                nuevaCaja.style.borderColor = "red";
                break;
            case "verde":
                nuevaCaja.style.borderColor = "green";
                break;
            default:
                nuevaCaja.style.borderColor = "#000";
        }

        nuevaCaja.textContent = texto;

        // Anidar la nueva caja dentro de la anterior
        if (contenedor.firstChild) {
            nuevaCaja.appendChild(contenedor.firstChild);
        }

        contenedor.appendChild(nuevaCaja);
        textoInput.value = ""; // Limpiar el campo de texto
        botonSubmit.disabled = true; // Deshabilitar el botón
    }
});


