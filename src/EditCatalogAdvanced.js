import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  CardMedia,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ColorPicker from "react-color";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const SHEET_ID = "1TR5cXBl4wK5Wc-T2OP8q4nv62Kjl8E0KEFVx6RpRbQc";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

const CARD_COMPONENTS = ["Indumentaria", "Electrónica", "Juguetería", "Belleza"];

const EditCatalogAdvanced = ({ businessType }) => {
  const [businessName, setBusinessName] = useState("");
  const [logo, setLogo] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#A47A9E");
  const [secondaryColor, setSecondaryColor] = useState("#FBE5B2");
  const [enableCart, setEnableCart] = useState(true);
  const [enableReservations, setEnableReservations] = useState(false);
  const [enableAppointments, setEnableAppointments] = useState(false);
  const [catalogUrl, setCatalogUrl] = useState("");
  const [selectedCard, setSelectedCard] = useState("Indumentaria");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        const filteredData = parsedData.find((item) => item.rubro === businessType);

        if (filteredData) {
          setBusinessName(filteredData.Nombre || "");
          setLogo(filteredData.Logo || "");
          setPrimaryColor(filteredData.ColorPrimario || "#A47A9E");
          setSecondaryColor(filteredData.ColorSecundario || "#FBE5B2");
          setEnableCart(filteredData.Carrito === "Sí");
          setEnableReservations(filteredData.Reservas === "Sí");
          setEnableAppointments(filteredData.Turnos === "Sí");
          setCatalogUrl(filteredData.URL || "");
        }
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, [businessType]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setLogo(fileUrl);
    }
  };

  const generateCatalogUrl = () => {
    const encodedName = encodeURIComponent(businessName);
    return `https://catalogossimples.ar/${encodedName}`;
  };

  const saveToGoogleSheets = () => {
    const newCatalogUrl = generateCatalogUrl();
    setCatalogUrl(newCatalogUrl);

    const dataToSave = {
      Nombre: businessName,
      Logo: logo,
      ColorPrimario: primaryColor,
      ColorSecundario: secondaryColor,
      Carrito: enableCart ? "Sí" : "No",
      Reservas: enableReservations ? "Sí" : "No",
      Turnos: enableAppointments ? "Sí" : "No",
      URL: newCatalogUrl,
    };

    console.log("Guardando en Google Sheets:", dataToSave);
    alert("Configuración guardada con éxito 🎉");
    navigate(`/catalogo/${businessName}`);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, display: "flex", height: "80vh" }}>
      <Box sx={{ width: "30%", p: 3, borderRight: "2px solid #ddd" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          🎨 Configuración
        </Typography>
        <Typography variant="subtitle1">Logo</Typography>
        <Button variant="contained" component="label" startIcon={<PhotoCamera />} fullWidth sx={{ mb: 2 }}>
          Subir Logo
          <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
        </Button>
        {logo && <Card sx={{ mb: 2 }}><CardMedia component="img" height="80" image={logo} alt="Logo" /></Card>}
        <TextField fullWidth label="Nombre del Negocio" variant="outlined" value={businessName} onChange={(e) => setBusinessName(e.target.value)} sx={{ mb: 2 }} />
        <Typography variant="subtitle1">Colores</Typography>
        <ColorPicker color={primaryColor} onChange={(color) => setPrimaryColor(color.hex)} />
        <ColorPicker color={secondaryColor} onChange={(color) => setSecondaryColor(color.hex)} />
        <Typography variant="subtitle1">Selecciona el tipo de tarjeta</Typography>
        <FormControl fullWidth>
          <Select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)}>
            {CARD_COMPONENTS.map((card, index) => (
              <MenuItem key={index} value={card}>{card}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel control={<Switch checked={enableCart} onChange={(e) => setEnableCart(e.target.checked)} />} label="🛒 Habilitar Carrito" />
        <FormControlLabel control={<Switch checked={enableReservations} onChange={(e) => setEnableReservations(e.target.checked)} />} label="📅 Habilitar Reservas" />
        <FormControlLabel control={<Switch checked={enableAppointments} onChange={(e) => setEnableAppointments(e.target.checked)} />} label="🕒 Habilitar Turnos" />
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={saveToGoogleSheets}>📂 Guardar Configuración</Button>
      </Box>
      <Box sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
        <Card sx={{ width: "90%", minHeight: "70vh", backgroundColor: primaryColor, color: secondaryColor }}>
          <CardContent>
            <Typography variant="h4">{businessName}</Typography>
            {logo && <img src={logo} alt="Logo" width="80" />}
            <Typography>Vista previa del catálogo con {selectedCard}</Typography>
            {catalogUrl && <Typography>🌍 <a href={catalogUrl} target="_blank" rel="noopener noreferrer">{catalogUrl}</a></Typography>}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default EditCatalogAdvanced;
