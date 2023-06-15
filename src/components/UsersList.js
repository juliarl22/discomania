import EditIcon from '@mui/icons-material/Edit';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { DataGrid, esES } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config.js';
import PrintButton from './PrintButton.js';

export default function UsersList() {
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'id',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 150,
        },
        {
            field: 'apellidos',
            headerName: 'Apellidos',
            width: 150,
        },
        {
            field: 'direccion',
            headerName: 'Dirección',
            width: 200,
            renderCell: (params) => (
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {params.value}
                </p>
            ),
        },
        {
            field: 'telefono',
            headerName: 'Teléfono',
            width: 150,
        },
        {
            field: 'iban',
            headerName: 'IBAN',
            width: 250,
        },
        {
            field: 'tipo',
            headerName: 'Tipo',
            width: 50,
        },
        {
            field: 'email',
            headerName: 'Acción',
            width: 100,
            renderCell: (params) => {
                const { value } = params;
                return <Link to={"/editUser/" + value}><EditIcon fontSize="medium" /></Link>;
            },
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-lista-usuarios.php');

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {
                        setRows(data.datos);
                    } else {
                        alert('Error al recuperar los usuarios.'); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar los usuarios.');
                }
            } catch (error) {
                alert('Error al recuperar los usuarios.');
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <PrintButton />

            <Grid container sx={{ padding: 2, width: '100%' }} justifyContent="center">

                <Grid item xs={12}>
                    <Typography variant="h4" align="center" sx={{ my: 2 }}>Listado de usuarios</Typography>
                </Grid>

                <Grid item sx={{ mt: 2 }}>
                    <DataGrid
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        rows={rows}
                        columns={columns}
                        rowHeight={100}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 20, 100]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                        getRowId={(row) => row.id}
                    />
                </Grid>

            </Grid>
        </>
    );
}
