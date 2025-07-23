// Validación de sesión activa y redirección si el token no es válido
importarSecurity();

function importarSecurity() {
    const script = document.createElement("script");
    script.src = "../../../security/seguridad.js";
    document.head.appendChild(script);
    script.onload = () => {
        if (typeof verificarSesion !== "undefined") {
            verificarSesion(); // Redirige al login si no hay sesión activa
        }
    };
}

var porcentaje = 0;

function seleccionarOpcion(opcion, valorPorcentaje) {
    porcentaje = valorPorcentaje;
    const calificacionTexto = getCalificacionTexto(opcion);
    document.getElementById("labelCalificacion").innerText = calificacionTexto;
    document.getElementById("atencion").value = calificacionTexto;

    document.querySelectorAll('.btn-opcion').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`btn${opcion.charAt(0).toUpperCase() + opcion.slice(1)}`).classList.add('selected');
}

function getCalificacionTexto(opcion) {
    switch (opcion) {
        case 'excelente': return 'Muy buena atención';
        case 'serio': return 'Atención regular';
        case 'malo': return 'Mala atención';
        default: return '';
    }
}

function validarFormulario() {
    const valorAtencion = document.getElementById("atencion").value;
    if (valorAtencion.trim() === "") {
        alert("Por favor, selecciona cómo fue la atención antes de enviar la encuesta.");
        return false;
    }
    const sedeID = document.getElementById("sede").value;
    if (sedeID === "" || isNaN(parseInt(sedeID))) {
        alert("Por favor, selecciona una sede válida.");
        return false;
    }
    return true;
}

// Llenar dinámicamente las sedes desde el backend
function cargarSedes() {
    const url = config.getServiceUrl('funcionariosService') + '/api/v1/sedes/getAll';

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("authToken"),
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar sedes');
            return response.json();
        })
        .then(sedes => {
            console.log("📋 Sedes recibidas:", sedes); // Log para depurar
            const sedeSelect = document.getElementById("sede");

            // Limpiar y agregar opción por defecto
            sedeSelect.innerHTML = '<option value="">Seleccione una sede</option>';

            sedes.forEach(sede => {
                const option = document.createElement("option");
                option.value = sede.sedeID;     // ✅ se envía al backend
                option.text = sede.nombre;      // ✅ solo se muestra al usuario
                sedeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("❌ Error al cargar las sedes:", error);
            alert("Hubo un error al cargar las sedes. Intenta más tarde.");
        });
}

// Ejecutar al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    cargarSedes();
});
