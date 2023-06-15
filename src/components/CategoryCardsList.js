import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import config from '../config.js';
import CategoryCard from "./CategoryCard";


export default function CategoryCardsList() {

    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Llamada para recuperar las categorías
            let response = await fetch(config.apiUrl + 'get-categorias.php', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
            if (response.ok) {
                let datos = await response.json();

                if (datos.ok) {
                    setCardList(datos.datos);
                } else {
                    alert('Error al recuperar las categorías.'); // datos del error en consola
                    console.error(datos.mensaje);
                    setCardList([]);
                }

            } else {
                alert('Error al recuperar las categorías.');
                setCardList([]);
            }
        }

        fetchData();


    }, []);

    return (
        <>
            <Typography gutterBottom={true} variant="h4" align="center" sx={{ my: 4 }}>Categorías musicales</Typography>

            <Grid container
                spacing={2}
                sx={{ mb: 4 }}
            >

                {cardList.map((item, index) => (
                    <Grid key={item.idcategoria} item xs={12} sm={6} md={4} lg={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <CategoryCard nombre={item.nombre} descripcion={item.descripcion} imagen={item.idcategoria} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}