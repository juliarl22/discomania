import *as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import config from '../config.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import '../styles/commonStyles.css';

export default function ProductCard({ producto, handleAddProduct }) {
    const [imageError, setImageError] = useState(false);

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
        <Card sx={{ width: 360 }} className="product-card" >
            <CardHeader
                title={producto.nombre}
            />
            <Link to={"/productdetail/" + producto.idproducto}>
                {imageError ? (
                    // Renderizar algo alternativo si la imagen no se pudo cargar
                    <CardMedia
                        component="img"
                        style={{ objectFit: 'contain', height: '250px' }}
                        src={config.imageFolder + 'sin-imagen'}
                        onError={handleImageError}
                        alt={producto.nombre}
                    />
                ) : (
                    <CardMedia
                        component="img"
                        style={{ objectFit: 'contain', height: '250px' }}
                        src={config.imageFolder + producto.idproducto}
                        onError={handleImageError}
                        alt={producto.nombre}
                    />
                )}
            </Link>
            <CardContent sx={{ height: 70 }}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h5" color="text.secondary" >
                            {parseFloat(producto.precio).toFixed(2) + " €"}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" onClick={() => {
                            agregarProductoAlCarrito();
                            handleAddProduct();
                        }}>
                            <AddShoppingCartIcon color="primary" fontSize='large' />
                        </Button>

                    </Grid>

                </Grid>


            </CardContent>
        </Card>
    );
}
