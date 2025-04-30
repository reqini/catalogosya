import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import ProductCatalogoArticulos from "./components/ProductCatalogoArticulos";

const CatalogoArticulos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const sheetId = "1zB8-2WtpUkrRHhcWEbYHcrIP9HZPsgP2Fy3QVeTCUA0";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    fetch(csvUrl)
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
        });
        setProductos(parsed.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header style={{ textAlign: "center", marginTop: 40 }}>
  <TextField
    style={{ maxWidth: 600, background: 'white' }}
    fullWidth
    label="Buscar artículo"
    variant="outlined"
    color="secondary"
    value={filtro}
    onChange={(e) => setFiltro(e.target.value)}
  />
</header>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Helmet>
          <title>Mis Artículos en Venta</title>
        </Helmet>
        {loading ? (
          <Grid container spacing={2}>
            {[...Array(8)].map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={idx}>
                <Skeleton variant="rectangular" width="100%" height={300} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {productos
              .filter((p) =>
                (p.nombre || "").toLowerCase().includes(filtro.toLowerCase())
              )
              .map((producto, i) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                  <ProductCatalogoArticulos product={producto} />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>

      <footer style={{ textAlign: "center", margin: 40 }}>
        <Typography variant="caption">
          Catálogo personal desarrollado por <b>Luciano Recchini</b>
        </Typography>
      </footer>
    </>
  );
};

export default CatalogoArticulos;
