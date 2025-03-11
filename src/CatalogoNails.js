import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet";
import logo from "./assets/logo-unias.jpeg";
import NailsCatalogo from "./components/NailsCatalogo"; // 🆕 Nuevo componente

const sheetId = "18lKZAGwI4vWd2y8Mkv39WxdWoX_xmNMYM5hnYqJvyiE"; // 🆕 Nuevo ID
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

const CatalogoNails = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    fetch(csvUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el CSV");
        }
        return response.text();
      })
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        }).data;
        setProductos(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar y parsear los datos:", error);
        setLoading(false);
      });
  }, []);

  const onReserve = (reservationData) => {
    console.log("Reserva realizada:", reservationData);
  };

  return (
    <>
      <header className="header esculpidas">
          <div className="flex-center-column" style={{ textAlign: "center", marginTop: "10px" }}>
            <img src={logo} alt="logo" width="200" style={{ marginTop: "10px", marginBottom: "20px" }} />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <TextField
              style={{ maxWidth: 600, background: 'white' }}
              fullWidth
              label="Buscar Modelo de Uñas"
              variant="outlined"
              color="secondary"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
      </header>
      <Container maxWidth="lg">
        <Helmet>
          <title>Catálogo de Uñas Esculpidas</title>
        </Helmet>
        {loading ? (
          <Grid container spacing={2}>
            {[...Array(8)].map((_, idx) => (
              <Grid item xs={6} sm={4} md={3} key={idx}>
                <Skeleton variant="rectangular" width="100%" height={300} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {productos.map((producto, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <NailsCatalogo product={producto} onReserve={onReserve} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default CatalogoNails;
