import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config.js';


export default function EditCategory() {
    const objetoValidacion = { nombre: true, descripcion: true, imagen: true };
    const [isCamposValidos, setCamposValidos] = useState(objetoValidacion);
    const { idcategoria } = useParams();
    const [datosCategoria, setDatosCategoria] = useState({ nombre: "", descripcion: "" });
    const [selectedImage, setSelectedImage] = useState(null);


    // Recuperar los datos de la categoría a editar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-categoria-idcategoria.php?idcategoria=' + idcategoria);

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {
                        setDatosCategoria(data.datos[0]);
                    } else {
                        alert('Error al recuperar la categoría. \n' + data.mensaje); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar la categoría.');
                }
            } catch (error) {
                alert('Error al recuperar la categoría.');
                console.error('Error al obtener la categoría:', error);
            }
        };

        fetchData();
    }, [idcategoria]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('idcategoria', idcategoria);

        if (categoriesValidator(data)) {
            let response = await fetch(config.apiUrl + 'post-update-categorias.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: data
                // body: JSON.stringify({ idcategoria: datosCategoria.idcategoria, nombre: data.get('nombre'), descripcion: data.get('descripcion'), imagen: "" })
            })
            if (response.ok) {
                let datos = await response.json();

                if (datos.ok) {
                    alert('Actualización correcta de categoría.');
                    // Redireccionar a home
                } else {
                    alert('Actualización incorrecta de categoría.'); // datos del error en consola
                    console.error(datos.mensaje);
                }

            } else {
                alert('Actualización incorrecta de categoría.');
            }
        }

        console.log({
            idcategoria: datosCategoria.idcategoria,
            nombre: data.get('nombre'),
            descripcion: data.get('descripcion'),
            imagen: data.get('imagen'),
        });
    };

    const handleImageError = (event) => {
        event.target.onerror = null; // prevents looping
        event.target.src = config.imageFolder + 'sin-imagen.jpg';
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    function categoriesValidator(datos) {
        let bValido = true;
        let errores = { ...objetoValidacion };

        // Recuperar los datos a validar
        let nombre = datos.get('nombre').trim();
        let descripcion = datos.get('descripcion').trim();
        // let imagen = datos.get('imagen').trim();

        // Validar nombre, incluye espacios, apostrofes, el símbolo º , entre 1 y 50 caracteres
        let expNombre = /^[\w\s.,-ÑñáéíóúÁÉÍÓÚ'°0-9 ]{1,50}$/;

        if (!expNombre.test(nombre)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad nombre
            errores = { ...errores, nombre: false };
        }

        // Validar descripción, permite letras (mayúsculas y minúsculas), dígitos, espacios en blanco, coma, punto y guiones
        let expDescripcion = /^[\w\s.,-ÑñáéíóúÁÉÍÓÚ'°0-9 ]{1,255}$/;

        if (!expDescripcion.test(descripcion)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad descripción
            errores = { ...errores, descripción: false };
        }

        if (!bValido)
            setCamposValidos({ ...errores });

        return bValido;
    }


    return (
        // <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Modificación de datos de categoría
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="nombre"
                                onChange={(e) => setDatosCategoria({ ...datosCategoria, nombre: e.target.value })}
                                value={datosCategoria.nombre}
                                label="Nombre de la categoría"
                                name="nombre"
                                inputProps={{ maxLength: 50 }}
                                error={!isCamposValidos.nombre}
                                helperText={!isCamposValidos.nombre && 'El nombre de la categoría debe estar relleno y como máximo ser de 50 caracteres.'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="descripcion"
                                value={datosCategoria.descripcion}
                                onChange={(e) => setDatosCategoria({ ...datosCategoria, descripcion: e.target.value })}
                                label="Descripción"
                                name="descripcion"
                                multiline
                                rows={4}
                                inputProps={{ maxLength: 255 }}
                                error={!isCamposValidos.nombre}
                                helperText={!isCamposValidos.nombre && 'La descripción del producto debe estar rellena y como máximo ser de 255 caracteres.'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                {selectedImage ? (<img src={selectedImage}
                                    alt="Imagen categoría"
                                    width="100"
                                    height="100"
                                    id="imagenActual"
                                />) : (
                                    <img
                                        src={config.imageFolder + "cat-" + idcategoria}
                                        width="100"
                                        height="100"
                                        id="imagenActual"
                                        alt="Imagen categoría"
                                        onError={handleImageError}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="imagen"
                                // label="Imagen"
                                type="file"
                                id="imagen"
                                onChange={handleImageChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Aceptar
                    </Button>
                </Box>
            </Box>
        </Container>
        // </ThemeProvider>
    );
}