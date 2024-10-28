var porcentaje = 0;

function seleccionarOpcion(opcion, valorPorcentaje) {
    // Asigna el valor de la variable global porcentaje
    porcentaje = valorPorcentaje;

    // Obtiene el texto correspondiente a la opción seleccionada
    var calificacionTexto = getCalificacionTexto(opcion);

    // Asigna el texto al elemento <p>
    var labelCalificacion = document.getElementById("labelCalificacion");
    labelCalificacion.innerText = `${calificacionTexto}`;

    // Asigna el mismo texto al valor del campo oculto
    var inputAtencion = document.getElementById("atencion");
    inputAtencion.value = calificacionTexto;

    // Quita la clase 'selected' de todos los botones y agrega la clase al botón seleccionado
    document.querySelectorAll('.btn-opcion').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`btn${opcion.charAt(0).toUpperCase() + opcion.slice(1)}`).classList.add('selected');
}

function getCalificacionTexto(opcion) {
    switch (opcion) {
        case 'excelente':
            return 'Muy buena atención';
        case 'serio':
            return 'Atención regular';
        case 'malo':
            return 'Mala atención';
        default:
            return '';
    }
}

function validarFormulario() {
    // Obtener el valor del campo atencion
    var valorAtencion = document.getElementById("atencion").value;

    // Verificar si el valor es válido (puedes ajustar esto según tus necesidades)
    if (valorAtencion.trim() === "") {
        // Si el valor es vacío, mostrar un mensaje de alerta
        alert("Por favor, selecciona cómo fue la atención antes de enviar la encuesta.");
        return false; // Evitar que el formulario se envíe
    }

    // Si el valor es válido, permitir que el formulario se envíe
    return true;
}


