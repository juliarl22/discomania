<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recoger valores ;
$usuario = json_decode($_POST['usuario'], true);
$items = json_decode($_POST['items'], true);

// Fecha de hoy del pedido
$hoy = date('Y-m-d H:i:s');

$sql = "INSERT INTO `ticket`( `idticket`, `email`, `fecha`) VALUES (null , '" . $usuario["email"] . "', '$hoy')";
$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));


if (!$resultado) {
    // responder($ok, $datos, $mensaje, $conexion)
    responder(false, null, "Error al registrar el ticket de venta: " . mysqli_error($conexion), $conexion);
} else {
    ////// INSERTAR LÍNEAS

    // Recuperar el  idticket generado automáticamente por MySQL al insertar
    // el nuevo registro de pedido
    $idticket = mysqli_insert_id($conexion);

    // Utilizamos una sentencia preparada 
    $sentencia = $conexion->stmt_init();

    $sql = "INSERT INTO `linea`(`idlinea`, `idproducto`, `idticket`, `unidades`, `preciounitario`) VALUES (null,?,?,?,?)";

    $sentencia->prepare($sql);

    for ($i = 0; $i < count($items); $i++) {
        $item = $items[$i];
        $producto = $item['producto'];
        $unidades = $item['unidades'];
        $sentencia->bind_param('iiid', $producto['idproducto'], $idticket,  $unidades, $producto['precio']);
        $sentencia->execute();
    }

    // responder($ok, $datos, $mensaje, $conexion)
    // Respuesta si no hay error, no hay datos de vuelta
    responder(true, $idticket, "OK", $conexion);
}
