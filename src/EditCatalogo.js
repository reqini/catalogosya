import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import ColorPicker from "react-color";
import Papa from "papaparse";

const EditCatalog = () => {
  const location = useLocation();
  const { rubroSeleccionado, nombreCatalogo } = location.state || {};

  const [businessName, setBusinessName] = useState(nombreCatalogo || "");
  const [logo, setLogo] = useState(null);
  const [primaryColor, setPrimaryColor] = useState("#A47A9E");
  const [secondaryColor, setSecondaryColor] = useState("#FBE5B2");
  const [enableCart, setEnableCart] = useState(true);
  const [enableReservations, setEnableReservations] = useState(false);
  const [enableAppointments, setEnableAppointments] = useState(false);
  const [catalogUrl, setCatalogUrl] = useState("");

  // Cargar datos del catálogo desde Google Sheets (simulación)
  useEffect(() => {
    const sheetId = "1TR5cXBl4wK5Wc-T2OP8q4nv62Kjl8E0KEFVx6RpRbQc";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    fetch(csvUrl)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        const catalogData = parsedData.find((item) => item.rubro === rubroSeleccionado);

        if (catalogData) {
          setBusinessName(catalogData.Nombre || "");
          setLogo(catalogData.Logo || "");
          setPrimaryColor(catalogData.ColorPrimario || "#A47A9E");
          setSecondaryColor(catalogData.ColorSecundario || "#FBE5B2");
          setEnableCart(catalogData.Carrito === "Sí");
          setEnableReservations(catalogData.Reservas === "Sí");
          setEnableAppointments(catalogData.Turnos === "Sí");
        }
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, [rubroSeleccionado]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const generateCatalogUrl = () => {
    const encodedName = encodeURIComponent(businessName);
    return `https://catalogossimples.ar/${encodedName}`;
  };

  const saveCatalogConfig = () => {
    const newCatalogUrl = generateCatalogUrl();
    setCatalogUrl(newCatalogUrl);
    alert("Configuración guardada con éxito 🎉");
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, display: "flex", height: "80vh" }}>
      {/* Panel de Configuración (30%) */}
      <Box sx={{ width: "30%", p: 3, borderRight: "2px solid #ddd" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          🎨 Configuración
        </Typography>
        <TextField fullWidth label="Nombre del Negocio" variant="outlined" value={businessName} onChange={(e) => setBusinessName(e.target.value)} sx={{ mb: 2 }} />
        <Typography variant="subtitle1">Logo</Typography>
        <Button variant="contained" component="label" startIcon={<PhotoCamera />} fullWidth sx={{ mb: 2 }}>
          Subir Logo
          <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
        </Button>
        {logo && <Card sx={{ mb: 2 }}><CardMedia component="img" height="80" image={logo} alt="Logo" /></Card>}
        <Typography variant="subtitle1">Colores</Typography>
        <ColorPicker color={primaryColor} onChange={(color) => setPrimaryColor(color.hex)} />
        <ColorPicker color={secondaryColor} onChange={(color) => setSecondaryColor(color.hex)} />
        <FormControlLabel control={<Switch checked={enableCart} onChange={(e) => setEnableCart(e.target.checked)} />} label="🛒 Habilitar Carrito" />
        <FormControlLabel control={<Switch checked={enableReservations} onChange={(e) => setEnableReservations(e.target.checked)} />} label="📅 Habilitar Reservas" />
        <FormControlLabel control={<Switch checked={enableAppointments} onChange={(e) => setEnableAppointments(e.target.checked)} />} label="🕒 Habilitar Turnos" />
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={saveCatalogConfig}>📂 Guardar Configuración</Button>
      </Box>

      {/* Vista Previa del Catálogo (70%) */}
      <Box sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
        <Card sx={{ width: "90%", minHeight: "70vh", backgroundColor: primaryColor, color: secondaryColor }}>
          <CardContent>
            <Typography variant="h4">{businessName}</Typography>
            {logo && <img src={logo} alt="Logo" width="80" />}
            {enableCart && <Typography>🛒 Carrito Habilitado</Typography>}
            {enableReservations && <Typography>📅 Reservas Habilitadas</Typography>}
            {enableAppointments && <Typography>🕒 Turnos Habilitados</Typography>}
            {catalogUrl && (<Typography>🌍 <a href={catalogUrl} target="_blank" rel="noopener noreferrer">{catalogUrl}</a></Typography>)}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default EditCatalog;
