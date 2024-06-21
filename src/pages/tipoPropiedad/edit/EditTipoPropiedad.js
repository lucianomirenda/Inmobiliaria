import React, { useState} from 'react';
import { useParams, useNavigate   } from 'react-router-dom';
import './EditTipoPropiedad.css';


const EditTipoPropiedad = () => {
  
  const { id, nombre } = useParams();
  const [nombreEditado, setNombreEditado] = useState(nombre); 
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); 

  const handleVolver = () => {
    navigate(-1); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombreEditado.trim() === '') {
      setMensaje('El nombre es obligatorio');
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
            value={nombreEditado} 
            onChange={(e) => setNombreEditado(e.target.value)}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
      <button type="button" onClick={handleVolver}>Volver</button> 
      {mensaje && (
        <p className={`mensaje-${mensaje.includes('Error') ? 'error' : 'exito'} mostrar`}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default EditTipoPropiedad;
