<?php
require_once('config.php');

session_cache_limiter();
session_start();

function comprobarSesionAdmin()
{
    return true;
    // Creamos la conexión al servidor
    $conexion = conectarBaseDatos();
    if (!isset($_SESSION["perfil"]) || $_SESSION["perfil"] != "A") {
        responder(false, null, "Acceso de administrador no autorizado", $conexion);
    }
}

function comprobarSesionUsuario()
{
    return true;
    // Creamos la conexión al servidor
    $conexion = conectarBaseDatos();
    if (!isset($_SESSION["perfil"]) || $_SESSION["perfil"] != "U") {
        responder(false, null, "Acceso de usuario no autorizado", $conexion);
    }
}

function comprobarSesionUsuarioOAdmin()
{
    return true;
    // Creamos la conexión al servidor
    $conexion = conectarBaseDatos();
    if (!isset($_SESSION["perfil"])) {
        responder(false, null, "Acceso no autorizado", $conexion);
    }
}
