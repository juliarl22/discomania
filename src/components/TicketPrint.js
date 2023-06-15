import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PrintButton from './PrintButton.js';
import Grid from '@mui/material/Grid';
import config from '../config.js';
import { isAdmin, userEmail } from "../js/Utils.js";
import imagenLogo from "../assets/images/logo";


const TicketPrint = () => {
    const [datosTicket, setDatosTicket] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState({});
    const { idticket } = useParams();
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');
    const [datosCargados, setDatosCargados] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-ticket-idticket.php?idticket=' + idticket);

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {
                        setDatosUsuario({ email: data.datos[0].email, nombre: data.datos[0].nombrecliente, apellidos: data.datos[0].apellidos, direccion: data.datos[0].direccion, telefono: data.datos[0].telefono, iban: data.datos[0].iban });
                        setDatosTicket(data.datos);
                        setDatosCargados(true);

                        // Obtener fecha
                        const date = new Date(data.datos[0].fecha);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        setFormattedDate(`${year}-${month}-${day}`);

                        // Obtener hora
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        const seconds = String(date.getSeconds()).padStart(2, '0');
                        setFormattedTime(`${hours}:${minutes}:${seconds}`);

                    } else {
                        alert('Error al recuperar los datos del ticket: ' + idticket); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar los datos del ticket: ' + idticket);
                }
            } catch (error) {
                alert('Error al recuperar los datos del ticket: ' + idticket);
                console.error('Error al recuperar los datos del ticket: ' + idticket, error);
            }
        };

        fetchData();
    }, [idticket]);



    function calcularTotal() {

        let total = 0;

        for (let item of datosTicket) {
            total += item.preciounitario * item.unidades;
        }

        return total;
    }

    const handleImageError = (event) => {
        event.target.onerror = null; // prevents looping
        event.target.src = config.imageFolder + 'sin-imagen.jpg';
    };

    if (datosCargados && !isAdmin() && datosUsuario.email !== userEmail()) {

        return <Navigate to="/securityerror" replace={true} />;
    }

    return (
        <>
            {datosTicket.length === 0 ? (
                <Typography variant="h5" align="center">No hay datos para imprimir</Typography>
            ) : (
                <>
                    <PrintButton />
                    <Grid container spacing="5" sx={{ p: 3 }}>
                        <Grid item xs={1}>
                            <img src={imagenLogo} height="100" width="100" alt="logo"></img>
                        </Grid>
                        <Grid item xs={11} sx={{ mb: 3 }}>
                            <Typography variant="h4" align="center">Ticket de compra</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography variant="body1" align="left">{config.direccion}</Typography>
                            <Typography variant="body1" align="left">{config.codpost}</Typography>
                            <Typography variant="body1" align="left">{config.ciudad}</Typography>
                            <Typography variant="body1" align="left">{config.telefono}</Typography>
                        </Grid>

                        <Grid item xs={5} align="left">
                            <Typography variant="h6" >Datos del comprador</Typography>

                            <Typography variant="subtitle1" >
                                Email: {datosUsuario.email}
                            </Typography>

                            <Typography variant="subtitle1" >
                                Nombre: {datosUsuario.nombre}
                            </Typography>
                            <Typography variant="subtitle1" >
                                Apellidos: {datosUsuario.apellidos}
                            </Typography>

                            <Typography variant="subtitle1" >
                                Dirección: {datosUsuario.direccion}
                            </Typography>
                            <Typography variant="subtitle1" >
                                Teléfono: {datosUsuario.telefono}
                            </Typography>
                            <Typography variant="subtitle1" >
                                IBAN: {datosUsuario.iban}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" >Datos del ticket</Typography>
                            <Typography variant="body1"> Nº ticket: {idticket}</Typography>
                            <Typography variant="body1">Fecha: {formattedDate}</Typography>
                            <Typography variant="body1">Hora: {formattedTime}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="left" sx={{ mt: 3, mb: 2 }}>Discos comprados</Typography>
                            <TableContainer component={Paper} >
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
                                        {datosTicket.map((item) => (
                                            <TableRow key={item.idproducto}>
                                                <TableCell>
                                                    <img src={config.imageFolder + item.idproducto} alt={item.nombre} width="50" height="50" onError={handleImageError} />
                                                </TableCell>
                                                <TableCell size="small">
                                                    {item.nombre}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {parseFloat(item.preciounitario).toFixed(2) + " €"}
                                                </TableCell>
                                                <TableCell align="right">

                                                    {item.unidades}

                                                </TableCell>
                                                <TableCell align="right">
                                                    {(parseFloat(item.preciounitario) * parseFloat(item.unidades)).toFixed(2) + " €"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow key="total">
                                            <TableCell colSpan={4} align="right">Total sin IVA</TableCell>
                                            <TableCell align="right">{(calcularTotal() - (calcularTotal() * 0.21)).toFixed(2) + " €"}</TableCell>

                                        </TableRow>
                                        <TableRow key="total">
                                            <TableCell colSpan={4} align="right">IVA (21%)</TableCell>
                                            <TableCell align="right">{(calcularTotal() * 0.21).toFixed(2) + " €"}</TableCell>

                                        </TableRow>
                                        <TableRow key="total">
                                            <TableCell colSpan={4} align="right">Total</TableCell>
                                            <TableCell align="right">{calcularTotal().toFixed(2) + " €"}</TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <Typography variant="body1" align="left">Los discos comprados llegarán por paquetería en 5 días desde la fecha de compra.</Typography>
                            <Typography variant="body1" align="left">El importe de la compra se cobrará de la cuenta de domiciliación en dos días.</Typography>
                            <Typography variant="body1" align="left">Solo se admiten devoluciones de productos defectuosos.</Typography>
                        </Grid>
                    </Grid>


                </>
            )
            }
        </>
    );
};

export default TicketPrint;
