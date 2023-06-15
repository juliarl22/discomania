export function isAdmin() {
    let tipoUsuario;

    if (sessionStorage["usuario"]) { // Si está definido el usuario
        tipoUsuario = JSON.parse(sessionStorage["usuario"]).tipo;

        if (tipoUsuario === "A")
            return true;
        else
            return false;
    } else {
        return false; // Si no está logueado tampoco es administrador
    }
}

export function isLogin() {
    if (sessionStorage["usuario"])  // Si hay un usuario logueado
        return true;
    else
        return false;
}

export function userEmail() {
    let email = "";

    if (sessionStorage["usuario"])  // Si está definido el usuario
        email = JSON.parse(sessionStorage["usuario"]).email;

    return email;
}

export function userNombre() {
    let nombre = "";

    if (sessionStorage["usuario"])  // Si está definido el usuario
        nombre = JSON.parse(sessionStorage["usuario"]).nombre;

    return nombre;
}

export function calcularUnidades() {
    let carrito = []; // Contiene los datos de los productos y las unidades
    // Recuperar carrito previo
    if (sessionStorage['carrito']) {
        carrito = JSON.parse(sessionStorage['carrito']);
    }

    let totalUnidades = 0;

    for (let item of carrito) {
        totalUnidades += item.unidades;
    }

    return totalUnidades;
}

export function logout() {
    sessionStorage.removeItem('carrito');
    sessionStorage.removeItem('usuario');
}

export function isUserAuthorized(pagina) {

    let datosUsuario;
    let respuesta = false;

    // Recuperar datos del usuario
    if (sessionStorage["usuario"]) {
        datosUsuario = JSON.parse(sessionStorage["usuario"]);
    }

    // Recuperamos el acceso permitido a la página
    const accesoPermitido = mapaAccesos().get(pagina);

    switch (accesoPermitido) {
        case "T":
            respuesta = true;
            break;
        case "A":
            if (isLogin() && datosUsuario.tipo === "A")
                respuesta = true;
            else
                respuesta = false;
            break;
        case "U":
            if (!isLogin() || (isLogin() && datosUsuario.tipo !== "A"))
                respuesta = true;
            else
                respuesta = false;
            break;
        case "AU":
            if (isLogin())
                respuesta = true;  // VALIDACIÓN SEGÚN DATOS USUARIO
            else
                respuesta = false;
            break;
        default:
            respuesta = false;
            break;
    }

    return respuesta;
}

function mapaAccesos() {
    // Mapa de accesos permitidos a las páginas
    const accesosPermitidos = new Map();

    // Todos los usuarios
    accesosPermitidos.set("categorycardlist", "T");
    accesosPermitidos.set("productcardlist", "T");
    accesosPermitidos.set("productdetail", "T");
    accesosPermitidos.set("shoppinglist", "T");

    // Solo el administrador
    accesosPermitidos.set("userslist", "A");
    accesosPermitidos.set("category", "A");
    accesosPermitidos.set("categorieslist", "A");
    accesosPermitidos.set("editcategory", "A");
    accesosPermitidos.set("editproduct", "A");
    accesosPermitidos.set("product", "A");
    accesosPermitidos.set("productslist", "A");

    // Todos menos admin, incluso no logados
    accesosPermitidos.set("checkout", "U");

    // Admin y mismo usuario logueado
    accesosPermitidos.set("edituser", "AU");
    accesosPermitidos.set("ticketprint", "AU");
    accesosPermitidos.set("ticketslist", "AU");

    return accesosPermitidos;
}


