<?php


error_reporting(E_ALL); // Reporta todos los errores
ini_set('display_errors', 1);

if (!isset($_SESSION['documentoAdmin'])) { 
   header("Location: ../../../login/login.php");
   exit;

}
?>
