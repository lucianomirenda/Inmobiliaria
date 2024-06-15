import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PropiedadPage.css'; // Asegúrate de tener este archivo CSS
import { fetchLocalidades } from 'D:/PHP/inmobiliaria/src/utils/api.js';

const PropiedadPage = () => {

  const [propiedades, setPropiedades] = useState([]);
  const [filtros, setFiltros] = useState({
    disponible: false,
    localidad_id: '',
    fecha_inicio_disponibilidad: '',
    cantidad_huespedes: '',
  });

  const [error, setError] = useState(null);
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [localidades, setLocalidades] = useState([]); // Estado para las localidades

  useEffect(() => {

    const fetchPropiedades = async () => {
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filtros).reduce((params, [key, value]) => {
            if (key === 'disponible') {
              params[key] = value ? '1' : '0'; // Convertir booleano a cadena
            } else if (value !== '') {
              params[key] = value;
            }
            return params;
          }, {})
        ).toString();
  
        const response = await fetch(`http://localhost/propiedades${queryParams ? '?' + queryParams : ''}`);
  
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
  
        const data = await response.json();
        if (data.status === 'success') {
          setPropiedades(data.data);
        } else {
          throw new Error(data.message || 'Error desconocido en la API');
        }
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
        setError(error.message);
        setMostrarError(true);
        setTimeout(() => {
          setMostrarError(false);
          setError(null);
        }, 5000); // Ocultar el mensaje después de 5 segundos
      }
    };

    fetchPropiedades();
  }, [filtros]); // Ejecutar el efecto cuando cambien los filtros

  useEffect(() => {
    const cargarLocalidades = async () => {
      try {
        const localidadesData = await fetchLocalidades();
        setLocalidades(localidadesData);
      } catch (error) {
        setError(error.message);
      }
    };

    cargarLocalidades();
  }, []);


  const handleFiltroChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEliminarPropiedad = async (propiedadId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar esta propiedad?`)) {
      try {
        const response = await fetch(`http://localhost/propiedades/${propiedadId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setPropiedades(propiedades.filter(propiedad => propiedad.id !== propiedadId));
          setMostrarExito(true);
          setTimeout(() => {
            setMostrarExito(false);
            setError(null);
          }, 2000);
        } else {
          setError(data.message || 'Error desconocido en la API');
          setMostrarError(true);
          setTimeout(() => {
            setMostrarError(false);
            setError(null);
          }, 5000);
        }
      } catch (error) {
        console.error('Error al eliminar la propiedad:', error);
        setError('Error al eliminar la propiedad');
        setMostrarError(true);
        setTimeout(() => {
          setMostrarError(false);
          setError(null);
        }, 5000);
      }
    }
  };

  return (
    
    <div className="tipo-propiedad-page">
      <h1>Propiedades</h1>
  
      {/* Mensaje de error */}
      {error && mostrarError && (
        <p className="error-message mostrar">Error: {error}</p>
      )}
      
      {/* Mensaje de éxito */}
      {mostrarExito && (
        <p className="mensaje-exito mostrar">
          <span className="icono-exito">\f00c</span> Tipo de propiedad eliminado con éxito
        </p>
      )} 
  
      
      {/* Formulario de filtros */}
      <div className="contenido-principal">
      <form>
        <div className="filtros-container">
          <div className="filtro">
                <label htmlFor="disponible">Disponible:</label>
                <div className="checkbox-container"> {/* Contenedor para el checkbox y la etiqueta */}
                <input
                    type="checkbox"
                    id="disponible"
                    name="disponible"
                    checked={filtros.disponible}
                    onChange={handleFiltroChange}
                />
                <span className="checkbox-label"></span> {/* Etiqueta personalizada */}
                </div>
            </div>
            <div className="filtro">
                <label htmlFor="localidad_id">Localidad:</label>
                <select
                id="localidad_id"
                name="localidad_id"
                value={filtros.localidad_id}
                onChange={handleFiltroChange}
                >
                <option value="">Todas</option>
                {localidades.map(localidad => (
                    <option key={localidad.id} value={localidad.id}>
                    {localidad.nombre}
                    </option>
                ))}
                </select>
            </div>
            <div className="filtro">
                <label htmlFor="fecha_inicio_disponibilidad">Fecha de inicio:</label>
                <input
                type="date"
                id="fecha_inicio_disponibilidad"
                name="fecha_inicio_disponibilidad"
                value={filtros.fecha_inicio_disponibilidad}
                onChange={handleFiltroChange}
                />
            </div>

            <div className="filtro">
                <label htmlFor="cantidad_huespedes">Cantidad de huéspedes:</label>
                <input
                type="number"
                id="cantidad_huespedes"
                name="cantidad_huespedes"
                value={filtros.cantidad_huespedes}
                onChange={handleFiltroChange}
                />
            </div>
            <Link to="/propiedad/nuevo" className="btn btn-primary">
               Nueva propiedad
            </Link>
          </div>

        </form>

        <div className="listado-propiedades">
          {Array.isArray(propiedades) && ( 
            <ul className="tipo-propiedad-list">
              {propiedades.length > 0 ? (
                propiedades.map(propiedad => (
                  <li key={propiedad.id} className="tipo-propiedad-card">
                    <h2>{propiedad.domicilio}</h2>
                    <p>Localidad: {propiedad.localidad}</p>
                    <p>Tipo: {propiedad.tipo_de_propiedad}</p>
                    {/* TODO: Agregar más detalles de la propiedad */}
                    <div className="card-actions">
                      <Link to={`/propiedad/${propiedad.id}`}>Ver detalle</Link>
                      <Link to={`/propiedad/editar/${propiedad.id}`}>Editar</Link>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminarPropiedad(propiedad.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No hay propiedades disponibles.</p>
              )}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
  
};

export default PropiedadPage;
