<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <script type="text/javascript" src="jsmain.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="../../Assets/Css/Encuesta/estiloLogin.css">


  <title>Login</title>
</head>

<body>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>

  <div class="card" id="container" >

    <div class="card-header">
      <img src="../../Assets/Img/cenda-footer.png" class="rounded" alt="Cinque Terre">
      <h3 class="card-title text-center mb-4">Iniciar Sesión</h3>
    </div>

    <div class="card-body" >
        <form" id="loginForm">
          <div class="mb-3 mt-3">
            <label for="email" class="form-label">Numero de Documento:</label>
            <input type="email" class="form-control" id="documento" placeholder="Numero de documento" required>
          </div>
          <div class="mb-3">
            <label for="pwd" class="form-label">Contraseña:</label>
            <input type="password" class="form-control" id="pwd" placeholder="**********" required>
          </div>
        </form>
    </div>

    <div class="card-footer">
      <button type="submit" class="btn btn-primary" onclick="login()">Continuar</button>
    </div>

  </div>

</body>
</html>