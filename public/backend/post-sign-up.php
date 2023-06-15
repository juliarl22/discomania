<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();


// Recoger valores 
$datosJSON = file_get_contents('php://input');

$datos = json_decode($datosJSON);
$passwordEncriptado = password_hash($datos->password,PASSWORD_DEFAULT);


$sql = "INSERT INTO `usuario`(`email`, `password`, `nombre`, `apellidos`, `direccion`, `telefono`, `iban`, `tipo`) VALUES ('$datos->email','$passwordEncriptado','$datos->nombre','$datos->apellidos','$datos->direccion','$datos->telefono','$datos->iban','U')";
$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));


if (!$resultado) {
    // responder($ok, $datos, $mensaje, $conexion)
    responder(false, null, "Error al registrar el usuario: " . mysqli_error($conexion), $conexion);
} else {

    // responder($ok, $datos, $mensaje, $conexion)
    // Respuesta si no hay error, no hay datos de vuelta
    responder(true, null, "OK", $conexion);
}
