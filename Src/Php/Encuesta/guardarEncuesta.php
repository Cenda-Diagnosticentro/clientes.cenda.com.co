<?php
ob_start();
session_start();
include("../../../DB.php");

//Validar documento de la sesion iniciada
if (isset($_SESSION['documentoAdmin'])) {
    $documento = $_SESSION['documentoAdmin'];
    
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recuperar datos del formulario
    $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
    $celular = mysqli_real_escape_string($conn, $_POST['celular']);
    $placa = mysqli_real_escape_string($conn, $_POST['placa']);
    $sede = mysqli_real_escape_string($conn, $_POST['sede']);
    $atencion = mysqli_real_escape_string($conn, $_POST['atencion']);
    $comentarios = mysqli_real_escape_string($conn, $_POST['comentarios']);
    $idAdministrador = $documento;

    // Establecer la zona horaria a Suramérica / Bogotá
    date_default_timezone_set('America/Bogota');

    // Obtener la fecha y hora actuales
    $fechaActual = date("Y-m-d");
    $horaActual = date("H:i:s");

    // Establecer el porcentaje según la respuesta
    switch ($atencion) {
        case 'Muy buena atención':
            $porcentaje = 1;
            break;
        case 'Atención regular':
            $porcentaje = 0.5;
            break;
        case 'Mala atención':
            $porcentaje = 0;
            break;
        default:
            $porcentaje = 0;
            break;
    }

    // Consulta parametrizada para insertar datos en la tabla 'encuesta'
    $queryInsertEncuesta = "INSERT INTO encuesta (sede, fecha, hora, respuesta, porcentaje, nombreCliente, numeroCliente, placaCliente, comentario, idAdministrador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Preparar la consulta
    $stmt = mysqli_prepare($conn, $queryInsertEncuesta);

    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, "ssssdsssss", $sede, $fechaActual, $horaActual, $atencion, $porcentaje, $nombre, $celular, $placa, $comentarios, $idAdministrador);

    // Ejecutar la consulta
    $resultInsertEncuesta = mysqli_stmt_execute($stmt);

    // Cerrar la declaración
    mysqli_stmt_close($stmt);

    if (!$resultInsertEncuesta) {
        echo mysqli_error($conn);
    } else {
        header('Location: ../../Pages/Encuesta/encuesta.php?type=encuestaEnviada&success=true');
    }
} else {
    echo "nada";
}
?>