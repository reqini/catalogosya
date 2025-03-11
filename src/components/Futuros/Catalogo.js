import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Chip, Grid, Box, MenuItem, Select } from "@mui/material";
import { FaShoppingCart, FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const placeholderImage = "/placeholder.png"; // Imagen por defecto

// Mapeo de nombres de colores a códigos HEX
const colorMap = {
  "Rojo": "#FF0000", "Azul": "#0000FF", "Negro": "#000000", "Blanco": "#FFFFFF", 
  "Verde": "#008000", "Amarillo": "#FFFF00", "Gris": "#808080", "Marrón": "#A52A2A", 
  "Rosa": "#FFC0CB", "Violeta": "#8A2BE2", "Celeste": "#87CEEB", "Naranja": "#FFA500",
};

const getColorHex = (colorName) => colorMap[colorName] || "#808080";

const ProductsCatalogo = ({ product, onAddToCart, onReserve }) => {
  const [selectedTalle, setSelectedTalle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const productImage = product["Imagen/Link a Imagen"]?.trim() || placeholderImage;
  const coloresDisponibles = product["Colores Disponibles"]?.split(";").map((color) => color.trim()) || [];
  const tallesDisponibles = product["Talles Disponibles"]?.split(";").map((talle) => talle.trim()) || [];

  // Detectar si es un servicio o un producto físico
  const isService = product["Categoría"]?.toLowerCase().includes("pestañas") || product["Categoría"]?.toLowerCase().includes("peluquería");

  return (
    <Card sx={{ maxWidth: 445, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia component="img" height="200" image={productImage} alt={product["Nombre del Producto"] || "Producto"} sx={{ objectFit: "cover" }} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{product["Nombre del Producto"] || "Producto sin nombre"}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{product["Descripción"] || "Descripción no disponible"}</Typography>
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item><Chip color="secondary" label={`Marca: ${product["Marca"] || "Sin marca"}`} variant="outlined" /></Grid>
          <Grid item><Chip color="secondary" label={`Categoría: ${product["Categoría"] || "Sin categoría"}`} variant="outlined" /></Grid>
        </Grid>
        <Typography variant="h6" color="secondary" fontWeight="bold">${product["Precio de Venta"] || "Consultar"}</Typography>
        {product["Stock Actual"] === "0" ? (
          <Typography variant="body2" color="error"><b>Sin stock</b></Typography>
        ) : (
          <Typography variant="body2" color="text.secondary"><b>Stock disponible:</b> {product["Stock Actual"] || "N/D"}</Typography>
        )}
        {tallesDisponibles.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2"><b>Talles:</b></Typography>
            <Select value={selectedTalle} onChange={(e) => setSelectedTalle(e.target.value)} fullWidth>
              {tallesDisponibles.map((talle, index) => (
                <MenuItem key={index} value={talle}>{talle}</MenuItem>
              ))}
            </Select>
          </Box>
        )}
        {coloresDisponibles.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}><b>Colores:</b></Typography>
            {coloresDisponibles.map((color, index) => (
              <Box key={index} sx={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: getColorHex(color), border: "1px solid #ccc", marginRight: 1 }} title={color} />
            ))}
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        {isService ? (
          <>
            <Button fullWidth variant="contained" color="primary" startIcon={<FaCalendarAlt />} onClick={() => setShowCalendar(!showCalendar)}>
              Reservar Turno
            </Button>
            {showCalendar && <Calendar onChange={setSelectedDate} value={selectedDate} />}
          </>
        ) : (
          <Button fullWidth variant="contained" color="primary" startIcon={<FaShoppingCart />} onClick={() => onAddToCart(product)}>
            Agregar al carrito
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductsCatalogo;
