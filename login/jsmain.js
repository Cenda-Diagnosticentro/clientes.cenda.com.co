function login() {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const documento = document.getElementById('documento').value;
    const pwd = document.getElementById('pwd').value;

    if (!documento || !pwd) {
        // SweetAlert solicitando diligenciar campos
        Swal.fire({
            icon: 'warning',
            title: 'Campos obligatorios',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }


    // Enviar los datos al servidor usando fetch
    fetch('phpmain.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'documento': documento,
            'pwd': pwd
        })
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.status === 'success') {
            // Redirigir a otra página si el inicio de sesión es exitoso
            console.log("entro1");
            window.location.href = '../Src/Pages/Encuesta/encuesta.php'; 
        } else {
            // Mostrar SweetAlert con el mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al procesar tu solicitud.',
        });
    });
}





   

