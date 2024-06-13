import React from "react";
import logo from '../assets/images/Logo.png'
import '../assets/styles/logo.css';
import NavBar from './NavBarComponent';

const HeaderComponent = () => {
    return (
      <div className="logo-container">
        <img src= {logo} alt="Mi logo" className="logo-img"  />
        <div className="logo-text"> LUMINAR Reservas Inmobiliarias</div>
        <NavBar/>
      </div>
    );
  };

export default HeaderComponent;