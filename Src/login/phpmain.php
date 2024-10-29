<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "cenda_testsoft";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Conexión fallida: ' . $conn->connect_error]));
}

// Verificar si se han enviado datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $documento = $_POST['documento'];
    $contraseña = $_POST['pwd'];

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare("SELECT pass FROM administradores WHERE username = ?");
    $stmt->bind_param("s", $documento);
    $stmt->execute();
    $stmt->store_result();

    // Verificar si el usuario existe
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verificar la contraseña
        if (password_verify($contraseña, $hashed_password)) {
            echo json_encode(['status' => 'success', 'message' => 'Inicio de sesión exitoso.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado.']);
    }

    $stmt->close();
}

$conn->close();
?>
