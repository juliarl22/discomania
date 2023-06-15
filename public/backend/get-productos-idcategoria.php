<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recuperamos los parámetros de la petición
$idcategoria = $_GET['idcategoria'];

if ($idcategoria == 0) {
    $sql = "SELECT p.*,c.nombre as categoria FROM producto as p, categoria as c WHERE p.idcategoria = c.idcategoria ORDER BY p.nombre ASC;";
} else {
    $sql = "SELECT p.*,c.nombre as categoria FROM producto as p, categoria as c WHERE p.idcategoria = c.idcategoria AND p.idcategoria= $idcategoria ORDER BY p.nombre ASC;";
}

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

if (!$resultado) {
    responder(false, null, "Error al recuperar los productos: " . mysqli_error($conexion), $conexion);
} else {

    $datos = []; // Creamos un array vacío
    //Recorremos los registros que ha devuelto la base de datos
    while ($fila = mysqli_fetch_assoc($resultado)) {
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $datos[] = $fila;
    }

    responder(true, $datos, "OK", $conexion);
}
