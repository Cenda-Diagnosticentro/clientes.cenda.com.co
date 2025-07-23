document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formEncuesta");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validarFormulario()) return;

        const nombre = document.getElementById("nombre").value.trim();
        const celular = document.getElementById("celular").value.trim();
        const placa = document.getElementById("placa").value.trim();
        const sedeID = document.getElementById("sede").value;
        const atencion = document.getElementById("atencion").value;
        const comentarios = document.getElementById("comentarios").value.trim();

        const documento = localStorage.getItem("documento");
        const token = localStorage.getItem("authToken");

        if (!documento || !token) {
            Swal.fire("Sesión no válida", "Por favor inicia sesión nuevamente.", "warning")
                .then(() => window.location.href = "/Src/Pages/Login/login.html");
            return;
        }

        // Calcular porcentaje según atención
        let porcentaje = 0;
        switch (atencion) {
            case "excelente":
                porcentaje = 1;
                break;
            case "serio":
                porcentaje = 0.5;
                break;
            case "malo":
                porcentaje = 0;
                break;
        }

        // Obtener fecha y hora actual en formato correcto
        const now = new Date();
        const fecha = now.toISOString().split("T")[0]; // YYYY-MM-DD
        const hora = now.toTimeString().split(" ")[0]; // HH:mm:ss

        // Construir objeto según la clase Java 'Encuesta'
        const datos = {
            nombreCliente: nombre || null,
            numeroCliente: celular ? parseInt(celular) : null,
            placaCliente: placa || null,
            comentario: comentarios || null,
            respuesta: atencion || null,
            porcentaje: porcentaje,
            fecha: fecha,
            hora: hora,
            sede: sedeID ? { sedeID: parseInt(sedeID) } : null,
            usuario: documento ? { documento } : null
        };

        // 🔍 Imprimir datos enviados
        console.log("📤 Datos enviados al backend:", datos);

        const url = config.getServiceUrl('funcionariosService') + '/api/v1/encuesta/save';

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(datos)
        })
            .then(res => {
                if (res.status === 401) throw new Error("No autorizado. Verifica tu sesión.");
                if (!res.ok) throw new Error("Error al guardar la encuesta");
                return res.json();
            })
            .then(response => {
                console.log("✅ Respuesta del backend:", response);
                Swal.fire("¡Gracias!", "Tu opinión ha sido registrada con éxito.", "success")
                    .then(() => window.location.href = "../../../Src/Pages/Encuesta/encuesta.html");
            })
            .catch(error => {
                console.error("❌ Error al guardar encuesta:", error);
                Swal.fire("Error", error.message || "No se pudo enviar la encuesta.", "error");
            });
    });
});
