import React, { useState } from 'react';
import './NewTipoPropiedad.css'; 
import { useNavigate } from 'react-router-dom';

const NewTipoPropiedad = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState(''); 
  const navigate = useNavigate(); 

  const handleVolver = () => {
    navigate(-1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (nombre.trim() === '') { 
      setMensaje('El nombre es obligatorio');
      return;
    }

    try {
      const response = await fetch('http://localhost/tipos_propiedad', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await response.json();
      setMensaje(data.message); 
      setNombre(''); 
    } catch (error) {
      console.error('Error al crear el tipo de propiedad:', error);
      setMensaje('Error al crear el tipo de propiedad');
    }
  };

  return (
    <div className="new-tipo-propiedad-page">
      <h1>Inserta un Nuevo Tipo de Propiedad</h1>
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
        <button type="submit">Crear</button>
      </form>
      <button type="button" onClick={handleVolver}>Volver</button> 
      {mensaje && (
        <p className={mensaje.includes('Error') ? 'mensaje-error' : 'mensaje-exito'}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default NewTipoPropiedad;
