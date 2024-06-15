import React from 'react';
import '../assets/styles/NavBar.css';

function NavbarComponent () {
  return (
    <nav className="navbar">
      <ul>
        <a href="/" className="nav-item">Inicio</a>
        <a href="/tipoPropiedad" className="nav-item">Tipos de propiedad</a>
        <a href="/propiedad" className="nav-item">Propiedades</a>
        <a href="/Reservas" className="nav-item">Reservas</a>
        <a href="/localidad" className="nav-item">Localidades</a>
        <a href="/Inquilinos" className="nav-item">Inquilinos</a>
      </ul>
    </nav>
  );
}

export default NavbarComponent;