import React, { useState, useEffect } from 'react';
import { useParams, useLocation  } from 'react-router-dom';
import './EditTipoPropiedad.css';


const EditTipoPropiedad = () => {


  
  const { id } = useParams(); // Obtener el ID del tipo de propiedad desde la URL
  const location = useLocation(); // Obtener el state de la ubicación
  const [nombre, setNombre] = useState(location.state?.nombre || '')
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre.trim() === '') {
      setMensaje('El nombre es obligatorio');
      return;
    }

    try {
      const response = await fetch(`http://localhost/tipos_propiedad/${id}`, {
        method: 'PUT',
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
    } catch (error) {
      console.error('Error al actualizar el tipo de propiedad:', error);
      setMensaje('Error al actualizar el tipo de propiedad');
    }
  };

  return (
    <div className="edit-tipo-propiedad-page">
      <h1>Editar Tipo de Propiedad</h1>
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
        <button type="submit">Guardar Cambios</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EditTipoPropiedad;
