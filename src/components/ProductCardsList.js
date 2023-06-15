import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import config from '../config.js';
import CategoriesFilter from "./CategoriesFilter";
import ProductCard from "./ProductCard";


export default function ProductCardsList({ handleAddProduct }) {

    const [productList, setProductList] = useState([]);
    const { idcategoria } = useParams();

    console.log("IDCategoria:" + idcategoria);

    useEffect(() => {
        async function fetchData() {
            // Llamada para recuperar las categorías
            let response = await fetch(config.apiUrl + 'get-productos-idcategoria.php?idcategoria=' + idcategoria, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
            if (response.ok) {
                let datos = await response.json();

                if (datos.ok) {
                    setProductList(datos.datos);
                } else {
                    alert('Error al recuperar los productos.'); // datos del error en consola
                    console.error(datos.mensaje);
                    setProductList([]);
                }

            } else {
                alert('Error al recuperar los productos.');
                setProductList([]);
            }
        }

        fetchData();
    }, [idcategoria]);

    return (
        <>
            <CategoriesFilter selectCatIndex={idcategoria} />
            <Typography variant="h4" align="center" sx={{ mt: 4, mb: 1 }}>Discos</Typography>

            <Typography gutterBottom={true} variant="h6" align="center" sx={{ mb: 4 }}>{parseInt(idcategoria) === 0 ? 'Todas las categorías' : productList.length > 0 && productList[0].categoria} </Typography>

            <Grid container
                direction="row"
                spacing={2}
                sx={{ mb: 4 }}
            >
                {productList.map((item, index) => (
                    <Grid key={item.idproducto} item xs={12} sm={6} md={4} lg={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <ProductCard producto={item} handleAddProduct={handleAddProduct} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}