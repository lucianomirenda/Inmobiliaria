import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TipoPropiedadPage from './pages/tipoPropiedad/TipoPropiedadPage';
import LocalidadPage from './pages/localidad/LocalidadPage'
import NewTipoPropiedad from './pages/tipoPropiedad/nuevo/NewTipoPropiedad'
import EditTipoPropiedad from './pages/tipoPropiedad/edit/EditTipoPropiedad';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/tipo-propiedad/editar/:id" element={<EditTipoPropiedad />} />
        <Route path="/tipoPropiedad/nuevo" element={<NewTipoPropiedad />}/>
        <Route path="/tipoPropiedad" element={<TipoPropiedadPage />}/>
        <Route path="/localidad" element={<LocalidadPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
