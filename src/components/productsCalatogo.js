import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Grid, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";

const placeholderImage = "/placeholder.png"; // Imagen por defecto

const ProductsCatalogo = ({ product, onAddToCart }) => {
  // Usar imagen del producto o fallback si está vacía
  const productImage =
    product["Imagen/Link a Imagen"] && product["Imagen/Link a Imagen"].trim()
      ? product["Imagen/Link a Imagen"]
      : placeholderImage;

  // Obtener los colores disponibles y convertirlos en chips visuales
  const colores = product["Color"]
    ? product["Color"].split(";").map((color) => color.trim())
    : [];

  // Si el producto es de la categoría "Calzado", mostrar los talles disponibles
 /*  const esCalzado = product["Categoría"]?.toLowerCase() === "calzado"; */
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const talles = product["Talle"]
    ? product["Talle"].split(",").map((talle) => talle.trim())
    : [];

  // Manejo de stock
  const stockDisponible = Number(product["Stock"] || 0);
  const sinStock = stockDisponible <= 0;

  return (
    <Card
      sx={{
        maxWidth: 445,
        boxShadow: 3,
        borderRadius: 2,
        opacity: sinStock ? 0.5 : 1,
      }}
    >
      {/* Imagen del producto */}
      <CardMedia
        component="img"
        height="200"
        image={productImage}
        alt={product["Nombre del Producto"] || "Producto"}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        {/* Nombre del producto */}
        <Typography variant="h6" fontWeight="bold">
          {product["Nombre"] || "Producto sin nombre"}
        </Typography>

        {/* Descripción */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product["Descripción"] || "Descripción no disponible"}
        </Typography>

        {/* Marca y Categoría */}
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              <b>Categoría:</b> {product["Categoría"] || "Sin categoría"}
            </Typography>
          </Grid>
        </Grid>

        {/* Precio */}
        <Typography variant="h6" color="secondary" fontWeight="bold">
          ${product["Precio"] || "Consultar"}
        </Typography>

        {/* Stock y ubicación */}
        <Typography variant="body2" color="text.secondary">
          <b>Stock disponible:</b> {stockDisponible > 0 ? stockDisponible : "Sin stock"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Ubicación:</b> {product["Ubicación en Almacén"] || "No especificada"}
        </Typography>

        {/* Mostrar colores disponibles */}
        {colores.length > 0 && (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Colores:
            </Typography>
            {colores.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: color.toLowerCase(),
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </Box>
        )}

        {/* Mostrar selector de talles */}
        {talles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Talle</InputLabel>
              <Select
                value={talleSeleccionado}
                onChange={(e) => setTalleSeleccionado(e.target.value)}
              >
                {talles.map((talle, index) => (
                  <MenuItem key={index} value={talle}>
                    {talle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        {/* Botón de agregar al carrito */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<FaShoppingCart />}
          onClick={() => onAddToCart(product)}
          disabled={sinStock}
        >
          {sinStock ? "Sin stock" : "Agregar al carrito"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductsCatalogo;