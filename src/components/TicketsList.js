import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PrintIcon from '@mui/icons-material/Print';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { DataGrid, esES } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import config from '../config.js';
import { isAdmin, userEmail } from "../js/Utils.js";
import PrintButton from "./PrintButton.js";



export default function TicketsList() {
    const [rows, setRows] = useState([]);
    const { email } = useParams();

    const columns = [
        {
            field: 'idticket',
            headerName: 'Nº ticket',
            width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            renderCell: (params) => {
                const { value } = params;
                return (
                    <>
                        {value}
                        <Link to={"/edituser/" + value}>
                            <ManageAccountsIcon fontSize="medium" />
                        </Link>
                    </>
                )
            },
            width: 200
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            width: 200,
            renderCell: (params) => {
                const { value } = params;
                // Obtener fecha
                const date = new Date(value);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                // Obtener hora
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                const datetime = (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

                return (
                    <>
                        {datetime}
                    </>
                )
            },


        },
        {
            field: 'importe_total',
            headerName: 'Importe',
            width: 100,
            renderCell: (params) => {
                const { value } = params;
                return <span>{parseFloat(value).toFixed(2) + " €"}</span>;
            },
        },
        {
            field: 'id',
            headerName: 'Acción',
            width: 100,
            renderCell: (params) => {
                const { value } = params;
                return (
                    <PrintIcon fontSize="medium" onClick={() => handleClick(value)} />
                )
            },
        }
    ];

    const handleClick = (value) => {
        window.open(config.home + "ticketprint/" + value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-lista-tickets-email.php?email=' + email);

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {
                        setRows(data.datos);
                    } else {
                        alert('Error al recuperar los tickets.'); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar los tickets.');
                }
            } catch (error) {
                alert('Error al recuperar los tickets.');
                console.error('Error al obtener los tickets:', error);
            }
        };

        fetchData();
    }, [email]);

    if (!isAdmin() && email !== userEmail()) {

        return <Navigate to="/securityerror" replace={true} />;
    }

    return (
        <>
            <Grid container sx={{ padding: 2, width: '100%' }} justifyContent="center">
                <PrintButton />
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" sx={{ my: 2 }}>Listado de tickets</Typography>
                </Grid>
                {rows.length === 0 ? (
                    <Typography variant="h6" align="center">No hay ningún ticket que mostrar</Typography>
                ) : (
                    <Grid item sx={{ mt: 2, mb: 4 }}>
                        <DataGrid
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 15, 100]}
                            // checkboxSelection
                            disableRowSelectionOnClick
                            getRowId={(row) => row.idticket}
                        />
                    </Grid>
                )}

            </Grid>

        </>
    );
}
