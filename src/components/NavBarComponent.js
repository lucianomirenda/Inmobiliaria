import React from 'react';
import '../assets/styles/NavBar.css';


function NavbarComponent() {

  return (
    <nav className="navbar">
      <ul>
        <a href="/tipoPropiedad" className="nav-item">Tipo de Propiedad</a>
        <a href="/" className="nav-item">Propiedades</a>
        <a href="/reservas" className="nav-item">Reservas</a>
      </ul>
    </nav>
  );
}

export default NavbarComponent;

