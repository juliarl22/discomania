import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useState } from 'react';
import { Navigate } from "react-router-dom";
import config from '../config.js';



export default function SignIn() {
    const objetoValidacion = { email: true, password: true };
    const [isCamposValidos, setCamposValidos] = useState(objetoValidacion);
    const [isLoginOK, setIsLoginOK] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget); // Recoger los datos del formulario

        if (signInValidator(data)) {
            // Llamada para hacer login
            // let fetchURL = new URL(config.apiUrl + 'get-sign-in.php');
            const queryString = new URLSearchParams(data).toString();; // Crear searchParams con datos del formulario            
            console.log("URL Login:" + config.apiUrl + `?${queryString}`);
            let response = await fetch(config.apiUrl + `get-sign-in.php?${queryString}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
            if (response.ok) {
                let data = await response.json();

                if (data.ok) {
                    alert('Login correcto.');
                    sessionStorage['usuario'] = JSON.stringify(data.datos);
                    setIsLoginOK(true);
                } else {
                    alert(data.mensaje);
                    console.error(data.mensaje);
                }
            } else {
                alert('Login incorrecto.');
            }
        }
    };

    function signInValidator(datos) {
        let bValido = true;
        let errores = { ...objetoValidacion };

        // Recuperar los datos a validar
        let email = datos.get('email').trim();
        let password = datos.get('password').trim();

        // Validar email
        let expEmail = /^\b[\w.-]+@[\w.-]+\.\w{2,4}\b$/gi;

        if (!expEmail.test(email)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad email
            errores = { ...errores, email: false };
        }

        // Validar password
        // - at least 8 characters
        let expPassword = /^.{8,}$/g;

        if (!expPassword.test(password)) { // Si no cumple la expresion regular
            bValido = false;

            // Copia el objeto y actualiza la propiedad password
            errores = { ...errores, password: false };
        }

        if (!bValido)
            setCamposValidos({ ...errores });

        return bValido;
    }

    if (isLoginOK) {
        return (
            <Navigate to="/" replace={true} />
        );
    }

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
                <Avatar sx={{ m: 1, }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoFocus
                                error={!isCamposValidos.email}
                                helperText={!isCamposValidos.email && 'Compruebe el formato del email'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                error={!isCamposValidos.password}
                                helperText={!isCamposValidos.password && 'Al menos 8 carácteres'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid container sx={{ ml: 2 }}>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"¿No tienes cuenta? Registrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
}