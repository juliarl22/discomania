import *as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import config from '../config.js';
import { useState, useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import '../styles/commonStyles.css';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';


export default function ProductDetail({ handleAddProduct }) {
    const [imageError, setImageError] = useState(false);
    const { idproducto } = useParams();
    const [producto, setProducto] = useState({ idproducto: idproducto, nombre: "", descripcion: "", artistas: "", imagen: "", precio: 0 });

    // Recuperar los datos del producto a a editar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-producto-idproducto.php?idproducto=' + idproducto);

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {

                        setProducto(data.datos[0]);

                    } else {
                        alert('Error al recuperar los datos del producto. \n' + data.mensaje); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar los datos del producto.');
                }
            } catch (error) {
                alert('Error al recuperar los datos del producto');
                console.error('Error al recuperar los datos del producto:', error);
            }
        };

        fetchData();
    }, [idproducto]);

    const handleImageError = () => {
        setImageError(true);
    };

    function agregarProductoAlCarrito() {
        let carrito = []; // Contiene los datos de los productos y las unidades
        // Recuperar carrito previo
        if (sessionStorage['carrito']) {
            carrito = JSON.parse(sessionStorage['carrito']);
        }

        let lineasCarrito = carrito.filter((item, i) => item.producto.idproducto === producto.idproducto);

        if (lineasCarrito.length > 0) {
            // Estaba en el carrito anteriormente
            lineasCarrito[0].unidades++;
        } else {
            // No estaba en el carrito
            carrito.push({ producto: producto, unidades: 1 });
        }

        sessionStorage["carrito"] = JSON.stringify(carrito);
    }

    return (
        <>
            <BackButton />
            {producto ? (

                <Grid container sx={{ mt: 5, padding: 2 }}>
                    <Grid item xs={12} md={6} >

                        {imageError ? (
                            // Renderizar algo alternativo si la imagen no se pudo cargar
                            <CardMedia
                                component="img"
                                style={{ objectFit: 'contain', height: '600px' }}
                                src={config.imageFolder + 'sin-imagen'}
                                onError={handleImageError}
                                alt={producto.nombre}
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                style={{ objectFit: 'contain', height: '600px' }}
                                src={config.imageFolder + producto.idproducto}
                                onError={handleImageError}
                                alt={producto.nombre}
                            />
                        )}
                    </Grid>
                    <Grid container xs={12} md={6}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Nombre del disco" />
                                <CardContent>
                                    {producto.nombre}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} >
                            <Card>
                                <CardHeader title="Artistas" />
                                <CardContent>
                                    {producto.artistas}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} >
                            <Card>
                                <CardHeader title="Descripción" />
                                <CardContent>
                                    {producto.descripcion}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} >
                            <Card>
                                <CardHeader title="Categoria musical" />
                                <CardContent>
                                    {producto.categoria}
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={6} >
                            <Card sx={{ height: "128px" }}>
                                <CardHeader title="Precio" />
                                <CardContent>

                                    {parseFloat(producto.precio).toFixed(2) + " €"}

                                    <Button variant="outlined" sx={{ position: 'relative', top: '-40px', right: '-100px', zIndex: '9999' }} onClick={() => {
                                        agregarProductoAlCarrito();
                                        handleAddProduct();
                                    }}>
                                        <AddShoppingCartIcon color="primary" fontSize='large' />
                                    </Button>


                                </CardContent>
                            </Card>
                        </Grid>


                    </Grid>
                </Grid>
            ) : (
                <Typography variant="h4" align="center" sx={{ my: 2 }}>No hay detalle del producto</Typography>
            )
            }

        </>

    );
}
