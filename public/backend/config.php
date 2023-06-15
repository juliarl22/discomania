<?php
/* Array asociativo con la configuración de conexión a la base de datos */
$basedatos = array(
	"basedatos" => "tiendadiscos",
	"usuario" => "root",
	"password" => "",
	"servidor" => "127.0.0.1",
	"puerto" => 3306
);

/* ERROR REPORTING */
//Indica que sólo se mostrarán errores, no Warnings ni otros errores.
//Valores posibles: E_ERROR | E_WARNING | E_PARSE | E_NOTICE
error_reporting(E_ERROR);

// Reporte de errores para mysql
mysqli_report(MYSQLI_REPORT_OFF);

function conectarBaseDatos()
{
	global $basedatos; //recuperamos el array con la conexión

	$conexion = mysqli_connect($basedatos["servidor"], $basedatos["usuario"], $basedatos["password"], $basedatos["basedatos"]) or die(mysqli_error($conexion));
	// $conexion = new mysqli($basedatos["servidor"], $basedatos["usuario"], $basedatos["password"], $basedatos["basedatos"], $basedatos["puerto"]) ;

	if ($conexion->connect_errno) {
		responder(false, null, "Error al conectar a la base de datos. \nCompruebe los parámetros de la conexión: " .
			$conexion->connect_error . " Código de error: " . $conexion->connect_errno, $conexion);
	}

	mysqli_set_charset($conexion, "utf8");
	//Si no se produjo un error devolvemos el objeto de la conexión
	return $conexion;
}

function responder($ok, $datos, $mensaje, $conexion)
{
	$respuesta["ok"] = $ok;
	$respuesta["datos"] = $datos;
	$respuesta["mensaje"] = $mensaje;

	//mandamos la respuesta
	echo json_encode($respuesta);

	// Cerramos la conexión
	mysqli_close($conexion);

	// Finalizar el proceso el servidor con indicador de éxito o fallo
	if ($ok) {
		exit(0);
	} else {
		exit(1);
	}
}

/*
Devuelve:
0 Si el usuario y la contraseña son correctos
1 Si el usuario existe y la contraseña está mal
2 Si el usuario no existe
3 Si ha dejado algún campo vacio
4 otro error
*/
function comprobarUsuario(
	$email,
	$password
) {
	global $conexion;
	if (($email == "") || ($password == "")) {
		$devuelve = 3;
	} else {
		/* Evitar inyecciones SQL usando sentencias preparadas*/
		$sentencia = $conexion->stmt_init();

		$cadenaSql = "SELECT * FROM usuario WHERE email = ?";

		$sentencia->prepare($cadenaSql);
		$sentencia->bind_param("s", $email);
		$sentencia->execute();
		$resultado = $sentencia->get_result();

		if (!$sentencia) {
			$devuelve = 4;
		} else {
			if ($resultado->num_rows > 0) {
				$fila = $resultado->fetch_assoc();

				if (password_verify($password, $fila['password']))
					$devuelve = 0;
				else
					$devuelve = 1;
			} else {
				$sentencia->close();
				unset($sentencia);
				$sentencia = $conexion->stmt_init();

				$consulta = "SELECT COUNT(*) as cuenta FROM usuario WHERE email = ?";

				$sentencia->prepare($consulta);
				$sentencia->bind_param("s", $email);
				$sentencia->execute();
				/*en vez de bind_result uso ahora el método get_result */
				$result = $sentencia->get_result();
				$fila = $result->fetch_array();
				$num_filas = $fila["cuenta"];
				if (!$result) {
					$devuelve = 4;
				} elseif ($num_filas > 0) {
					$devuelve = 1;
				} else {
					$devuelve = 2;
				}
			}
		}
	}
	return $devuelve;
}


function recuperarDatosUsuario($email)
{

	global $conexion;

	$sql = "SELECT * FROM usuario WHERE email = '$email';";

	$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

	if (!$resultado) {
		responder(false, null, "Error al recuperar los datos del usuario" . mysqli_error($conexion), $conexion);
	} else {

		$datos = []; // Creamos un array vacío
		$fila = mysqli_fetch_assoc($resultado);

		return $fila;
	}
}
