<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recuperamos los parámetros de la petición
$email = $_GET['email'];

$email = mysqli_real_escape_string($conexion, $email);

if ($email == "todos@correo.com") {
    $sql = "SELECT t.idticket, t.idticket as id, t.email, t.fecha, SUM(l.preciounitario * l.unidades) AS importe_total FROM ticket t INNER JOIN linea l ON t.idticket = l.idticket GROUP BY t.idticket, id, t.email,t.fecha ORDER BY t.idticket ASC; ";
} else {
    $sql = "SELECT t.idticket, t.idticket as id, t.email, t.fecha, SUM(l.preciounitario * l.unidades) AS importe_total FROM ticket t INNER JOIN linea l ON t.idticket = l.idticket WHERE email = '$email' GROUP BY t.idticket, id, t.email,t.fecha ORDER BY t.idticket ASC; ";
}

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

if (!$resultado) {
    responder(false, null, "Error al recuperar los tickets de venta: " . mysqli_error($conexion), $conexion);
} else {

    $datos = []; // Creamos un array vacío
    //Recorremos los registros que ha devuelto la base de datos
    while ($fila = mysqli_fetch_assoc($resultado)) {
        // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
        $datos[] = $fila;
    }

    responder(true, $datos, "OK", $conexion);
}
