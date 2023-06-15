import EditIcon from '@mui/icons-material/Edit';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { DataGrid, esES } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config.js';

import PrintButton from './PrintButton.js';


export default function ProductsList() {
    const [rows, setRows] = useState([]);


    const columns = [
        {
            field: 'portada',
            headerName: 'Portada',
            width: 150,
            renderCell: (params) => {
                const { value } = params;
                return (
                    <Link to={"/productdetail/" + value}><img src={config.imageFolder + value} alt="Disco" width="100" height="100" onError={handleImageError} /></Link>
                );
            },
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200,
            //width: 200,
        },
        {
            field: 'categoria',
            headerName: 'Categoría',
            width: 200,
        },
        {
            field: 'artistas',
            headerName: 'Artistas',
            width: 200,

        },
        {
            field: 'descripcion',
            headerName: 'Descripción',
            renderCell: (params) => (
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {params.value}
                </p>
            ),
            width: 250,
        },
        {
            field: 'precio',
            headerName: 'Precio',
            width: 100,
            renderCell: (params) => {
                const { value } = params;
                return <span>{parseFloat(value).toFixed(2) + " €"}</span>;
            },
        },
        {
            field: 'idproducto',
            headerName: 'Acción',
            width: 100,
            renderCell: (params) => {
                const { value } = params;
                return <Link to={"/editproduct/" + value}><EditIcon fontSize="medium" /></Link>;
            },
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-lista-productos.php');

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {
                        setRows(data.datos);
                    } else {
                        alert('Error al recuperar los productos.'); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar los productos.');
                }
            } catch (error) {
                alert('Error al recuperar los productos.');
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchData();
    }, []);

    const handleImageError = (event) => {
        event.target.onerror = null; // prevents looping
        event.target.src = config.imageFolder + 'sin-imagen.jpg';
    };

    return (
        <>
            <PrintButton />
            <Grid container xs={12} sx={{ padding: 2, width: '100%' }} justifyContent="center">

                <Grid item xs={12}>
                    <Typography variant="h4" align="center" sx={{ my: 2 }}>Listado de discos</Typography>
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
                                    pageSize: 4,
                                },
                            },
                        }}
                        pageSizeOptions={[4, 8, 16, 32, 100]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                        getRowId={(row) => row.idproducto}
                    />
                </Grid>

            </Grid>
        </>
    );
}
