<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recuperamos los parámetros de la petición
$idticket = $_GET['idticket'];

$sql = "SELECT *,u.nombre as nombrecliente FROM ticket AS t, usuario AS u, linea AS l, producto as p WHERE t.idticket = $idticket AND t.email = u.email AND l.idticket = t.idticket AND l.idproducto = p.idproducto ORDER BY l.idlinea ASC;";

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

if (!$resultado) {
    responder(false, null, "Error al recuperar los datos del ticket $idticket : " . mysqli_error($conexion), $conexion);
} else {

    $datos = []; // Creamos un array vacío
    //Recorremos los registros que ha devuelto la base de datos
    while ($fila = mysqli_fetch_assoc($resultado)) {
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $datos[] = $fila;
    }

    responder(true, $datos, "OK", $conexion);
}
