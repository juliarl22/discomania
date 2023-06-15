import AppMenu from "../components/AppMenu";
import { Grid } from "@mui/material";
import { useRouteError } from "react-router-dom";
import imagen404 from "../assets/images/404.png";
import { Typography } from "@mui/material";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <AppMenu />
            <Grid container sx={{ mt: 5, p: 2 }} >
                <Grid item xs={12}  >

                    <Typography variant="h4" align="center" sx={{ my: 1 }}>¡Vaya!</Typography>
                    <Typography variant="h5" align="center" sx={{ my: 1 }}>Ha ocurrido un error al acceder a la ruta {window.location.href} </Typography>
                    <Typography variant="h5" align="center" sx={{ my: 1 }}>Puede ver nuestras categorías musicales y discos accediendo desde las opciones del menú. </Typography>

                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4 }}>
                    <img src={imagen404} width="400" height="400" alt="404"></img>
                </Grid>

            </Grid>
        </>

    );
}