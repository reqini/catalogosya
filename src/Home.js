import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const Home = ({ onCatalogSelected }) => {
  const [rubros, setRubros] = useState([]);
  const [rubroSeleccionado, setRubroSeleccionado] = useState("");
  const [nombreCatalogo, setNombreCatalogo] = useState("");
  const navigate = useNavigate();

  // ID de la hoja de Google Sheets y el GID de la pestaña específica
  const sheetId = "1TR5cXBl4wK5Wc-T2OP8q4nv62Kjl8E0KEFVx6RpRbQc";
  const gid = "2052569170"; // GID correcto de la hoja de datos
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

  // Cargar datos del Google Sheet en formato CSV
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Error al obtener el CSV");

        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        }).data;

        // Extraer rubros únicos de la hoja "datos-catalogo"
        const rubrosUnicos = [...new Set(parsedData.map((item) => item.rubro))];
        setRubros(rubrosUnicos);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [csvUrl]); // Se agregó csvUrl como dependencia para evitar advertencias de ESLint

  // Manejar el cambio de rubro y actualizar el nombre del catálogo
  const handleRubroChange = (event) => {
    const selectedRubro = event.target.value;
    setRubroSeleccionado(selectedRubro);

    // Buscar el nombre del catálogo correspondiente en la hoja
    fetch(csvUrl)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        const catalogoData = parsedData.find((item) => item.rubro === selectedRubro);

        if (catalogoData) {
          setNombreCatalogo(catalogoData.nombreCatalogo || "Catálogo sin nombre");
        }
      })
      .catch((error) => console.error("Error al actualizar nombre de catálogo:", error));
  };

  const handleContinue = () => {
    if (rubroSeleccionado) {
      navigate("/editar-catalogo", { state: { rubroSeleccionado, nombreCatalogo } });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a Catálogo Simple
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Por favor, seleccione el rubro de su catálogo y continúe.
      </Typography>

      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Seleccione un rubro</InputLabel>
        <Select value={rubroSeleccionado} onChange={handleRubroChange}>
          {rubros.map((rubro, index) => (
            <MenuItem key={index} value={rubro}>
              {rubro}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Nombre del Catálogo"
        value={nombreCatalogo}
        sx={{ my: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!rubroSeleccionado}
        onClick={handleContinue}
      >
        Continuar
      </Button>
    </Container>
  );
};

export default Home;
