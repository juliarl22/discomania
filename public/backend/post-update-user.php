<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recoger valores  
$email = $_POST['email'];
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];
$iban = $_POST['iban'];

$email = mysqli_real_escape_string($conexion, $email);
$nombre = mysqli_real_escape_string($conexion, $nombre);
$apellidos = mysqli_real_escape_string($conexion, $apellidos);
$direccion = mysqli_real_escape_string($conexion, $direccion);
$telefono = mysqli_real_escape_string($conexion, $telefono);
$iban = mysqli_real_escape_string($conexion, $iban);

if (isset($_POST['password'])) {
    $password = $_POST['password'];
    $passwordEncriptado = password_hash($password, PASSWORD_DEFAULT);

    $sql = "UPDATE usuario SET password = '$passwordEncriptado', nombre = '$nombre', apellidos = '$apellidos' ,direccion = '$direccion', telefono = '$telefono' , iban = '$iban' WHERE email = '$email'";
} else {
    $sql = "UPDATE usuario SET nombre = '$nombre', apellidos = '$apellidos', direccion = '$direccion', telefono = '$telefono', iban = '$iban' WHERE email = '$email'";
}
// echo $sql;
$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));


if (!$resultado) {
    // responder($ok, $datos, $mensaje, $conexion)
    responder(false, null, "Error al actualizar usuario: " . mysqli_error($conexion), $conexion);
} else {

    // responder($ok, $datos, $mensaje, $conexion)
    // Respuesta si no hay error, no hay datos de vuelta
    responder(true, null, "Usuario actualizado", $conexion);
}
