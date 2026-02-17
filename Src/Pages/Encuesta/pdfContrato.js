(function () {
    const btnAbrir = document.getElementById("btnAbrirContrato");
    const btnFirmar = document.getElementById("btnFirmarYGenerar");

    if (!btnAbrir || !btnFirmar) return;

    btnAbrir.addEventListener("click", () => {
        const nombre = document.getElementById("nombre")?.value.trim();
        const placa = document.getElementById("placa")?.value.trim().toUpperCase();

        const sedeSelect = document.getElementById("sede");
        const sedeValue = sedeSelect?.value;
        const sedeTexto = sedeSelect?.options[sedeSelect.selectedIndex]?.text?.trim();

        if (!nombre) {
            Swal.fire("Falta información", "Debes ingresar tu nombre antes de continuar.", "warning");
            return;
        }
        if (!placa) {
            Swal.fire("Falta información", "Debes ingresar la placa antes de continuar.", "warning");
            return;
        }
        if (!sedeValue) {
            Swal.fire("Falta información", "Debes seleccionar una sede antes de continuar.", "warning");
            return;
        }

        // Cargar datos al modal (solo lectura)
        const inputPlaca = document.getElementById("firmaPlaca");
        const inputSede = document.getElementById("firmaSede");
        if (inputPlaca) inputPlaca.value = placa;
        if (inputSede) inputSede.value = sedeTexto || "N/A";

        // Poner nombre/placa dentro del texto del contrato
        const spanNombre = document.getElementById("contratoNombre");
        const spanPlaca = document.getElementById("contratoPlaca");
        if (spanNombre) spanNombre.textContent = nombre;
        if (spanPlaca) spanPlaca.textContent = placa;

        // Reset checkbox
        const chk = document.getElementById("aceptoContrato");
        if (chk) chk.checked = false;

        // Limpiar firma anterior
        window.FirmaCanvas?.clear();

        $("#modalContrato").modal("show");
    });

    btnFirmar.addEventListener("click", async () => {
        const acepto = document.getElementById("aceptoContrato")?.checked;

        const nombre = document.getElementById("nombre")?.value.trim();
        const placa = document.getElementById("placa")?.value.trim().toUpperCase();

        const now = new Date();
        const fecha = now.toLocaleDateString();
        const hora = now.toLocaleTimeString();

        const sedeSelect = document.getElementById("sede");
        const sedeTexto = sedeSelect?.options[sedeSelect.selectedIndex]?.text?.trim() || "N/A";

        if (!acepto) {
            Swal.fire("Falta aceptación", "Debes aceptar el documento.", "warning");
            return;
        }

        if (!window.FirmaCanvas?.hasStrokes()) {
            Swal.fire("Firma requerida", "Debes firmar en el recuadro.", "warning");
            return;
        }

        // Firma base64
        const firmaBase64 = window.FirmaCanvas.exportBase64();

        const firmaGlobal = document.getElementById("firmaBase64Global");
        if (firmaGlobal) firmaGlobal.value = firmaBase64;

        // Generar PDF
        const pdfBlob = generarPdfContrato({
            nombre,
            placa,
            sede: sedeTexto,
            firmaBase64,
        });

        // Descargar el PDF
        // descargarBlob(pdfBlob, `acta_recibo_${placa}-${fecha}-${hora}.pdf`);
        window.__ACTA_PDF_BLOB__ = pdfBlob;
        window.__ACTA_FILENAME__ = `ACTA_${placa}_${new Date().toISOString().replaceAll(':','-')}.pdf`;

        // Convertir PDF a base64 y guardarlo en hidden (opcional útil)
        const pdfBase64 = await blobToBase64(pdfBlob);
        const pdfGlobal = document.getElementById("pdfBase64Global");
        if (pdfGlobal) pdfGlobal.value = pdfBase64;

        $("#modalContrato").modal("hide");

        // Disparar el submit real (tu encuesta.js seguirá funcionando)
        document.getElementById("btnSubmitReal")?.click();
    });

    function generarPdfContrato({nombre, placa, sede, firmaBase64}) {
        const {jsPDF} = window.jspdf;
        const doc = new jsPDF("p", "mm", "a4");

        const now = new Date();
        const fecha = now.toLocaleDateString();
        const hora = now.toLocaleTimeString();

        doc.setFontSize(13);
        doc.text("CONSTANCIA DE ENTREGA Y RECIBO DEL VEHÍCULO", 20, 18);
        doc.setFontSize(11);
        doc.text("CENTRO DE REVISIÓN TÉCNICO MECÁNICA", 20, 25);

        doc.setFontSize(10);
        doc.text(`Cliente: ${nombre}`, 20, 36);
        doc.text(`Placa: ${placa}`, 20, 42);
        doc.text(`Sede: ${sede}`, 20, 48);
        doc.text(`Fecha: ${fecha}   Hora: ${hora}`, 20, 54);

        doc.setFontSize(11);
        const texto = `
Yo, ${nombre}, declaro que al finalizar la inspección, recibo el vehículo identificado con la placa ${placa}, en las mismas condiciones generales en las que fue entregado al ingreso.

Manifiesto que recibí el vehículo a conformidad, y me fue entregado por el personal de la empresa sin nínguna alteración visible durante el tiempo de permanencia en la sede del CDA.

Así mismo, confirmo que tuve la oportunidad de verificar el estado general del vehículo antes de retirarlo, incluyendo sus condiciones exteriores y los elementos visibles del mismo, y que lo recibo a satisfacción.

En señal de conformidad con la entrega, firmo el presente documento, dejando constancia de la recepción del vehículo en condiciones adecuadas.


Fecha y hora de entrega: ${fecha} ${hora}
`.trim();

        const lines = doc.splitTextToSize(texto, 170);
        doc.text(lines, 20, 70);

        // Firma
        doc.setFontSize(12);
        doc.text("Firma del cliente:", 20, 175);
        doc.addImage(firmaBase64, "PNG", 20, 180, 80, 30);

        doc.line(20, 212, 120, 212);
        doc.setFontSize(10);
        doc.text(nombre, 20, 218);
        doc.text(`Placa: ${placa}`, 20, 223);

        return doc.output("blob");
    }

    function descargarBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(String(reader.result || ""));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
})();
