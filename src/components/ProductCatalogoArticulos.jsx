import React from "react";
import { Card, CardContent, Typography, Button, CardMedia, Box } from "@mui/material";

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = React.useState(0);

  if (!images.length) return null;

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <CardMedia
        component="img"
        height="240"
        image={images[current]}
        alt={`Imagen ${current + 1}`}
        sx={{ objectFit: "cover" }}
      />
      {images.length > 1 && (
        <>
          <Button onClick={prev} sx={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)" }}>‹</Button>
          <Button onClick={next} sx={{ position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)" }}>›</Button>
        </>
      )}
    </Box>
  );
};

const ProductCatalogoArticulos = ({ product }) => {
  const fotos = (product.fotos || "").split(",").map((url) => url.trim()).filter(Boolean);
  const nombre = product.nombre || "Sin nombre";
  const precioCuota = product.precio_cuota ? `$${Number(product.precio_cuota).toLocaleString("es-AR")}` : "Consultar";
  const cuotas = product.cantidad_de_cuotas || "1";

  const whatsappMessage = encodeURIComponent("me interesaría comprar este artículo en cuotas");
  const whatsappUrl = `https://wa.me/541151347453?text=${whatsappMessage}`;

  return (
    <Card sx={{ maxWidth: 500, boxShadow: 3, borderRadius: 2 }}>
      <ImageSlider images={fotos} />

      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ minHeight: 63}}>{nombre}</Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "green", fontWeight: "bold" }}>
          {cuotas} cuotas <span style={{ textTransform: "uppercase" }}>sin interés de:</span>
        </Typography>
        <Typography variant="h4" color="primary" fontWeight="bold">{precioCuota}</Typography>
      </CardContent>

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          color="success"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar por WhatsApp
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCatalogoArticulos;
