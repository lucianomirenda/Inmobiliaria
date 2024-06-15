import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PropiedadPage.css';


const DetailPropiedad = () => {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const response = await fetch(`http://localhost/propiedades/${id}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        if (data.status === 'success') {
          setPropiedad(data.data[0]); 
        } else {
          throw new Error(data.message || 'Error desconocido en la API');
        }
      } catch (error) {
        console.error('Error al obtener los detalles de la propiedad:', error);
        setError(error.message);
      }
    };

    fetchPropiedad();
  }, [id]);

  return (
<div className="tipo-propiedad-page">
      <div className="titulo-section">
        <h1>Detalles de la Propiedad</h1>
      </div>

      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : propiedad ? (
        <div className="detalles">
          <dt>Domicilio:</dt>
          <dd>{propiedad.domicilio}</dd>
          <dt>Localidad:</dt>
          <dd>{propiedad.localidad}</dd>
          <dt>Tipo de propiedad:</dt>
          <dd>{propiedad.tipo_de_propiedad}</dd>
          <dt>Disponible:</dt>
          <dd>{propiedad.disponible ? 'Sí' : 'No'}</dd>
          <dt>Fecha de inicio de disponibilidad:</dt>
          <dd>{propiedad.fecha_inicio_disponibilidad}</dd>
          <dt>Cantidad de huéspedes:</dt>
          <dd>{propiedad.cantidad_huespedes}</dd>
          <dt>Cantidad de días:</dt>
          <dd>{propiedad.cantidad_dias}</dd>
          <dt>Valor por noche:</dt>
          <dd>{propiedad.valor_noche}</dd>
          {propiedad.cantidad_habitaciones && (
            <>
              <dt>Cantidad de habitaciones:</dt>
              <dd>{propiedad.cantidad_habitaciones}</dd>
            </>
          )}
          {propiedad.cantidad_banios && (
            <>
              <dt>Cantidad de baños:</dt>
              <dd>{propiedad.cantidad_banios}</dd>
            </>
          )}
          <dt>Cochera:</dt>
          <dd>{propiedad.cochera ? 'Sí' : 'No'}</dd>
          {propiedad.imagen && (
            <>
              <dt>Imagen:</dt>
              <dd className="imagen-propiedad">
                <img src={`http://localhost/images/${propiedad.imagen}`} alt="Imagen de la propiedad" /> {/* Asegúrate de ajustar la ruta de la imagen */}
              </dd>
            </>
          )}
          {propiedad.tipo_imagen && (
            <>
              <dt>Tipo de imagen:</dt>
              <dd>{propiedad.tipo_imagen}</dd>
            </>
          )}
        <Link to="/propiedad" className="btn btn-primary">
          Volver al listado
        </Link>
        </div>
        
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
  );
};

export default DetailPropiedad;