import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import config from '../config.js';
import { isAdmin, userEmail } from "../js/Utils.js";
import BackButton from './BackButton.js';


export default function EditUser() {
  const objetoValidacion = { email: true, nombre: true, apellidos: true, password: true, c_password: true, direccion: true, telefono: true, iban: true };
  const [isCamposValidos, setCamposValidos] = useState(objetoValidacion);
  const { email } = useParams();
  const [datosUsuario, setDatosUsuario] = useState({ email: email, password: "", c_password: "", nombre: "", apellidos: "", direccion: "", telefono: "", iban: "" });
  const [checked, setChecked] = useState(false);
  const [emailCorrecto, setEmailCorrecto] = useState(true);


  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setDatosUsuario({ ...datosUsuario, password: "", c_password: "" });
    }
  };

  // Recuperar los datos del usuario a editar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.apiUrl + 'get-usuario-email.php?email=' + email);

        if (response.ok) {
          let data = await response.json();

          if (data.ok) {
            if (data.datos.length > 0) {
              setDatosUsuario({ ...data.datos[0], password: "", c_password: "" });
            } else {
              alert('No hay usuario con email: ' + email);
              setEmailCorrecto(false);
            }

          } else {
            alert('Error al recuperar los datos del usuario. \n' + data.mensaje); // datos del error en consola
            console.error(data.mensaje);
          }

        } else {
          alert('Error al recuperar los datos del usuario.');
        }
      } catch (error) {
        alert('Error al recuperar los datos del usuario');
        console.error('Error al recuperar los datos del usuario:', error);
      }
    };

    fetchData();
  }, [email]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (editUserValidator(data)) {
      console.log('Datos del FormData:');
      for (let pair of data.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      // Llamada para actualizar los datos del usuario en el backend
      let response = await fetch(config.apiUrl + 'post-update-user.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: data  // Puede ir o no el password
      })
      if (response.ok) {
        let datos = await response.json();

        if (datos.ok) {
          alert('Usuario modificado correctamente.');
          // Redireccionar a home
        } else {
          alert('Error al actualizar usuario.'); // datos del error en consola
          console.error(datos.mensaje);
        }

      } else {
        alert('Error al actualizar usuario.');
      }
    }
  };



  function editUserValidator(datos) {
    let bValido = true;
    let errores = { ...objetoValidacion };
    let password, c_password;

    // Recuperar los datos a validar
    if (checked) {
      password = datos.get('password').trim();
      c_password = datos.get('c_password').trim();
    }

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
    // Validar password SOLO SI ESTÄ MARCADO QUE SE VAN A CAMBIAR LA PASSWORD
    if (checked) {
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

  if (!isAdmin() && datosUsuario.email !== userEmail()) {
    return <Navigate to="/securityerror" replace={true} />;
  }

  if (!emailCorrecto) {
    return <Navigate to="/" replace={true} />;
  }
  return (

    <Container component="main" maxWidth="xs">
      <BackButton />
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
          Modificación de datos de usuario
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="text"
                onChange={(e) => setDatosUsuario({ ...datosUsuario, email: e.target.value })}
                value={datosUsuario.email}
                inputProps={{ maxLength: 100, readOnly: true, }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Modificar password" />
            </Grid>
            {checked && (
              <>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    inputProps={{ maxLength: 100 }}
                    id="password"
                    value={datosUsuario.password}
                    onChange={(e) => setDatosUsuario({ ...datosUsuario, password: e.target.value })}
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
                    value={datosUsuario.c_password}
                    onChange={(e) => setDatosUsuario({ ...datosUsuario, c_password: e.target.value })}
                    inputProps={{ maxLength: 100 }}
                    error={!isCamposValidos.c_password}
                    helperText={!isCamposValidos.c_password && 'Debe concidir. Al menos 8 carácteres, 1 letra mayúscula, 1 letra minúscula y 1 número'}
                  />
                  {console.log("isCamposValidos.c_password" + isCamposValidos.c_password)}
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                inputProps={{ maxLength: 50 }}
                value={datosUsuario.nombre}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, nombre: e.target.value })}
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
                value={datosUsuario.apellidos}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, apellidos: e.target.value })}
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
                value={datosUsuario.direccion}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, direccion: e.target.value })}
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
                value={datosUsuario.telefono}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, telefono: e.target.value })}
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
                value={datosUsuario.iban}
                inputProps={{ maxLength: 24 }}
                onChange={(e) => setDatosUsuario({ ...datosUsuario, iban: e.target.value })}
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

        </Box>
      </Box>
    </Container>
  );
}