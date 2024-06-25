import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/New.css';
import '../../assets/styles/Mensajes.css';

const NewTipoPropiedad = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);


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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    if (nombre.trim() === '') { // Validar que el nombre no esté vacío
      setError('El nombre es obligatorio');
      mostrarErrorOn();
      return;
    }

    try {
      const response = await fetch('http://localhost/tipos_propiedad', { // Tu endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error.nombre);
        throw new Error('Error en la respuesta de la API');
      }
      
      setExito(data.message);
      mostrarExitoOn();

    } catch (error) {
      mostrarErrorOn();
      console.error('Error al actualizar el tipo de propiedad:', error);
    }
  };

  return (
    <div className="new-page">
      <h1>Inserta un Nuevo Tipo de Propiedad</h1>
      {error && mostrarError && (
        <p className="mensaje-error">Error: {error}</p>
      )}
      {mostrarExito && (
        <p className="mensaje-exito">
          {exito}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <button type='submit'>Crear</button>
        <button type="button" onClick={() => navigate(-1)}>Volver</button>
      </form>
    </div>
  );
};

export default NewTipoPropiedad;