<?php
// Incluir un fichero para acceso a la base de datos
include('config.php');

// Creamos la conexión al servidor
$conexion = conectarBaseDatos();

// Recoger valores 
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$imagen = $_FILES['imagen'];
$idcategoria = $_POST['idcategoria'];

$nombre = mysqli_real_escape_string($conexion, $nombre);
$descripcion = mysqli_real_escape_string($conexion, $descripcion);

$sql = "UPDATE categoria SET  nombre = '$nombre', descripcion = '$descripcion' WHERE idcategoria = $idcategoria";
$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));


if (!$resultado) {
    // responder($ok, $datos, $mensaje, $conexion)
    responder(false, null, "Error al actualizar la categoría: " . mysqli_error($conexion), $conexion);
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
                // Esto puede que no sea un error
                // responder(false, null, 'No ha cargado ningún archivo', $conexion);
                responder(true, null, "Categoría actualizada, no la imagen", $conexion);
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

    //El image_id es el mismo que el idcategoria
    $image_id = $idcategoria;
    // Directorio de imagenes
    $dir = "../../public/uploads";

    // Ruta completa del archivo de imagen, se concatena cat-
    $file = $dir . '/cat-' . $image_id;

    // Si el fichero existe previamente, se borra
    if (file_exists($file)) {
        unlink($file);
    }

    // Guardar  la imagen en la ruta indicada
    switch ($type) {
        case IMAGETYPE_GIF:
            imagegif($image, $file);
            break;
        case IMAGETYPE_JPEG:
            imagejpeg($image, $file, 100);
            break;
        case IMAGETYPE_PNG:
            imagepng($image, $file);
            break;
    }
    imagedestroy($image);

    // responder($ok, $datos, $mensaje, $conexion)
    // Respuesta si no hay error, no hay datos de vuelta
    responder(true, null, "Categoria actualizada con imagen incluida", $conexion);
}
