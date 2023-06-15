<?php
// Configuración acceso a base de datos
require_once('config.php');
// Manejo de sesiones 
include('manage-sessions.php');

// Solo el administrador puede acceder a este método de la API
session_cache_limiter();
session_start();
comprobarSesionAdmin();

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recuperamos los parámetros de la petición
// No hay en esta llamada

$sql = "SELECT  c.idcategoria as imagencat,c.nombre , c.descripcion, c.idcategoria FROM categoria as c ORDER BY c.nombre ASC;";

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

if (!$resultado) {
    responder(false, null, "Error al recuperar las categorías: " . mysqli_error($conexion), $conexion);
} else {

    $datos = []; // Creamos un array vacío
    //Recorremos los registros que ha devuelto la base de datos
    while ($fila = mysqli_fetch_assoc($resultado)) {
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $datos[] = $fila;
    }

    responder(true, $datos, "OK", $conexion);
}
