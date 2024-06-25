import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate   } from 'react-router-dom';
import '../../assets/styles/Edit.css';
import '../../assets/styles/Mensajes.css';


const EditTipoPropiedad = () => {
  
  const { id, nombre } = useParams();
  const [nombreEditado, setNombreEditado] = useState(nombre); // Usar el nombre obtenido de la URL
  const location = useLocation(); // Obtener el state de la ubicación
  const navigate = useNavigate(); // Obtener la función de navegación
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
    e.preventDefault();

    if (nombreEditado.trim() === '') {
      setError('El nombre es obligatorio');
      mostrarErrorOn();
      return;
    }

    try {

      const response = await fetch(`http://localhost/tipos_propiedad/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombreEditado }), 
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
    <div className="edit-page">
      <h1>Editar Tipo de Propiedad</h1>
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
            value={nombreEditado} // Usar el nuevo estado
            onChange={(e) => setNombreEditado(e.target.value)}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
      <button type="button" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default EditTipoPropiedad;