import React from "react";
import { Typography, Button, Container, List, ListItem, ListItemText } from "@mui/material";

const ShoppingCart = ({ cart, onRemoveFromCart, onClearCart }) => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "20px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
      <Typography variant="h5" gutterBottom>
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Tu carrito está vacío.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item["Código/ID del Producto"]} divider>
                <ListItemText
                  primary={item["Nombre del Producto"]}
                  secondary={`Precio: $${item["Precio de Venta"]}`}
                />
                <Button variant="outlined" color="error" onClick={() => onRemoveFromCart(item["Código/ID del Producto"])}>
                  Quitar
                </Button>
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "10px" }}
            onClick={onClearCart}
          >
            Vaciar Carrito
          </Button>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
