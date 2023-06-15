import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Button from '@mui/material/Button';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import config from '../config.js';
import { isLogin } from '../js/Utils.js';


const Checkout = () => {
    const [shoppingItems, setShoppingItems] = useState(recuperarCarrito());
    const [datosUsuario, setDatosUsuario] = useState(recuperarUsuario());
    const navigate = useNavigate();



    const handleCheckoutTicket = async () => {
        const data = new FormData();
        data.append('items', JSON.stringify(shoppingItems));
        data.append('usuario', JSON.stringify(datosUsuario));

        console.log('Datos del FormData:');
        for (let pair of data.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }


        let response = await fetch(config.apiUrl + 'post-ticket.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        })
        if (response.ok) {
            let datos = await response.json();

            if (datos.ok) {
                alert('Ticket registrado correctamente.');

                window.open(config.home + "ticketprint/" + datos.datos);
                vaciarCarrito();
                navigate("/");

            } else {
                alert('Ha habido un error al registrar la compra.'); // datos del error en consola
                console.error(datos.mensaje);
            }

        } else {
            alert('Ha habido un error al registrar la compra.');
        }
    };

    function recuperarCarrito() {
        let carrito = []; // Contiene los datos de los productos y las unidades
        // Recuperar carrito previo
        if (sessionStorage['carrito']) {
            carrito = JSON.parse(sessionStorage['carrito']);
        }
        return carrito;
    }

    function vaciarCarrito() {
        sessionStorage["carrito"] = JSON.stringify([]);
    }

    function recuperarUsuario() {
        let usuario = {}; // Contiene los datos del usuario
        // Recuperar carrito previo
        if (sessionStorage['usuario']) {
            usuario = JSON.parse(sessionStorage['usuario']);
        }
        return usuario;
    }


    function calcularTotal() {
        let carrito = recuperarCarrito();

        let total = 0;

        for (let item of carrito) {
            total += item.producto.precio * item.unidades;
        }

        return total;
    }

    const handleImageError = (event) => {
        event.target.onerror = null; // prevents looping
        event.target.src = config.imageFolder + 'sin-imagen.jpg';
    };

    return (
        <>
            {shoppingItems.length === 0 ? (
                <Typography variant="h4" align="center" sx={{ my: 3 }}>No hay ninguna compra que validar</Typography>
            ) : (
                <>
                    <Grid container sx={{ my: 3 }}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h4" align="center" >Datos del comprador</Typography>
                            <Typography variant="h6" align="center">Verifique los datos de contacto, envío y pago</Typography>
                            <Grid container sx={{ my: 3 }}>
                                <Grid xs={2}></Grid>
                                <Grid item xs={10}>
                                    <List dense>
                                        <ListItem>
                                            <ListItemText primary="Email" secondary={datosUsuario.email} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Nombre" secondary={datosUsuario.nombre} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Apellidos" secondary={datosUsuario.apellidos} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Dirección" secondary={datosUsuario.direccion} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Teléfono" secondary={datosUsuario.telefono} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="IBAN" secondary={datosUsuario.iban} />
                                        </ListItem>
                                    </List>
                                </Grid>

                            </Grid>

                        </Grid>
                        <Grid item xs={12} md={8} sx={{ my: 3 }}>
                            <Typography variant="h4" align="center">Discos en el carrito</Typography>
                            <TableContainer component={Paper} sx={{ my: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Portada</TableCell>
                                            <TableCell size="small">Nombre</TableCell>
                                            <TableCell align="right">Precio</TableCell>
                                            <TableCell align="right">Unidades</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {shoppingItems.map((item) => (
                                            <TableRow key={item.producto.idproducto}>
                                                <TableCell>
                                                    <img src={config.imageFolder + item.producto.idproducto} alt={item.producto.nombre} width="50" height="50" onError={handleImageError} />
                                                </TableCell>
                                                <TableCell size="small">
                                                    {item.producto.nombre}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {parseFloat(item.producto.precio).toFixed(2) + " €"}
                                                </TableCell>
                                                <TableCell align="right">

                                                    {item.unidades}

                                                </TableCell>
                                                <TableCell align="right">
                                                    {(parseFloat(item.producto.precio) * parseFloat(item.unidades)).toFixed(2) + " €"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow key="total">
                                            <TableCell colSpan={4} align="right">Total</TableCell>
                                            <TableCell align="right">{calcularTotal().toFixed(2) + " €"}</TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>


                    <Container maxWidth="xs" sx={{ my: 3 }}>

                        {isLogin() && (

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                                onClick={() => handleCheckoutTicket()}
                                startIcon={<ShoppingCartCheckoutIcon />}
                            >

                                Tramitar compra

                            </Button>



                        )}

                        <Link to='/shoppinglist'>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mb: 1 }}
                                startIcon={<ProductionQuantityLimitsIcon />}
                            >

                                Revisar carrito

                            </Button>
                        </Link>
                        {isLogin() ? (
                            <Link to={'/edituser/' + datosUsuario.email}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 1 }}
                                    startIcon={<AccountCircleIcon />}

                                >

                                    Modificar mis datos

                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link to={'/login'}>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mb: 1 }}
                                        startIcon={<LoginIcon />}
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to={'/register'}>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mb: 1 }}
                                        startIcon={<PersonAddIcon />}
                                    >
                                        Regístrate
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Container>
                </>
            )}
        </>
    );
};

export default Checkout;
