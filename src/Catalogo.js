import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ProductsCatalogo from "./components/productsCalatogo";
import Papa from "papaparse";

const SHEET_ID = "1TR5cXBl4wK5Wc-T2OP8q4nv62Kjl8E0KEFVx6RpRbQc";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

const Catalogo = () => {
  const { rubro } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }).data;
        const productosFiltrados = parsedData.filter(
          (item) => item.rubro?.toLowerCase() === rubro.toLowerCase()
        );
        setProductos(productosFiltrados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos:", error);
        setLoading(false);
      });
  }, [rubro]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mt: 4, mb: 2 }}>
        Catálogo de {rubro.charAt(0).toUpperCase() + rubro.slice(1)}
      </Typography>

      {loading ? (
        <Typography textAlign="center">Cargando productos...</Typography>
      ) : productos.length > 0 ? (
        <Grid container spacing={2}>
          {productos.map((producto, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductsCatalogo product={producto} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center">No hay productos disponibles en esta categoría.</Typography>
      )}
    </Container>
  );
};

export default Catalogo;
