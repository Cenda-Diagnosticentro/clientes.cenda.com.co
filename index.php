<?php
session_start();

// Si el usuario ya tiene una sesión activa, redirigirlo a la encuesta
if (isset($_SESSION['documentoAdmin'])) {
    header("Location: Src/Pages/Encuesta/encuesta.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>

<body>
    <script>
            // Redirige a la página deseada después de 7 segundos
        setTimeout(function () {
            window.location.href = 'Src/login/index.php'; // Reemplaza 'tu_pagina_destino.html' con la URL de la página a la que quieres redirigir
        }, 100); 
        
    </script>

</body>

</html>