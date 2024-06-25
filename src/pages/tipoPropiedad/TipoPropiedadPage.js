import React, { useState, useEffect } from 'react';
import '../../assets/styles/Pages.css';
import '../../assets/styles/Mensajes.css';
import { Link } from 'react-router-dom'; 
import { fetchTiposPropiedad } from '../../utils/api';

const TipoPropiedadPage = () => {
  const [tiposPropiedad, setTiposPropiedad] = useState([]);
  const [error, setError] = useState(null);
  const [exito,setExito] = useState(null);
  const [mostrarError, setMostrarError] = useState(false); 
  const [mostrarExito, setMostrarExito] = useState(false);

  function mostrarErrorOn() {
    setMostrarError(true);
    setTimeout(() => {
      setMostrarError(false);
      setError(null);
      setExito(null);
    }, 5000);
  }
  
  function mostrarExitoOn() {
    setMostrarExito(true);
    setTimeout(() => {
      setMostrarExito(false);
      setError(null);
      setExito(null);
    }, 5000);
  }

  useEffect(() => {
    
    const cargarDatos = async () => {
      try {
          const tiposPropiedadData = await fetchTiposPropiedad();
          setTiposPropiedad(tiposPropiedadData)
      } catch (error){
          console.log(error);
      }
    };

    cargarDatos();
  }, []);

  const handleEliminarTipoPropiedad = async (tipoId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el tipo de propiedad "${tiposPropiedad.find(tipo => tipo.id === tipoId)?.nombre}"?`)) {
      try {
        const response = await fetch(`http://localhost/tipos_propiedad/${tipoId}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        
        if (!response.ok) {
          const error = new Error('Error en la respuesta de la API');
          error.data = data.message;
          throw error;
        }

        setTiposPropiedad(tiposPropiedad.filter(tipo => tipo.id !== tipoId));
        setExito(data.message);
        mostrarExitoOn();

      } catch (error) {
        console.error('Error al eliminar el tipo de propiedad:', error.data);
        setError(error.data)
        mostrarErrorOn() 
      }
    }
  };

  return (
    <div className="page">
      
      <h1>Tipos de propiedad</h1>

      {exito && mostrarExito && (
        <p className="mensaje-exito">{exito}</p>
      ) }

      {error && mostrarError && (
        <p className="mensaje-error">Error: {error}</p>
      )}

      <Link to="/tipoPropiedad/nuevo" className="btn btn-primary">
        Nuevo tipo de propiedad
      </Link>

        {Array.isArray(tiposPropiedad) && tiposPropiedad.length > 0 ? (
        <ul className="list">
          {tiposPropiedad.map(tipo => (
            <li key={tipo.id} className="card">
              <h2>{tipo.nombre}</h2>
              <div className="card-actions"> {/* Nuevo contenedor */}
              <Link to={`/tipo-propiedad/editar/${tipo.id}/${tipo.nombre}`}>
               <button className="btn-editar"
                state={{ nombre: tipo.nombre }} 
               >Editar</button>
              </Link>                
              <button className="btn-eliminar" onClick={() => handleEliminarTipoPropiedad(tipo.id)} >Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tipos de propiedad disponibles.</p> 
      )}
    </div>
  );
};

export default TipoPropiedadPage;