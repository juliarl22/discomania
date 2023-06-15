import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import config from '../config.js';



export default function Product() {
    const objetoValidacion = { categoria: true, nombre: true, descripcion: true, artistas: true, imagen: true, precio: true };
    const [isCamposValidos, setCamposValidos] = useState(objetoValidacion);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(config.apiUrl + 'get-categorias.php');

                if (response.ok) {
                    let data = await response.json();

                    if (data.ok) {
                        setMenuItems(data.datos);
                    } else {
                        alert('Error al recuperar las categorías.'); // datos del error en consola
                        console.error(data.mensaje);
                    }

                } else {
                    alert('Error al recuperar las categorías.');
                }
            } catch (error) {
                alert('Error al recuperar las categorías.');
                console.error('Error al obtener los elementos del menú:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('idcategoria', selectedValue);

        console.log('Datos del FormData:');
        for (let pair of data.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        if (productsValidator(data)) {

            let response = await fetch(config.apiUrl + 'post-productos.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: data
                // body: JSON.stringify({ categoria: selectedValue, nombre: data.get('nombre'), descripcion: data.get('descripcion'), artistas: data.get('artistas'), imagen: "", precio: data.get('precio') })
            })
            if (response.ok) {
                let datos = await response.json();

                if (datos.ok) {
                    alert('Alta de producto correcta.');
                } else {
                    alert('Registro incorrecto.'); // datos del error en consola
                    console.error(datos.mensaje);
                }

            } else {
                alert('Registro incorrecto.');
            }
        }
        console.log({
            idcategoria: data.get('categoria'),
            nombre: data.get('nombre'),
            descripcion: data.get('descripcion'),
            artistas: data.get('artistas'),
            imagen: data.get('imagen'),
            precio: data.get('precio'),
        });
    };


    function productsValidator(datos) {
        let bValido = true;
        let errores = { ...objetoValidacion };

        // Recuperar los datos a validar
        let categoria = selectedValue;
        let nombre = datos.get('nombre').trim();
        let descripcion = datos.get('descripcion').trim();
        let artistas = datos.get('artistas').trim();
        let precio = datos.get('precio').trim();

        // Validar categoria, que debe ser mayor que cero

        if (categoria < 0) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad idcategoria
            errores = { ...errores, categoria: false };
        }

        // Validar descripción, permite letras (mayúsculas y minúsculas), dígitos, espacios en blanco, coma, punto y guiones , entre 1 y 50 caracteres
        let expNombre = /^[\w\s.,-ÑñáéíóúÁÉÍÓÚ'° ]{1,50}$/;

        if (!expNombre.test(nombre)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad nombre
            errores = { ...errores, nombre: false };
        }

        // Validar descripción, permite letras (mayúsculas y minúsculas), dígitos, espacios en blanco, coma, punto y guiones
        let expDescripcion = /^[\w\s.,-ÑñáéíóúÁÉÍÓÚ'° ]{1,255}$/;

        if (!expDescripcion.test(descripcion)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad descripción
            errores = { ...errores, descripción: false };
        }

        // Validar artistas, incluye espacios, apostrofes, el símbolo º , entre 1 y 50 caracteres
        let expArtistas = /^[\w\s.,-ÑñáéíóúÁÉÍÓÚ'° ]{1,255}$/;

        if (!expArtistas.test(artistas)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad artistas
            errores = { ...errores, artistas: false };
        }

        // Validar precio, permite el uso de un punto decimal y hasta dos dígitos decimales
        let expPrecio = /^[0-9]+(\.[0-9]+)?$/;

        if (!expPrecio.test(precio)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad precio
            errores = { ...errores, precio: false };
        }

        if (!bValido)
            setCamposValidos({ ...errores });

        return bValido;
    }

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

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" sx={{ my: 3 }}>
                    Alta de un disco
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} ref={formRef}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                name="nombre"
                                inputProps={{ maxLength: 50 }}
                                error={!isCamposValidos.nombre}
                                helperText={!isCamposValidos.nombre && 'El nombre del producto debe estar relleno y como máximo ser de 50 caracteres.'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="descripcion"
                                label="Descripción"
                                id="descripcion"
                                inputProps={{ maxLength: 255 }}
                                multiline
                                rows={4}
                                error={!isCamposValidos.nombre}
                                helperText={!isCamposValidos.nombre && 'La descripción del producto debe estar rellena y como máximo ser de 255 caracteres.'}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl sx={{ width: '100%' }} error={!isCamposValidos.categoria}>
                                <InputLabel id="lblCategory">Categoría</InputLabel>
                                <Select
                                    labelId="lblCategory"
                                    id="categoria"
                                    label="Categoría"
                                    onChange={handleSelectChange}
                                >
                                    {menuItems.map((item) => (
                                        <MenuItem key={item.idcategoria} value={item.idcategoria}>
                                            {item.nombre}
                                        </MenuItem>
                                    ))}

                                </Select>
                                <FormHelperText>{!isCamposValidos.categoria && 'Seleccione una categoría.'}</FormHelperText>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="artistas"
                                label="Artistas"
                                id="artistas"
                                multiline
                                rows={2}
                                inputProps={{ maxLength: 255 }}
                                error={!isCamposValidos.artistas}
                                helperText={!isCamposValidos.artistas && 'Artistas debe estar relleno y como máximo ser de 255 caracteres.'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                {selectedImage ? (<img src={selectedImage}
                                    alt="Imagen categoría"
                                    width="100"
                                    height="100"
                                    id="imagenActual"
                                    onError={handleImageError}
                                />) : (
                                    <img
                                        src={config.imageFolder + 'sin-imagen.jpg'}
                                        width="100"
                                        height="100"
                                        id="imagenActual"
                                        alt="Imagen categoría"
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="precio"
                                label="Precio"
                                id="precio"
                                inputProps={{ maxLength: 50 }}
                                sx={{ textAlign: 'right' }}
                                error={!isCamposValidos.precio}
                                helperText={!isCamposValidos.precio && 'El precio del producto debe estar relleno y tener como máximo dos números decimales.'}
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
    );
}