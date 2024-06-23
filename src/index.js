import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TipoPropiedadPage from './pages/tipoPropiedad/TipoPropiedadPage';
import NewTipoPropiedad from './pages/tipoPropiedad/NewTipoPropiedad'
import EditTipoPropiedad from './pages/tipoPropiedad/EditTipoPropiedad';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ReservaPage from './pages/reserva/ReservaPage';
import NewReserva from './pages/reserva/NewReserva'
import EditReserva from './pages/reserva/EditReserva';
import DetailPropiedad from './pages/propiedad/DetailPropiedad';
import EditPropiedad from './pages/propiedad/EditPropiedad';
import NewPropiedad from './pages/propiedad/NewPropiedad';
import PropiedadPage from './pages/propiedad/PropiedadPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HeaderComponent/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropiedadPage />}/>
        <Route path="/propiedad/editar/:id" element={<EditPropiedad />}/>
        <Route path="/propiedad/nuevo" element={<NewPropiedad />}/>
        <Route path="/propiedad/:id" element={<DetailPropiedad />}/>
        <Route path="/tipo-propiedad/editar/:id/:nombre" element={<EditTipoPropiedad />} />
        <Route path="/tipoPropiedad/nuevo" element={<NewTipoPropiedad />}/>
        <Route path="/tipoPropiedad" element={<TipoPropiedadPage />}/>
        <Route path="/reservas" element={<ReservaPage />}/>
        <Route path="/reservas/nuevo" element={<NewReserva />}/>
        <Route path="/reservas/editar/:id" element={<EditReserva/>}/>
      </Routes>
    </BrowserRouter>
    <FooterComponent/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();