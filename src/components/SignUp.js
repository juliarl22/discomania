import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import config from '../config.js';



export default function SignUp() {
  const objetoValidacion = { email: true, nombre: true, apellidos: true, password: true, c_password: true, direccion: true, telefono: true, iban: true };
  const [isCamposValidos, setCamposValidos] = useState(objetoValidacion);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (signUpValidator(data)) {
      // Llamada para registrar usuario en el backend
      let response = await fetch(config.apiUrl + 'post-sign-up.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.get('email'), password: data.get('password'), nombre: data.get('nombre'), apellidos: data.get('apellidos'), direccion: data.get('direccion'), telefono: data.get('telefono'), iban: data.get('iban') })
      })
      if (response.ok) {
        let datos = await response.json();

        if (datos.ok) {
          alert('Registro correcto.');
          // Redireccionar a home
        } else {
          alert('Registro incorrecto.'); // datos del error en consola
          console.error(datos.mensaje);
        }

      } else {
        alert('Registro incorrecto.');
      }
    }
    console.log({
      nombre: data.get('nombre'),
      apellidos: data.get('apellidos'),
      email: data.get('email'),
      password: data.get('password'),
      c_password: data.get('c_password'),
    });
  };



  function signUpValidator(datos) {
    let bValido = true;
    let errores = { ...objetoValidacion };

    // Recuperar los datos a validar
    let email = datos.get('email').trim();
    let password = datos.get('password').trim();
    let c_password = datos.get('c_password').trim();
    let nombre = datos.get('nombre').trim();
    let apellidos = datos.get('apellidos').trim();
    let direccion = datos.get('direccion').trim();
    let telefono = datos.get('telefono').trim();
    let iban = datos.get('iban').trim();

    // Validar nombre, incluye espacios, apostrofes, el símbolo º , entre 1 y 50 caracteres
    let expNombre = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{1,50}$/;

    if (!expNombre.test(nombre)) { // Si no cumple la expresion regular
      bValido = false;

      // Copia el objeto y actualiza la propiedad nombre
      errores = { ...errores, nombre: false };
    }

    // Validar apellidos, incluye espacios, apostrofes, el símbolo º , entre 1 y 50 caracteres
    let expApellidos = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]{1,50}$/;

    if (!expApellidos.test(apellidos)) { // Si no cumple la expresion regular
      bValido = false;

      // Copia el objeto y actualiza la propiedad apellidos
      errores = { ...errores, apellidos: false };
    }

    // Validar dirección, entre 1 y 255 caracteres
    let expDireccion = /^.{1,50}$/;

    if (!expDireccion.test(direccion)) { // Si no cumple la expresion regular
      bValido = false;

      // Copia el objeto y actualiza la propiedad direccion
      errores = { ...errores, direccion: false };
    }

    // Validar teléfono, números de teléfonos internacionales
    let expTelefono = /^\+?[0-9]{1,3}[-\s]?[0-9]{1,14}$/g;

    if (!expTelefono.test(telefono)) { // Si no cumple la expresion regular
      bValido = false;

      // Copia el objeto y actualiza la propiedad telefono
      errores = { ...errores, telefono: false };
    }
    // Validar email
    let expEmail = /^\b[\w.-]+@[\w.-]+\.\w{2,4}\b$/gi;

    if (!expEmail.test(email)) { // Si no cumple la expresion regular
      bValido = false;

      // Copia el objeto y actualiza la propiedad email
      errores = { ...errores, email: false };
    }

    // Validar password
    // - at least 8 characters
    // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    // - Can contain special characters
    let expPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

    if (!expPassword.test(password)) { // Si no cumple la expresion regular
      bValido = false;

      // Copia el objeto y actualiza la propiedad password
      errores = { ...errores, password: false };
    }

    // Validar c_password
    if (c_password !== password) { // Si no son iguales 
      bValido = false;
      console.log("dice que esta mal no son iguales");
      // Copia el objeto y actualiza la propiedad c_password
      errores = { ...errores, c_password: false };
    }

    let expC_Password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    if (!expC_Password.test(c_password)) { // Si no cumple la expresion regular
      bValido = false;
      // Copia el objeto y actualiza la propiedad c_password
      errores = { ...errores, c_password: false };
    }

    // Validar IBAN español
    let expIBAN = /^ES\d{22}$/gi;

    if (!expIBAN.test(iban)) {
      bValido = false;

      // Copia el objeto y actualiza la propiedad iban
      errores = { ...errores, iban: false };
    }

    if (!bValido) {
      console.log(errores);
      setCamposValidos({ ...errores });
    }


    return bValido;
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
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"

                inputProps={{ maxLength: 100 }}
                error={!isCamposValidos.email}
                helperText={!isCamposValidos.email && 'Compruebe el formato del email.'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                inputProps={{ maxLength: 100 }}
                id="password"
                error={!isCamposValidos.password}
                helperText={!isCamposValidos.password && 'Al menos 8 carácteres, 1 letra mayúscula, 1 letra minúscula y 1 número'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="c_password"
                label="Confirmación password"
                type="password"
                id="c_password"
                inputProps={{ maxLength: 100 }}
                error={!isCamposValidos.c_password}
                helperText={!isCamposValidos.c_password && 'Debe concidir. Al menos 8 carácteres, 1 letra mayúscula, 1 letra minúscula y 1 número'}
              />
              {console.log("isCamposValidos.c_password" + isCamposValidos.c_password)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombre"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                inputProps={{ maxLength: 50 }}
                error={!isCamposValidos.nombre}
                helperText={!isCamposValidos.nombre && 'El nombre debe estar relleno y como máximo ser de 50 caracteres'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellidos"
                label="Apellidos"
                name="apellidos"
                inputProps={{ maxLength: 50 }}
                error={!isCamposValidos.apellidos}
                helperText={!isCamposValidos.apellidos && 'Los apellidos deben estar rellenos y como máximo ser de 50 caracteres'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="direccion"
                label="Dirección"
                id="direccion"
                inputProps={{ maxLength: 50 }}
                error={!isCamposValidos.direccion}
                helperText={!isCamposValidos.direccion && 'La dirección debe estar rellena y como máximo ser de 255 caracteres'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="telefono"
                label="Teléfono"
                id="telefono"
                inputProps={{ maxLength: 20 }}
                error={!isCamposValidos.direccion}
                helperText={!isCamposValidos.direccion && 'El teléfono debe estar relleno'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="iban"
                label="IBAN"
                id="iban"
                inputProps={{ maxLength: 24 }}
                error={!isCamposValidos.iban}
                helperText={!isCamposValidos.iban && 'El IBAN debe estar relleno y tener formato de IBAN de España'}
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
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Tienes ya una cuenta? Accede.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  );
}