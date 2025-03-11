import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import logo from "./assets/logo.png";
import ProductsCatalogo from "./components/productsCalatogo";
import ShoppingCart from "./components/cart"; // Asegúrate de que este sea el nombre correcto

const CatalogoIndumentaria = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [cart, setCart] = useState([]); // 🛑 setCart debe existir aquí

  // Cargar datos del Google Sheet en formato CSV
  useEffect(() => {
    const sheetId = "1TR5cXBl4wK5Wc-T2OP8q4nv62Kjl8E0KEFVx6RpRbQc";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

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
        });
        setProductos(parsedData.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar y parsear los datos:", error);
        setLoading(false);
      });
  }, []);

  // Agregar producto al carrito
  const onAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Limpiar carrito
  const onClearCart = () => {
    setCart([]);
  };

  return (
    <>
      <header className="header">
          <div className="flex-center-column" style={{ textAlign: "center", marginTop: "10px" }}>
            <img
              src={logo}
              alt="logo"
              width="200"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <TextField
              style={{ maxWidth: 600, background: 'white' }}
              fullWidth
              label="Buscar Producto"
              variant="outlined"
              color="secondary"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
      </header>
      <Container maxWidth="lg">
        <Helmet>
          <title>Catalogo Simple - Catálogo</title>
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
                <ProductsCatalogo product={producto} onAddToCart={onAddToCart} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* 🛑 SE PASA `setCart` AQUÍ */}
        <ShoppingCart cart={cart} setCart={setCart} onClearCart={onClearCart} />
      </Container>
      <footer className="w-100">
        <Typography variant="caption">
          Desarrollado por:{" "}
          <b>
            <a href="https://www.instagram.com/lrecchini/" rel="noreferrer">
              Luciano Recchini
            </a>
          </b>
        </Typography>
      </footer>
    </>
  );
};

export default CatalogoIndumentaria;
