import React, { useEffect } from 'react';

const MercadoPagoCheckout = ({ preferenceId }) => {
  useEffect(() => {
    const publicKey = "TEST-d5f2003a-ffdf-404d-8c83-f2a1fd910a18"; // Clave pública de prueba

    if (!preferenceId) {
      console.error("No se ha proporcionado una preferencia de pago válida.");
      return;
    }

    if (window.MercadoPago) {
      const mp = new window.MercadoPago(publicKey, {
        locale: 'es-AR'
      });

      mp.checkout({
        preference: {
          id: preferenceId, // Verifica que esta preferencia sea válida
        },
        render: {
          container: '.cho-container', // Elemento donde se renderiza el botón de checkout
          label: 'Realizar Compra', // Texto del botón
        },
      });
    } else {
      console.error("MercadoPago SDK no está cargado correctamente.");
    }
  }, [preferenceId]);

  return <div className="cho-container"></div>;
};

export default MercadoPagoCheckout;
