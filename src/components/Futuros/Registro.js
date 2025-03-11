import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from "./utils/axios";
import { Typography } from '@mui/material';
import Image from './assets/background.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rubro, setRubro] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const rubros = [
    "Pestañas",
    "Peluquería",
    "Ferretería",
    "Indumentaria",
    "Calzado",
    "Electrónica",
    "Juguetería",
    "Belleza y Cosmética",
    "Hogar y Decoración",
    "Salud y Bienestar",
    "Otro", // Opción genérica para más rubros
  ];

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value.replace(/\s+/g, '').toLowerCase());
  };

  const isFormValid =
    username && password && confirmPassword && rubro && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!rubro) {
      setError('Por favor selecciona un rubro.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username,
        password,
        rubro, // Se envía el rubro en el payload
      };

      const response = await axios.post(`/api/register`, payload);

      if (response.data.success) {
        alert('Usuario registrado con éxito. Ahora serás redirigido al login.');
        window.location.href = '/login';
      } else {
        alert('Hubo un problema durante el registro. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error durante el registro:', error.message);
      alert('Hubo un problema al registrarse. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-width background-image" style={{ backgroundImage: `url(${Image})` }}>
      <Container className="flex justify-center items-center flex-direction" maxWidth="sm" style={{ paddingTop: 100 }}>
        <Typography className="title-registro" textAlign="center" variant="h5" marginBottom="20px">
          Registro de Usuarios
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0} className="card">
            <Grid item xs={12} style={{ margin: '10px 0' }}>
              <TextField
                required
                fullWidth
                style={{ color: 'black', backgroundColor: 'white' }}
                label="Nombre de usuario"
                value={username}
                variant="filled"
                onChange={handleChangeUsername}
              />
            </Grid>
            <Grid item xs={12} style={{ margin: '10px 0' }}>
              <TextField
                required
                fullWidth
                type={showPassword ? 'text' : 'password'}
                style={{ color: 'black', backgroundColor: 'white' }}
                label="Contraseña"
                value={password}
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ margin: '10px 0' }}>
              <TextField
                required
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                style={{ color: 'black', backgroundColor: 'white' }}
                label="Confirmar contraseña"
                value={confirmPassword}
                variant="filled"
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                      style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ margin: '10px 0' }}>
              <FormControl fullWidth variant="filled" style={{ backgroundColor: 'white' }}>
                <InputLabel id="rubro-label">Selecciona un rubro</InputLabel>
                <Select
                  labelId="rubro-label"
                  id="rubro"
                  value={rubro}
                  onChange={(e) => setRubro(e.target.value)}
                  required
                >
                  {rubros.map((rubroOption, index) => (
                    <MenuItem key={index} value={rubroOption}>
                      {rubroOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {error && (
              <Grid item xs={12} style={{ margin: '10px 0', color: 'red', textAlign: 'center' }}>
                {error}
              </Grid>
            )}
            <Grid item xs={12} style={{ margin: '10px 0' }}>
              <Button fullWidth type="submit" variant="contained" size="large" disabled={!isFormValid || loading}>
                {loading ? 'Registrando...' : 'Registrar'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Register;
