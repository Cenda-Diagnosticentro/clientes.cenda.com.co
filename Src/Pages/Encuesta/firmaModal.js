(function () {
    const canvas = document.getElementById("canvasFirma");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const btnLimpiar = document.getElementById("btnLimpiarFirma");
    const firmaBase64Input = document.getElementById("firmaBase64");

    let drawing = false;
    let hasStrokes = false;

    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Ajuste real de pixeles para que no salga borroso
        canvas.width = Math.floor(rect.width * ratio);
        canvas.height = Math.floor(rect.height * ratio);

        // Escala para dibujar con coordenadas "normales"
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
    }

    function getPos(evt) {
        const rect = canvas.getBoundingClientRect();
        const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function start(evt) {
        drawing = true;
        const p = getPos(evt);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        evt.preventDefault();
    }

    function move(evt) {
        if (!drawing) return;
        const p = getPos(evt);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        hasStrokes = true;
        evt.preventDefault();
    }

    function end(evt) {
        drawing = false;
        evt.preventDefault();
    }

    function clear() {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
        hasStrokes = false;
        if (firmaBase64Input) firmaBase64Input.value = "";
    }

    function exportBase64() {
        const dataUrl = canvas.toDataURL("image/png");
        if (firmaBase64Input) firmaBase64Input.value = dataUrl;
        return dataUrl;
    }

    // Exponer para pdfContrato.js
    window.FirmaCanvas = {
        resizeCanvas,
        clear,
        exportBase64,
        hasStrokes: () => hasStrokes,
    };

    // Mouse
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);

    // Touch
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end, { passive: false });

    btnLimpiar?.addEventListener("click", clear);

    // Ajustar canvas al abrir el modal
    if (window.jQuery) {
        $("#modalContrato").on("shown.bs.modal", function () {
            resizeCanvas();
        });

        // opcional: al cerrar, limpiar y desmarcar checkbox
        $("#modalContrato").on("hidden.bs.modal", function () {
            // clear(); // si quieres que se borre siempre al cerrar, descomenta
        });
    } else {
        window.addEventListener("load", resizeCanvas);
    }

    window.addEventListener("resize", resizeCanvas);
})();
