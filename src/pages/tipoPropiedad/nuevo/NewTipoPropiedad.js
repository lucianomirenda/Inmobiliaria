import React, { useState } from 'react';
import './NewTipoPropiedad.css';

const NewTipoPropiedad = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState(''); // Para mostrar el mensaje del servidor

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    if (nombre.trim() === '') { // Validar que el nombre no esté vacío
      setMensaje('El nombre es obligatorio');
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

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await response.json();
      setMensaje(data.message); // Mostrar el mensaje del servidor
      setNombre(''); // Limpiar el campo de nombre
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
      {mensaje && (
        <p className={mensaje.includes('Error') ? 'mensaje-error' : 'mensaje-exito'}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default NewTipoPropiedad;
