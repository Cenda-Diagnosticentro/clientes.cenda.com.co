<?php
include('../../../DB.php');
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../../Assets/Css/Encuesta/style.css">
    <title>Encuesta de Satisfacción</title>
</head>

<script>
    function showMessage(type, success) {
        if (type === 'encuestaEnviada') {
            if (success === 'true') {
                Swal.fire('¡Muy bien!', 'Gracias por tus respuestas, nos ayudará a mejorar nuestros servicios', 'success');
            } else {
                Swal.fire('Error', 'Ha ocurrido algún error al enviar la encuesta', 'error');
            }
        }
    }
</script>

<body>

    <?php
    if (isset($_GET['success'])) {
        $success = $_GET['success'];
        $type = isset($_GET['type']) ? $_GET['type'] : '';
        echo "<script>showMessage('$type', '$success');</script>";
        echo '<script>
                var newurl = window.location.href.split("?")[0];
                window.history.replaceState({}, document.title, newurl);
              </script>';
    }
    ?>

    <div class="container">
        <h2>Encuesta de Satisfacción</h2>

        <form action="../../Php/Encuesta/guardarEncuesta.php" method="post" onsubmit="return validarFormulario()">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingresa tu nombre" required autocomplete="off">
            </div>

            <div class="form-group">
                <label for="celular">Número de Celular:</label>
                <input type="tel" class="form-control" id="celular" name="celular" placeholder="Ingresa tu número de celular" required autocomplete="off">
            </div>

            <div class="form-group">
                <label for="placa">Placa del Vehículo:</label>
                <input type="text" class="form-control" id="placa" name="placa" placeholder="Ingresa la placa del vehículo" oninput="this.value = this.value.toUpperCase()" required autocomplete="off">
            </div>

            <div class="form-group">
                <label for="sede">¿En cuál sede estás? Selecciona abajo:</label>
                <select id="sede" name="sede" class="form-control" required>
                    <option value="" disabled selected>Presiona aquí para seleccionar una sede</option>
                    <?php
                    $query = "SELECT * FROM sede";
                    $result = mysqli_query($conn, $query);
                    while ($row = mysqli_fetch_assoc($result)) { ?>
                        <option value="<?php echo $row['nombre']; ?>"><?php echo $row['nombre']; ?></option>
                    <?php } ?>
                </select>
            </div>

            <div class="form-group">
                <label for="atencion">¿Cómo fue la atención recibida en general?</label>
                <div class="d-flex justify-content-around">
                    <button type="button" class="btn btn-success btn-lg btn-circle btn-opcion" onclick="seleccionarOpcion('excelente', 1)" id="btnExcelente">
                        <img src="../../../Assets/Img/contento.png" alt="" width="40">
                    </button>
                    <button type="button" class="btn btn-warning btn-lg btn-circle btn-opcion" onclick="seleccionarOpcion('serio', 0.5)" id="btnSerio">
                        <img src="../../../Assets/Img/serio.png" alt="" width="40">
                    </button>
                    <button type="button" class="btn btn-danger btn-lg btn-circle btn-opcion" onclick="seleccionarOpcion('malo', 0)" id="btnMalo">
                        <img src="../../../Assets/Img/infeliz.png" alt="" width="40">
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label for="comentarios">Comentarios adicionales:</label>
                <textarea class="form-control" id="comentarios" name="comentarios" rows="4" placeholder="Escribe tus comentarios" autocomplete="off"></textarea>
            </div>

            <div class="text-center">
                <label for="labelCalificacion">Tus calificaciones:</label>
                <p id="labelCalificacion"></p>
            </div>

            <input type="hidden" id="atencion" name="atencion" value="">
            <button type="submit" class="btn btn-primary btn-block">Enviar Encuesta</button>
        </form>

    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    <script src="../../Js/Pages/Encuesta/encuesta.js"></script>

</body>

</html>
