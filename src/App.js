import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
/* import Home from "./Home";  */
import CatalogoIndumentaria from "./CatalogoIndumentaria"; 
import CatalogoNails from "./CatalogoNails"; 
import EditCatalogAdvanced from "./EditCatalogAdvanced"; 
import CatalogoPeluqueria from "./CatalogoPeluqueria";
import Catalogo from "./Catalogo";
import CatalogoArticulos from "./CatalogoArticulos"; // 🆕 Agregado

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<CatalogoArticulos />} />
        <Route path="/catalogoIndumentaria" element={<CatalogoIndumentaria />} />
        <Route path="/catalogoNails" element={<CatalogoNails />} />
        <Route path="/catalogoPeluqueria" element={<CatalogoPeluqueria />} />
        <Route path="/editar-catalogo" element={<EditCatalogAdvanced />} />
        <Route path="/catalogo/:rubro" element={<Catalogo />} />
        <Route path="/catalogoArticulos" element={<CatalogoArticulos />} /> {/* ✅ NUEVA RUTA */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
