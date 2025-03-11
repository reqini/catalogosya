import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home"; 
import CatalogoIndumentaria from "./CatalogoIndumentaria"; 
import CatalogoNails from "./CatalogoNails"; // 🆕 Importamos el catálogo de uñas
import EditCatalogAdvanced from "./EditCatalogAdvanced"; 
import Catalogo from "./Catalogo"; // Nuevo componente genérico para renderizar catálogos según el rubro

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalogoIndumentaria" element={<CatalogoIndumentaria />} />
        <Route path="/catalogoNails" element={<CatalogoNails />} /> {/* 🆕 Nueva Ruta */}
        <Route path="/editar-catalogo" element={<EditCatalogAdvanced />} />
        <Route path="/catalogo/:rubro" element={<Catalogo />} /> {/* Ruta dinámica para catálogos */}
        <Route path="*" element={<Navigate to="/home" />} /> {/* Redirección 404 */}
      </Routes>
    </Router>
  );
}

export default App;
