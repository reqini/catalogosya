import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const placeholderImage = "/placeholder.png";

const NailsCatalogo = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientName, setClientName] = useState("");

  const handleReserve = () => {
    if (!selectedDate || !selectedTime || !clientName) {
      alert("Por favor, completa todos los campos antes de reservar.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];
    const formattedTime = selectedTime.toLocaleTimeString();

    // 📲 Mensaje de WhatsApp con los detalles de la reserva
    const message = `Hola! Quiero reservar un turno para *${product["Nombre del Producto"]}* el *${formattedDate}* a las *${formattedTime}*.
    
    Mis datos son:
    - Nombre: ${clientName}
    
    ¿Me podrías confirmar la reserva? Gracias!`;

    // 📌 Número de WhatsApp del negocio (se puede cambiar según cada negocio)
    const businessPhoneNumber = "5491123175048"; // Número de WhatsApp con código de país

    // 📩 Generar el enlace de WhatsApp
    const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent(message)}`;

    // 🔥 Abrir WhatsApp con el mensaje
    window.open(whatsappUrl, "_blank");

    // ✅ Mostrar modal de confirmación
    setOpen(true);
  };

  return (
    <>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="250"
          image={product["Imagen/Link a Imagen"] || placeholderImage}
          alt={product["Nombre del Producto"] || "Modelo de uñas"}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {product["Nombre del Producto"] || "Modelo de uñas"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product["Descripción"] || "Elige tu diseño y reserva tu turno"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Seleccionar Fecha"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Seleccionar Hora"
                  value={selectedTime}
                  onChange={(newTime) => setSelectedTime(newTime)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleReserve}
        >
          Reservar Turno
        </Button>
      </Card>
      {/* Modal de Confirmación */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>¡Reserva Enviada por WhatsApp!</DialogTitle>
        <DialogContent>
          <Typography>Tu solicitud ha sido enviada por WhatsApp.</Typography>
          <Typography>El negocio te responderá para confirmar el turno.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NailsCatalogo;
