<?php
// Configuración acceso a base de datos
require_once('config.php');
// Manejo de sesiones 
include('manage-sessions.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recuperamos los parámetros de la petición
$email = $_GET['email'];
$password = $_GET['password'];

$resultado = comprobarUsuario($email, $password);

/*
Devuelve:
0 Si el usuario y la contraseña son correctos
1 Si el usuario existe y la contraseña está mal
2 Si el usuario no existe
3 Si ha dejado algún campo vacio
4 otro error
*/

if ($resultado == 0) {
    $datosUsuario = recuperarDatosUsuario($email);

    $_SESSION["perfil"] = $datosUsuario["tipo"];
    $_SESSION["email"] = $email;

    responder(true, $datosUsuario, "Login correcto" . $_SESSION['perfil'], $conexion);
} else if ($resultado == 1) {
    responder(false, null, "La password no es correcta", $conexion);
} else if ($resultado == 2) {
    responder(false, null, "El usuario no existe", $conexion);
} else if ($resultado == 3) {
    responder(false, null, "Email o password estaban vacíos", $conexion);
} else {
    responder(false, null, "Error al hacer login: " . mysqli_error($conexion), $conexion);
}
