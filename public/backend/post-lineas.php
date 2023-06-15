<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();


// Recoger valores 
$datosJSON = file_get_contents('php://input');

$datos = json_decode($datosJSON);


$sql = "INSERT INTO `linea`( `idlinea`, `idproducto`, `idticket`, `unidades`, `preciounitario`) VALUES ('$datos->idlinea', '$datos->idproducto', '$datos->idticket', '$datos->unidades', '$datos->preciounitario')";
$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));


if (!$resultado) {
    // responder($ok, $datos, $mensaje, $conexion)
    responder(false, null, "Error al registrar la línea de ticket: " . mysqli_error($conexion), $conexion);
} else {

    // responder($ok, $datos, $mensaje, $conexion)
    // Respuesta si no hay error, no hay datos de vuelta
    responder(true, null, "OK", $conexion);
}
