import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TipoPropiedadPage from './pages/tipoPropiedad/TipoPropiedadPage';
import LocalidadPage from './pages/localidad/LocalidadPage'
import PropiedadPage from './pages/propiedad/PropiedadPage';
import NewTipoPropiedad from './pages/tipoPropiedad/nuevo/NewTipoPropiedad'
import EditTipoPropiedad from './pages/tipoPropiedad/edit/EditTipoPropiedad';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import DetailPropiedad from './pages/propiedad/DetailPropiedad';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HeaderComponent/>
    <BrowserRouter>
      <Routes>
        <Route path="/propiedad" element={<PropiedadPage />}/>
        <Route path="/tipo-propiedad/editar/:id/:nombre" element={<EditTipoPropiedad />} />
        <Route path="/tipoPropiedad/nuevo" element={<NewTipoPropiedad />}/>
        <Route path="/tipoPropiedad" element={<TipoPropiedadPage />}/>
        <Route path="/localidad" element={<LocalidadPage />}/>
        <Route path="/propiedad/:id" element={<DetailPropiedad />} />

      </Routes>
    </BrowserRouter>
    <FooterComponent/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
