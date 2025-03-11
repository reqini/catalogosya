import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatPrice } from "../utils/priceUtils";

const ShoppingCart = ({ cart, onClearCart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Calcular total del carrito
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + parseFloat(item["Precio de Venta"] || 0), 0);
    setTotalPrice(total);
  }, [cart]);

  // Eliminar un producto del carrito
  const handleRemoveFromCart = useCallback(
    (codigo) => {
      setCart((prevCart) => prevCart.filter((item) => item.codigo !== codigo));
    },
    [setCart]
  );

  // Generar el link de pago con Mercado Pago
  const createPaymentLink = async () => {
    const accessToken = "APP_USR-2910993893490260-030819-0594b6fa1e42f71725cef1d0ee153953-24582974"; // ⚠️ Reemplázalo con tu Access Token de prueba

    const items = cart.map((item) => ({
      title: item["Nombre del Producto"],
      quantity: 1,
      currency_id: "ARS",
      unit_price: parseFloat(item["Precio de Venta"]),
    }));

    try {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Token de Mercado Pago
        },
        body: JSON.stringify({
          items,
          auto_return: "approved",
          back_urls: {
            success: window.location.href,
            failure: window.location.href,
            pending: window.location.href,
          },
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.open(data.init_point, "_blank"); // Abre el checkout en otra pestaña
      } else {
        console.error("Error al generar el link de pago:", data);
        alert("No se pudo generar el link de pago. Revisa las credenciales.");
      }
    } catch (error) {
      console.error("Error en la solicitud a Mercado Pago:", error);
      alert("Error al conectar con Mercado Pago.");
    }
  };

  return (
    <div className="fixed-menu flex-center" style={{ position: "relative", }}>
      <Accordion
        sx={{
          width: "100%",
          maxWidth: 500,
          bottom: 12,
          borderRadius: "25px!important",
          overflow: "hidden",
          "@media (max-width:986px)": {
            borderRadius: "0px!important",
            width: "100%",
            bottom: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          className="accordion"
        >
          <div className="flex">
            <AddShoppingCartIcon classes="color-w" />
            <Typography color={'white'} className="mar-l8">Carrito de Compras</Typography>
          </div>
          <Typography color={'white'} fontWeight={800}>Total: {formatPrice(totalPrice)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="lg" className="flex-center" style={{ flexDirection: "column"}}>
            <ul className="w-100">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <li key={item.codigo} className="w-100 flex flex-direction">
                    <div className="flex justify-between mar-t15 mar-b10">
                      {item["Nombre del Producto"]}
                      <FaTrashAlt
                        onClick={() => handleRemoveFromCart(item.codigo)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </div>
                    <Typography variant="body2" color="text.secondary">
                      Precio: {formatPrice(item["Precio de Venta"])}
                    </Typography>
                    <Divider style={{ marginTop: 10 }} />
                  </li>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary" style={{ marginTop: 20 }}>
                  No hay productos en el carrito.
                </Typography>
              )}
            </ul>

            {/* Botón para realizar la compra con Mercado Pago */}
            {cart.length > 0 && (
              <Button
                variant="contained"
                fullWidth
                color="success"
                style={{ margin: "10px 0" }}
                onClick={createPaymentLink}
              >
                Realizar Compra
              </Button>
            )}

            {/* Botón para limpiar el carrito */}
            <Button color="secondary" fullWidth style={{ height: 38 }} variant="contained" onClick={onClearCart}>
              Limpiar carrito
            </Button>
          </Container>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ShoppingCart;
