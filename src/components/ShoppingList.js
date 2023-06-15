import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config.js';

const ShoppingList = ({ handleCountProducts }) => {
    const [shoppingItems, setShoppingItems] = useState(recuperarCarrito());

    function recuperarCarrito() {
        let carrito = []; // Contiene los datos de los productos y las unidades
        // Recuperar carrito previo
        if (sessionStorage['carrito']) {
            carrito = JSON.parse(sessionStorage['carrito']);
        }
        return carrito;
    }

    function calcularTotal() {
        let carrito = recuperarCarrito();

        let total = 0;

        for (let item of carrito) {
            total += item.producto.precio * item.unidades;
        }

        return total;
    }

    const handleIncrement = (itemId) => {
        let carrito = recuperarCarrito();

        let lineasCarrito = carrito.filter((item, i) => item.producto.idproducto === itemId);

        lineasCarrito[0].unidades++;

        sessionStorage["carrito"] = JSON.stringify(carrito);

        handleCountProducts();
        setShoppingItems(carrito);

    };

    const handleDecrement = (itemId) => {
        let carrito = recuperarCarrito();

        let lineasCarrito = carrito.filter((item, i) => item.producto.idproducto === itemId);

        if (lineasCarrito[0].unidades > 1) {
            lineasCarrito[0].unidades--;

            sessionStorage["carrito"] = JSON.stringify(carrito);

            handleCountProducts();
            setShoppingItems(carrito);
        }
    };

    const handleDelete = (itemId) => {
        let carrito = recuperarCarrito();

        let lineasCarrito = carrito.filter((item, i) => item.producto.idproducto !== itemId);

        sessionStorage["carrito"] = JSON.stringify(lineasCarrito);

        handleCountProducts();
        setShoppingItems(lineasCarrito);
    }

    const handleDeleteCart = (itemId) => {
        sessionStorage["carrito"] = JSON.stringify([]);

        handleCountProducts();
        setShoppingItems([]);
    }

    const handleImageError = (event) => {
        event.target.onerror = null; // prevents looping
        event.target.src = config.imageFolder + 'sin-imagen.jpg';
    };

    return (
        <>
            <Typography variant="h4" align="center" sx={{ my: 3 }}>Discos en el carrito</Typography>

            {shoppingItems.length === 0 ? (
                <Typography variant="h6" align="center">No hay ningún disco en el carrito</Typography>
            ) : (
                <>
                    <TableContainer component={Paper} sx={{ p: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Portada</TableCell>
                                    <TableCell size="small">Nombre</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Unidades</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
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
                                            <IconButton size="small" onClick={() => handleIncrement(item.producto.idproducto)}>
                                                <AddIcon />
                                            </IconButton>
                                            {item.unidades}
                                            <IconButton size="small" onClick={() => handleDecrement(item.producto.idproducto)}>
                                                <RemoveIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            {(parseFloat(item.producto.precio) * parseFloat(item.unidades)).toFixed(2) + " €"}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" onClick={() => handleDelete(item.producto.idproducto)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow key="total">
                                    <TableCell colSpan={4} align="right">Total</TableCell>
                                    <TableCell align="right">{calcularTotal().toFixed(2) + " €"}</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Container maxWidth="xs">
                        <Link to="/checkout">
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                                startIcon={<ShoppingCartCheckoutIcon />}
                            >
                                Comprar

                            </Button>
                        </Link>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{}}
                            onClick={() => handleDeleteCart()}
                            startIcon={<RemoveShoppingCartIcon />}
                        >

                            Vaciar carrito

                        </Button>
                    </Container>
                </>
            )}
        </>
    );
};

export default ShoppingList;
