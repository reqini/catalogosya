import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress,
  Box,
  Typography,
  Container,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const GOOGLE_CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3/calendars/589db8d2236325e1678e7e3405b97610a1f4c3a5461915353f0c3cdb012a61be@group.calendar.google.com/events";
const API_KEY = "AIzaSyDLItWhYVaxjr5nzjqMloGE4UZy32_DoCk"; 
const ACCESS_TOKEN = "ya29.a0AeXRPp6Z8LhHsCKuTzwoe5-ZSgKVqNvKG58O0PZvLACGzM-mCFPLeNrOqmB9pWt57mNoLDA4Ha7ioy4nt6-srQhJRRl0nTXu4HcpgsLoqqyGQLfMoLUbE96vq5N0No4LAvdEG1_EfiFXPtEctX86J3dy7VOLlEgpZu1mROfVaCgYKAQgSARISFQHGX2MiSgQTZ9RWRZu0eKnHoCJFvA0175"; 

const CatalogoPeluqueria = () => {
  const [nombre, setNombre] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [cafe, setCafe] = useState(false);
  const [cargando, setCargando] = useState(false);
  const turnosDisponibles = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const handleReserva = async () => {
    if (!nombre || !tratamiento || !dia || !hora) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    setCargando(true);

    const event = {
      summary: `Turno: ${tratamiento}`,
      description: `Nombre: ${nombre}\nCafé: ${cafe ? "Sí" : "No"}`,
      start: {
        dateTime: `${dia}T${hora}:00-03:00`,
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: `${dia}T${parseInt(hora.split(":")[0]) + 1}:00-03:00`,
        timeZone: "America/Argentina/Buenos_Aires",
      },
    };

    try {
      const response = await fetch(`${GOOGLE_CALENDAR_API_URL}?key=${API_KEY}`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Error al agendar el turno en Google Calendar");
      }

      alert("Turno agendado correctamente en Google Calendar.");

      const mensaje = `Hola, quiero reservar un turno.\n\nNombre: ${nombre}\nTratamiento: ${tratamiento}\nDía: ${dia}\nHora: ${hora}\nCafé: ${cafe ? "Sí" : "No"}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar la reserva.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Saca tu turno
      </Typography>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" fullWidth value={nombre} onChange={(e) => setNombre(e.target.value)} />
        
        <FormControl fullWidth>
          <InputLabel>Tipo de tratamiento</InputLabel>
          <Select value={tratamiento} onChange={(e) => setTratamiento(e.target.value)}>
            <MenuItem value="Corte">Corte</MenuItem>
            <MenuItem value="Coloración">Coloración</MenuItem>
            <MenuItem value="Alisado">Alisado</MenuItem>
            <MenuItem value="Peinado">Peinado</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Día"
          type="date"
          fullWidth
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth>
          <InputLabel>Hora</InputLabel>
          <Select value={hora} onChange={(e) => setHora(e.target.value)}>
            {turnosDisponibles.map((turno) => (
              <MenuItem key={turno} value={turno}>{turno}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={cafe} onChange={(e) => setCafe(e.target.checked)} />}
          label="¿Te esperamos con un café?"
        />

        <Typography variant="body1" fontWeight="bold" mt={2}>
          ¿Te gustaría reservar alguno de nuestros vinos de selección?
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => window.open("URL_CATALOGO_VINOS", "_blank")}
        >
          Acceder al catálogo
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<WhatsAppIcon />}
          onClick={handleReserva}
          disabled={!nombre || !tratamiento || !dia || !hora}
        >
          {cargando ? <CircularProgress size={24} color="inherit" /> : "Reservar"}
        </Button>
      </Box>
    </Container>
  );
};

export default CatalogoPeluqueria;
