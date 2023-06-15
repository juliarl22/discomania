<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();


// Recoger valores 
$idcategoria = $_POST['idcategoria'];
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$artistas = $_POST['artistas'];
$imagen = $_FILES['imagen'];
$precio = $_POST['precio'];


$sql = "INSERT INTO `producto`(`idproducto`, `idcategoria`, `nombre`, `descripcion`, `artistas`, `imagen`, `precio`) VALUES (null, $idcategoria, '$nombre', '$descripcion','$artistas', '', $precio)";
// echo $sql;
$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));


if (!$resultado) {
    // responder($ok, $datos, $mensaje, $conexion)
    responder(false, null, "Error al registrar el producto: " . mysqli_error($conexion), $conexion);
} else {
    // Revisamos errores en la subida del fichero de la imagen
    if ($_FILES['imagen']['error'] != UPLOAD_ERR_OK) {
        switch ($_FILES['imagen']['error']) {
            case UPLOAD_ERR_INI_SIZE:
                responder(false, null, 'El tamaño de la imagen cargada excede el permitido por la directiva  upload_max_filesize establecida en php.ini. ', $conexion);

                break;
            case UPLOAD_ERR_FORM_SIZE:
                responder(false, null, 'El tamaño de la imagen cargada excede el permitido por la directiva  MAX_FILE_SIZE establecida en  el formulario HTML.', $conexion);

                break;
            case UPLOAD_ERR_PARTIAL:
                responder(false, null, 'El archivo se ha cargado parcialmente ', $conexion);
                break;
            case UPLOAD_ERR_NO_FILE:
                // No es un error, puede haber productos sin portada
                responder(true, null, 'Alta de producto sin imagen', $conexion);
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                responder(false, null, 'No se encuentra el directorio temporal del servidor', $conexion);
                break;
            case UPLOAD_ERR_CANT_WRITE:
                responder(false, null, 'El servidor ha fallado al intentar escribir el archivo en el disco', $conexion);
                break;
            case UPLOAD_ERR_EXTENSION:
                responder(false, null, 'Subida detenida por la extensión', $conexion);
                break;
        }
    }

    // Recuperamos los atributos de la imagen
    list($width, $height, $type, $attr) = getimagesize($_FILES['imagen']['tmp_name']);

    // Asegurarse de que el archivo cargado es un tipo de imagen admitido
    $error = 'El archivo que vd. ha subido no es de un tipo soportado';
    switch ($type) {
        case IMAGETYPE_GIF:
            $image = imagecreatefromgif($_FILES['imagen']['tmp_name']) or
                responder(false, null, $error, $conexion);
            $ext = '.gif';
            break;
        case IMAGETYPE_JPEG:
            $image = imagecreatefromjpeg($_FILES['imagen']['tmp_name']) or
                responder(false, null, $error, $conexion);
            $ext = '.jpg';
            break;
        case IMAGETYPE_PNG:
            $image = imagecreatefrompng($_FILES['imagen']['tmp_name']) or
                responder(false, null, $error, $conexion);
            $ext = '.png';
            break;
        default:
            responder(false, null, $error, $conexion);;;
    }

    //Recuperar el  image_id generado automáticamente por MySQL al insertar
    //el nuevo registro de productos
    $last_id = mysqli_insert_id($conexion);
    $image_id = $last_id;
    // Directorio de imagenes
    $dir = "../../public/uploads";
    // Guardar  la imagen en la ruta indicada
    switch ($type) {
        case IMAGETYPE_GIF:
            imagegif($image, $dir . '/' . $image_id);
            break;
        case IMAGETYPE_JPEG:
            imagejpeg($image, $dir . '/' . $image_id, 100);
            break;
        case IMAGETYPE_PNG:
            imagepng($image, $dir . '/' . $image_id);
            break;
    }
    imagedestroy($image);

    // responder($ok, $datos, $mensaje, $conexion)
    // Respuesta si no hay error, no hay datos de vuelta
    responder(true, null, "OK", $conexion);
}
